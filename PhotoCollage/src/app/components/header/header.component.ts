import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user-service.service';
import { User } from 'src/Modules/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) {
    this.userService.userExistsEventEmmiter.subscribe((user: User) => {
      this.user = user;
    });
  }
  ngOnInit(): void {}
}
