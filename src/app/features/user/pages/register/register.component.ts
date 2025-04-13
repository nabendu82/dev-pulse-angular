import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userService = inject(UserService);

  registerForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ],
    }),
  });

  get emailControl() {
    return this.registerForm.controls.email;
  }

  get passwordControl() {
    return this.registerForm.controls.password;
  }

  errorMessage = signal<string | undefined>(undefined);

  onFormSubmit() {
    if (this.registerForm.invalid) return;

    const rawForm = this.registerForm.getRawValue();

    this.userService.register(rawForm.email, rawForm.password).subscribe({
      next: () => {
        // Redirect user to login page
        alert('User registered');
      },
      error: (error) => {
        console.error(error.message);
        this.errorMessage.set(error.message);
      },
    });
  }
}
