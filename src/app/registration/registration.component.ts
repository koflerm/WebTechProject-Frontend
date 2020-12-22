import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faUser, faHome, faPhone, faAt, faKey, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  faUser = faUser;
  faHome = faHome;
  faPhone = faPhone;
  faAt = faAt;
  faKey = faKey;
  faCreditCard = faCreditCard;
  newUser: User;
  showErrors: boolean;
  repeatPassword: string;
  repeatPasswordInvalid: boolean;

  constructor() { 
    this.newUser = { name: "", address: "", phoneNumber: "", email: "", creditcard: "", password: ""}
    this.showErrors = false;
    this.repeatPasswordInvalid = false;
    this.repeatPassword = "";
  }

  ngOnInit(): void {
  }

  createUser(form: NgForm): void {
    if (form.invalid || this.repeatPasswordInvalid) {
      this.showErrors = true;
    } else {
      console.log("success!");
    }
  }

  passwordsMatch(): void {
    if (this.repeatPassword != this.newUser.password) {
      this.repeatPasswordInvalid = true;
    } else {
      this.repeatPasswordInvalid = false;
    }
  }

}
