import { inject, Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { BlogPostHelper } from '../../../core/helpers/blogpost-helper';
import { from, Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  firestore = inject(Firestore);
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
      publishedOn: new Date()
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
    });
  }

  getBlogPosts(): Observable<BlogPost[]> {
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

}
