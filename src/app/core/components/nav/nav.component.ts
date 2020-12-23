import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { 
    
  }

  ngOnInit(): void {
    this.userService.userNotifier().subscribe((user) => {
      this.user = user;
      this.router.navigate(['overview']);
    });
  }

  logoutUser(): void {
    this.userService.logoutUser();
  }
}
