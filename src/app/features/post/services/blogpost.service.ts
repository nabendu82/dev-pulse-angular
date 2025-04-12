import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { BlogPostHelper } from '../../../core/helpers/blogpost-helper';

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

}
