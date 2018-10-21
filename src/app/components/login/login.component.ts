import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { stringify } from '@angular/core/src/util';

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) {}

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
    this.auth.login(this.email, this.password);
  }

  signUp() {
    this.router.navigate(["signup"]);
  }
}
