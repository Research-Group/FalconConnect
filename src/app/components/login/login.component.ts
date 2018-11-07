import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PropertyRead } from '@angular/compiler';

// tslint:disable-next-line:max-line-length
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService,
    private snackBar: MatSnackBar) {


    }

  heroForm: FormGroup;

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(email_regex)
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  get email(): string { return this.heroForm.get('email').value; }
  get password(): string { return this.heroForm.get('password').value; }

  login() {

    const creds = {
      email: this.email,
      password: this.password
    };

    const response = this.auth.login(creds);
    response.catch((error) => {
      if (error.code === 'auth/user-not-found') {
        this.snackBar.open('User not found', 'Close', { duration: 3000 });
      }
      if (error.code === 'auth/wrong-password') {
        this.snackBar.open('Incorrect Password', 'Close', { duration: 3000 });
      }
    });
  }

  signUp() {
    this.router.navigate(['signup']);
  }
}
