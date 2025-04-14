import { inject, Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, query, setDoc, where, writeBatch } from '@angular/fire/firestore';
import { BlogPostHelper } from '../../../core/helpers/blogpost-helper';
import { from, Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { UserService } from '../../../core/services/user.service';
import data from '../data/sample.json';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  firestore = inject(Firestore);
  userService = inject(UserService);

  createBlogPost(title: string, content: string) {
    //addDoc
    // const postCollectionRef = collection(this.firestore, 'blog-posts')
    // addDoc(postCollectionRef, {
    //   title: this.createPostForm.value.title,
    //   content: this.createPostForm.value.content,
    //   publishedOn: new Date()
    // })

    //setDoc
    const blogPostRef = doc(this.firestore, 'blog-posts', BlogPostHelper.createSlug(title));
    setDoc(blogPostRef, {
      title: title,
      content: content,
      publishedOn: new Date(),
      userId: this.userService.currentUser()?.id,
    })
  }

  updateBlogPost(
    slug: string,
    title: string,
    content: string,
  ) {
    const blogPostDocumentRef = doc(this.firestore, 'blog-posts', slug);
    setDoc(blogPostDocumentRef, {
      title: title,
      content: content,
      publishedOn: new Date(),
      userId: this.userService.currentUser()?.id,
    });
  }

  getBlogPostsByUser(): Observable<BlogPost[]> {
    const blogPostCollectionRef = collection(this.firestore, 'blog-posts');

    const queryBlogPostFilterByUser = query(blogPostCollectionRef,where('userId', '==', this.userService.currentUser()?.id));

    return collectionData(queryBlogPostFilterByUser, {
      idField: 'slug',
    }) as Observable<BlogPost[]>;
  }

  getAllBlogs(): Observable<BlogPost[]> {
    const blogPostCollectionRef = collection(this.firestore, 'blog-posts');

    return collectionData(blogPostCollectionRef, {
      idField: 'slug',
    }) as Observable<BlogPost[]>;
  }

  getBlogPostBySlug(slug: string): Observable<BlogPost> {
    const blogPostDocumentRef = doc(this.firestore, 'blog-posts', slug);

    return docData(blogPostDocumentRef, {
      idField: 'slug',
    }) as Observable<BlogPost>;
  }

  deleteBlogPostBySlug(slug: string): Observable<void> {
    const blogPostDocumentRef = doc(this.firestore, 'blog-posts', slug);
    const promise = deleteDoc(blogPostDocumentRef);
    return from(promise);
  }

  batchUpload(): Observable<void> {
    const batch = writeBatch(this.firestore);

    const blogs = data as { title: string; content: string; }[];

    blogs.forEach((blog) => {
      const blogPostDocumentRef = doc(
        this.firestore,
        'blog-posts',
        BlogPostHelper.createSlug(blog.title)
      );

      batch.set(blogPostDocumentRef, {
        title: blog.title,
        content: blog.content,
        publishedOn: new Date(),
        userId: this.userService.currentUser()?.id
      });
    });

    return from(batch.commit());
  }

}
