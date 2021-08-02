import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/Modules/User';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class SiteStateService {
  changeTemplate: EventEmitter<string> = new EventEmitter<string>();
  themeSwitch: EventEmitter<{ theme: string; token: number }> =
    new EventEmitter<{ theme: string; token: number }>();
  privacyAuthenticated: EventEmitter<boolean> = new EventEmitter<boolean>();

  isPrivate: boolean = false;
  template: string = environment.Template_GRID;
  theme: string = environment.LIGHT_MODE;

  constructor(private userService: UserService) {
    this.userService.userExistsEventEmmiter.subscribe((user: User) => {
      this.changeTemplate.emit(user.template);
      if (user.preferedTheme)
        this.themeSwitch.emit({ theme: user.preferedTheme, token: 1 });
    });
    this.privacyAuthenticated.subscribe((authenticated: boolean) => {
      this.isPrivate = authenticated;
    });
    this.changeTemplate.subscribe((newTemplate: string) => {
      this.template = newTemplate;
    });
  }
}
