import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { IPost } from '../shared/interfaces/posts';
import { UserService } from '../user/user.service';
@Injectable()
export class PostService {
  @Output() postEmmiter: EventEmitter<IPost[] | null>;
  constructor(
    private fireStore: AngularFirestore,
    private router: Router,
    private fa: AngularFireAuth,
    private fireStorage: AngularFireStorage,
    private userService: UserService
  ) {
    this.postEmmiter = new EventEmitter();
  }

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
      .upload(`${title}`, file)
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
        }).then(x => {
          this.router.navigateByUrl('/posts/all');
        }).catch(console.log);
        
      }).catch(console.log);
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
      description: '',
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
          this.fireStore
            .collection('posts')
            .doc(id)
            .update({
              region,
              description,
              city,
              phone,
              title,
              image: downloadUrl,
            })
            .then((_) => {
              this.router.navigateByUrl(`/posts/details/${id}`);
            });
        });
    }
  }

  getUserPosts() {
    const posts: IPost[] = [];
    const userId = this.userService.userId;
    return this.fireStore
      .collection<IPost>('posts')
      .ref.where('uid', '==', userId)
      .get()
      .then((x) => {
        x.forEach((post) => {
          posts.push({ id: post.id, ...post.data() });
        });
        return posts;
      })
      .catch((e) => console.error);
  }

  regionFilterPosts(title: string | null, region: string | null) {
    const posts: IPost[] = [];
    if (title && region === null) {
      const query = this.fireStore
        .collection<IPost>('posts')
        .ref.where('title', '==', title);

      query
        .get()
        .then((x) => {
          x.forEach((c) => {
            posts.push({ ...c.data() });
          });
          this.postEmmiter.emit(posts);
        })
        .catch(console.log);
    } else if (region && title === null) {
      const query = this.fireStore
        .collection<IPost>('posts')
        .ref.where('region', '==', region);

      query
        .get()
        .then((x) => {
          x.forEach((c) => {
            posts.push({ ...c.data() });
          });
          this.postEmmiter.emit(posts);
        })
        .catch(console.log);
    } else {
      const query = this.fireStore
        .collection<IPost>('posts')
        .ref.where('region', '==', region)
        .where('title', '==', title);

      query
        .get()
        .then((x) => {
          x.forEach((c) => {
            posts.push({ ...c.data() });
          });
          this.postEmmiter.emit(posts);
        })
        .catch(console.log);
    }
  }
}
