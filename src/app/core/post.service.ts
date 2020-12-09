import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { IPost } from '../shared/interfaces/posts';
@Injectable()
export class PostService {
  constructor(
    private fireStore: AngularFirestore,
    private router: Router,
    private fa: AngularFireAuth,
    private fireStorage: AngularFireStorage
  ) {}

  async create(
    region: string,
    description: string,
    phone: string,
    title: string,
    city: string,
    file: File | null
  ) {
    const user = await this.fa.currentUser;
    const uid = user?.uid;

    this.fireStorage
      .upload(`${description}`, file)
      .then((x) => {
        return x.ref.getDownloadURL();
      })
      .then((downloadUrl) => {
        this.fireStore.collection('posts').add({
          region,
          description,
          phone,
          city,
          title,
          uid,
          image: downloadUrl,
        });
        this.router.navigateByUrl('/posts/all');
      });
  }

  async getAll(): Promise<IPost[]> {
    const postsRef = this.fireStore.collection<IPost>('posts');
    const tempDoc: IPost[] = [];

    await postsRef
      .get()
      .toPromise()
      .then((x) => {
        x.docs.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() });
        });
      });
    return Promise.resolve(tempDoc);
  }

  async getById(id: string) {
    const docRef = this.fireStore.collection<IPost>('posts').doc(id);

    let post: IPost = {
      id: null,
      city: undefined,
      title: undefined,
      image: undefined,
      phone: undefined,
      region: undefined,
      description: undefined,
      uid: undefined,
    };
    await docRef.ref.get().then((doc) => {
      return (post = {
        id: docRef.ref.id,
        ...doc.data(),
      } as IPost);
    });
    return Promise.resolve(post);
  }

  deletePost(id: string) {
    this.fireStore
      .collection('posts')
      .doc(id)
      .delete()
      .then((x) => {
        this.router.navigateByUrl('/posts/all');
      });
  }

  updatePost(
    id: string,
    title: string,
    city: string,
    region: string,
    phone: string,
    description: string,
    image: File | undefined
  ) {
    console.log(id);
    if (image === undefined) {
      console.log(id);
      this.fireStore
        .collection('posts')
        .doc(id)
        .update({ title, city, region, phone, description })
        .then((_) => {
          this.router.navigateByUrl(`/posts/details/${id}`);
        });
    } else {
      this.fireStorage
        .upload(`${description}`, image)
        .then((x) => {
          return x.ref.getDownloadURL();
        })
        .then((downloadUrl) => {
          this.fireStore.collection('posts').doc(id).update({
            region,
            description,
            city,
            phone,
            title,
            image: downloadUrl,
          });
          this.router.navigateByUrl(`/posts/details/${id}`);
        });
    }
  }
}
