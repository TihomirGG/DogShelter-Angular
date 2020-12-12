import { EventEmitter, inject, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IUser } from '../shared/interfaces/user';
import firebase from 'firebase/app';

@Injectable()
export class UserService {
  id: string;
  @Output() loggedState;
  @Output() getLoggedIn: EventEmitter<Boolean> = new EventEmitter();
  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.loggedState = fireAuth.authState;
    this.id = '';
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    try {
      const usersRef = this.fireStore.collection<IUser>('users').ref;
      const exist = await usersRef.where('email', '==', email).get();

      if (exist.empty === false) {
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
          password: password,
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

  login(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((x) => {
        this.id = x.user?.uid === undefined ? '' : x.user?.uid;
        console.log(this.id);
        return Promise.resolve(x);
      })
      .catch((err) => {
        return 'Wrong email or password!';
      });
  }

  async logout() {
    await this.fireAuth.signOut();
    this.id = '';
    this.router.navigateByUrl('/user/login');
  }

  public get userId(): string {
    firebase.auth().currentUser?.uid
    return firebase.auth().currentUser?.uid as string;
  }

  userPassword() {
    const user = this.fireStore.collection<IUser>('users').doc(this.id).ref;
    return user
      .get()
      .then((x) => {
        const temp = x.data()!.password;
        return temp;
      })
      .catch((e) => console.log);
  }

  async updatePass(newP: string) {
    try {
      const cred = (await this.fireAuth.credential.toPromise())?.credential;
      if (cred) {
        await (
          await this.fireAuth.user.toPromise()
        )?.reauthenticateWithCredential(cred);
        (await this.fireAuth.user.toPromise())?.updatePassword(newP);
        await this.fireStore
          .collection('users')
          .doc(this.id)
          .update({ password: newP });
        this.router.navigateByUrl('/user/profile');
      }
    } catch (error) {
      console.log(error);
    }

    // this.fireAuth.credential
    //   .toPromise()
    //   .then((x) => {
    //     const cred = x!.credential;
    //     console.log(x!.credential);
    //     if (cred !== null) {
    //       x?.user
    //         ?.reauthenticateWithCredential(cred)
    //         .then((u) => u.user?.updatePassword(newP))
    //         .catch(console.log);
    //     }
    //   })
    //   .then((_) => {
    //     this.fireStore
    //       .collection('users')
    //       .doc(this.id)
    //       .update({ password: newP })
    //       .then((_) => {
    //         this.router.navigateByUrl('/user/profile');
    //       })
    //       .catch(console.log);
    //   })
    //   .catch(console.log);
  }

  getUserCurrentUserInfo() {
    let user: IUser | undefined;

    return this.fireAuth.currentUser
      .then((x) => {
        console.log(x?.email);
        const userRef = this.fireStore
          .collection<IUser>('users')
          .ref.where('email', '==', `${x!.email}`);

        return userRef.get().then((x) => {
          x.forEach((c) => {
            user = c.data();
          });
          return user;
        });
      })
      .catch(console.log);
    // const ref = this.fireStore.collection<IUser>('users').doc(this.id).ref;
    // return ref.get()
    // .then(x => {
    //   user = x.data();
    //   return user;
    // }).catch(console.log);
  }
}
