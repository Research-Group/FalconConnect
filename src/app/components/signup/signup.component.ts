import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FormControl, Validators, FormGroup} from '@angular/forms';

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService) { }

  heroForm: FormGroup;
  
  ngOnInit() {
    this.heroForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(email_regex)
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  get username(): string { return this.heroForm.get('username').value }
  get email(): string { return this.heroForm.get('email').value }
  get password(): string { return this.heroForm.get('password').value }

  createAccount() {
    const creds = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.auth.signUp(creds);
  }

}
