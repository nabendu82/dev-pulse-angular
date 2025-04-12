import { Component, inject } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  firestore = inject(Firestore);

  createPostForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    content: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(3000)] }),
  })

  get title() {
    return this.createPostForm.controls.title;
  }

  get content() {
    return this.createPostForm.controls.content;
  }

  onFormSubmit() {
    if (this.createPostForm.invalid) {
      return;
    }
    //addDoc
    const postCollectionRef = collection(this.firestore, 'blog-posts')
    addDoc(postCollectionRef, {
      title: this.createPostForm.value.title,
      content: this.createPostForm.value.content,
      publishedOn: new Date()
    })
    console.log(this.createPostForm.value)
  }
}
