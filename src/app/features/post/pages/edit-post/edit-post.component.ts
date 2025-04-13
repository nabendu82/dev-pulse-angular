import { Component, inject, input, OnInit, signal } from '@angular/core';
import { BlogpostService } from '../../services/blogpost.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [ReactiveFormsModule, MarkdownModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {
  contentData = signal('');
  blogPostService = inject(BlogpostService);
  router = inject(Router);

  ngOnInit(): void {
    this.blogPostService.getBlogPostBySlug(this.slug() ?? '')
      .subscribe({
        next: (blogPost) => {
          this.editPostForm.patchValue({
            title: blogPost.title,
            content: blogPost.content,
            slug: blogPost.slug
          });
  
          this.contentData.set(blogPost.content);
        }
      })
  }

  editPostForm = new FormGroup({
    slug: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    content: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(3000)] }),
  });

  slug = input<string | undefined>(undefined);

  get title() {
    return this.editPostForm.controls.title;
  }

  get content() {
    return this.editPostForm.controls.content;
  }

  onFormSubmit() {
    if (this.editPostForm.invalid) {
      return;
    }
    const rawValue = this.editPostForm.getRawValue();
    this.blogPostService.updateBlogPost(
      rawValue.slug,
      rawValue.title,
      rawValue.content
    );

    this.router.navigateByUrl('/dashboard');
  }

  onContentChange() {
    this.contentData.set(this.editPostForm.getRawValue().content);
  }

  onDelete(slug: string) {
    this.blogPostService.deleteBlogPostBySlug(slug)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
}
