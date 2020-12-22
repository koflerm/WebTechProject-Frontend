import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  faAt = faAt;
  faKey = faKey;
  showErrors: boolean;
  user: User;

  constructor() { 
    this.showErrors = false;
    this.user = { name: "", address: "", phoneNumber: "", email: "", creditcard: "", password: ""}
  }

  loginUser(loginForm: NgForm): void {
    if (loginForm.invalid) {
      this.showErrors = true;
    } else {
      console.log("success!");
    }
  }

}
