import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
    })
  });

  get emailControl() {
    return this.loginForm.controls.email;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }

  errorMessage = signal<string | undefined>(undefined);

  onFormSubmit() {
    if (this.loginForm.invalid)
      return;

    const rawForm = this.loginForm.getRawValue();

    this.userService.login(rawForm.email, rawForm.password)
    .subscribe({
      next: (user) => {
        // 1. Store the currently loggedin User (Signal)
        this.userService.currentUser.set(user);

        // 2. Redirect the user to home page
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error(error.message);
        this.errorMessage.set(error.message);
      }
    });


  }

}
