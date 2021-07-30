import {
  Injectable,
  EventEmitter,
  ApplicationRef,
  OnInit,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user-service.service';
@Injectable({
  providedIn: 'root',
})
export class SiteStateService {
  modeSwitch: EventEmitter<{ theme: string; token: number }> =
    new EventEmitter<{ theme: string; token: number }>();

  constructor(private userService: UserService) {
    this.setMode();
    this.modeSwitch.subscribe(async (event) => {
      if (event.token == 0)
        await this.userService.setpreferedTheme(event.theme);
    });
  }

  setMode = async () => {
    if (!this.userService.user) {
      await this.userService.getUser();
      this.modeSwitch.emit({
        theme: this.userService.user.preferedTheme || environment.LIGHT_MODE,
        token: 1,
      });
    } else
      this.modeSwitch.emit({
        theme: this.userService.user.preferedTheme || environment.LIGHT_MODE,
        token: 1,
      });
  };

  getTheme = async (): Promise<string> => {
    return new Promise(async (res, rej) => {
      if (!this.userService.user) {
        await this.userService.getUser();
        res(this.userService.user.preferedTheme);
      } else res(this.userService.user.preferedTheme);
    });
  };
}
