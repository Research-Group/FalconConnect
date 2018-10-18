import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FormControl, Validators} from '@angular/forms';

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usercreds = {
    email: '',
    password: '',
    displayName: ''
  }

  constructor(private auth: AuthService) { }

  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(email_regex)
  ]);

  passwordFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  usernameFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);
  
  ngOnInit() {
  }

  createAccount() {
    this.auth.signUp(this.usercreds);
  }

}
