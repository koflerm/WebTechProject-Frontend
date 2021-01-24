import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faAt, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../core/services/modal.service';
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
  faUser = faUser;
  showErrors: boolean;
  user: User;

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) { 
    this.showErrors = false;
    this.user = { name: "", address: "", phoneNumber: "", email: "", creditcard: "", password: ""}
  }

  loginUser(loginForm: NgForm): void {
    if (loginForm.invalid) {
      this.showErrors = true;
    } else {
      this.userService.loginUser(this.user.name, this.user.email, this.user.password).subscribe(
        (token) => {
          this.userService.retrieveUser(token).subscribe(
            (user: User) => {
              this.userService.updateUser(user, token);
              this.modalService.openModal(`Welcome back ${user.name}!`, 'overview');
            }, 
            (err) => {
              console.log(`Error retrieving user: ${err.message}`);
            }
          )
        },
        () => {
          this.modalService.openModal(`Login failed`, 'overview');
        }
      );
    }
  }

}
