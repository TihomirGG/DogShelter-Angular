import { EventEmitter, inject, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../shared/interfaces/user';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  id: string;
  @Output() getLoggedIn: EventEmitter<Boolean> = new EventEmitter();
  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.id = '';
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    try {
      const exist = this.fireStore.collection('users').doc(email);
      if (exist.ref.id) {
        return 'Email is aready taken!';
      }
      const user = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      const temp = await this.fireStore
        .collection('users')
        .doc(user.user?.uid)
        .set({
          email: user.user?.email,
          firstName: firstName,
          lastName: lastName,
          uid: user.user?.uid,
        });

      return user;
    } catch {
      return 'Email is aready taken!';
    }
    // .then((x) => {
    //   this.fireStore.collection('users').doc(x.user?.uid).set({
    //     email: x.user?.email,
    //     firstName: firstName,
    //     lastName: lastName,
    //     uid: x.user?.uid,
    //   });
    //   return x;
    // })
    // .then((x) => {
    //   return 'Success';
    // })
    // .catch((e) => {
    //   return 'Email already taken!';
    // });
  }

   login(email: string, password: string)  {
      
      return this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      ).then(x => {
        this.getLoggedIn.emit(true);
        this.id =
          x.user?.uid === undefined
            ? ''
            : x.user?.uid;
        console.log(this.id);
        return Promise.resolve(x);
      }).catch((err)=> {
        return "Wrong email or password!";
      })
    
  }

  async logout() {
    await this.fireAuth.signOut();
    this.id = '';
    this.getLoggedIn.emit(false);
    this.router.navigateByUrl('/user/login');
  }

  public get userId(): string {
    console.log(this.id);
    return this.id;
  }
}
