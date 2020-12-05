import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../shared/interfaces/user';
import * as firebase from 'firebase/app';
@Injectable()
export class UserService {
  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((x) => {
           this.fireStore.collection('users').doc(x.user?.uid).set({
            email: x.user?.email,
            firstName: firstName,
            lastName: lastName,
            uid: x.user?.uid
          })
          return x;
      })
      .then((x) => {
       this.router.navigateByUrl('/user/login');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async login(email: string, password: string) {
    const promiseSnapshot = await (this.fireAuth.signInWithEmailAndPassword(
      email,
      password
    ).then(user => {
      this.router.navigateByUrl('/home');
      const obs$ = this.fireStore.collection<IUser>('users').doc(user.user?.uid).get();
      return obs$;
    }));
    
    return promiseSnapshot;
    
    // .then((x) => {
    //   console.log(x.user?.uid);
    //   const temp  = x.user?.uid;
    //   this.router.navigateByUrl('/home');
    //   return this.fireStore.collection('users').doc(temp).valueChanges();
    // })
    // .catch((err) => {
    //   alert('Invalid email or password');
    //   this.router.navigateByUrl('/user/login');
    // });
  }

  logout(): void {
    this.fireAuth.signOut().then((_) => {
      console.log(_);
    });
  }

  async currentUserId() : Promise<string |undefined> {
       const user = await this.fireAuth.currentUser;
       return Promise.resolve(user?.uid);
  }
}
