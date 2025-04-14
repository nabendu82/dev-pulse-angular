import { Component, inject } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  userService = inject(UserService);
  router = inject(Router);


  constructor() {
    this.userService.logout()
    .subscribe({
      next: () => {
        this.userService.currentUser.set(undefined);
        this.router.navigateByUrl('/login');
      }
    });
  }
}
