import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';
import { User } from '../../../services/models/user.model';

@Component({
  selector: 'app-logged-in-functionality',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logged-in-functionality.component.html',
  styleUrl: './logged-in-functionality.component.css'
})
export class LoggedInFunctionalityComponent {
  navbarService = inject(NavbarService);
  user = input.required<User>();

}
