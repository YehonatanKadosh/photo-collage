import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user-service.service';
import { User } from 'src/Modules/User';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) {
    this.userService.userUpdated.subscribe((user: User) => {
      this.user = user;
    });
    this.user = this.userService.user;
  }
  ngOnInit(): void {}
}
