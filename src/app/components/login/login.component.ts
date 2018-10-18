import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { FormControl, Validators } from '@angular/forms';

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usercreds = {
    email: '',
    password: ''
  }

  constructor(private router: Router, private auth: AuthService) { }

  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(email_regex)
  ]);

  passwordFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
  }

  login() {
    this.auth.login(this.usercreds);
  }

  signUp() {
    this.router.navigate(['signup']);
  }

}
