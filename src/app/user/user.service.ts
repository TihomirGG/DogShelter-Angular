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
          uid: x.user?.uid,
        });
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
    const promiseSnapshot = await this.fireAuth
      .signInWithEmailAndPassword(email, password)
     
      this.getLoggedIn.emit(true);
      this.id = promiseSnapshot.user?.uid === undefined ? '' :promiseSnapshot.user?.uid;
      console.log(this.id);
    return promiseSnapshot;
  }

  async logout() {
    await this.fireAuth.signOut();
    this.id = '';
    this.getLoggedIn.emit(false);
    this.router.navigateByUrl('/user/login')
  }

  public get userId(): string {
    console.log(this.id);
    return this.id;
  }
}
