import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form = this.fb.group({ email: 'admin@example.com', password: '' });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    const { email, password } = this.form.value as any;
    this.auth.login(email, password).subscribe(() => this.router.navigateByUrl('/dashboard'));
  }
}

