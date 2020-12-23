import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../core/services/user.service';
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

  constructor(private userService: UserService) { 
    this.showErrors = false;
    this.user = { name: "", address: "", phoneNumber: "", email: "", creditcard: "", password: ""}
  }

  loginUser(loginForm: NgForm): void {
    if (loginForm.invalid) {
      this.showErrors = true;
    } else {
      this.userService.loginUser(this.user.email, this.user.password).subscribe((user) => {
        console.log(user);
      });
    }
  }

}
