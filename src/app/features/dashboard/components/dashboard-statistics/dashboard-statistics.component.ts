import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-statistics',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-statistics.component.html',
  styleUrl: './dashboard-statistics.component.css'
})
export class DashboardStatisticsComponent {
  value = input.required<number>();
  labelDescription = input.required<string>();
}
