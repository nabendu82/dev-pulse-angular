import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogpostService } from '../../../post/services/blogpost.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  blogPostService = inject(BlogpostService);
  blosPosts = toSignal(this.blogPostService.getAllBlogs());

  convertTimestampToDate(timestamp: Timestamp) {
    return timestamp.toDate();
  }
}
