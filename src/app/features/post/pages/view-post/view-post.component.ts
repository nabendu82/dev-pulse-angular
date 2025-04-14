import { Component, inject, input } from '@angular/core';
import { BlogpostService } from '../../services/blogpost.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BlogPostHelper } from '../../../../core/helpers/blogpost-helper';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-view-post',
  imports: [AsyncPipe, DatePipe, MarkdownComponent],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {
  private blogPostService = inject(BlogpostService);
  slug = input<string | undefined>(undefined);
  convertTimestampToDate = BlogPostHelper.convertTimestampToDate;

  private blogPostResource = rxResource({
    request: () => this.slug(),
    loader: ({ request: slug }) => this.blogPostService.getBlogPostBySlug(slug),
  });

  blogPostData = this.blogPostResource.value;
  isLoading = this.blogPostResource.isLoading;
}
