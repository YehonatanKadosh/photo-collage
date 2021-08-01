import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/Modules/User';
import { UserService } from '../Services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') className: string = environment.LIGHT_MODE;

  constructor(
    private userService: UserService,
    private overlay: OverlayContainer
  ) {
    this.userService.themeSwitch.subscribe((event) => {
      this.setClassName(event.theme);
    });
    this.userService.userExistsEventEmmiter.subscribe((user: User) => {
      if (user.preferedTheme) this.setClassName(user.preferedTheme);
    });
  }
  ngOnInit() {}

  setClassName = (theme: string) => {
    this.className = theme;
    if (theme == environment.DARK_MODE) {
      this.overlay.getContainerElement().classList.add(environment.DARK_MODE);
    } else {
      this.overlay
        .getContainerElement()
        .classList.remove(environment.DARK_MODE);
    }
  };
}
