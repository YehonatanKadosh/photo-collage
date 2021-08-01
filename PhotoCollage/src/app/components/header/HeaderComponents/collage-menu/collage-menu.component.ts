import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user-service.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/Modules/User';

@Component({
  selector: 'app-collage-menu',
  templateUrl: './collage-menu.component.html',
  styleUrls: ['./collage-menu.component.css'],
})
export class CollageMenuComponent implements OnInit {
  @Input() user: User;
  darkMode: boolean;
  isPrivate: boolean;

  constructor(private userService: UserService) {
    this.userService.userExistsEventEmmiter.subscribe((user: User) => {
      this.darkMode = user.preferedTheme === environment.DARK_MODE;
    });
  }
  ngOnInit(): void {}

  changeMode = () => {
    this.darkMode = !this.darkMode;
    this.userService.themeSwitch.emit({
      theme: this.darkMode ? environment.DARK_MODE : environment.LIGHT_MODE,
      token: this.user ? 0 : 1,
    });
  };

  changePrivacy = () => {
    this.isPrivate = !this.isPrivate;
  };
}
