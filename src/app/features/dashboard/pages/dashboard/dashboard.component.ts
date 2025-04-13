import { Component, computed, inject } from '@angular/core';
import { DashboardStatisticsComponent } from '../../components/dashboard-statistics/dashboard-statistics.component';
import { BlogpostService } from '../../../post/services/blogpost.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardStatisticsComponent, DatePipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  blogPostService = inject(BlogpostService);
  blogPosts = toSignal(this.blogPostService.getBlogPosts());

  totalBlogPosts = computed(() => {
    return this.blogPosts()?.length
  })

  convertTimestampToDate(timestamp: Timestamp){
    return timestamp.toDate();
  }
}
