import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'All fields are required and must be valid.';
      return;
    }

    const formData = this.signupForm.value;

    this.http.post('http://localhost:8000/signup', formData)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful!';
          this.router.navigate(['/login']); 
        },
        error: (error) => {
          console.error('Error occurred:', error);
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      });
  }
}
