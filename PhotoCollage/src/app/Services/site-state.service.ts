import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/Modules/User';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class SiteStateService {
  userUpdated: EventEmitter<User> = new EventEmitter<User>();
  changeTemplate: EventEmitter<{ template: string; token: number }> =
    new EventEmitter<{
      template: string;
      token: number;
    }>();
  themeSwitch: EventEmitter<{ theme: string; token: number }> =
    new EventEmitter<{ theme: string; token: number }>();
  privacyAuthenticated: EventEmitter<boolean> = new EventEmitter<boolean>();
  isPrivate: boolean = false;
  template: string = environment.Template_GRID;
  theme: string = environment.LIGHT_MODE;
  user: User;

  constructor(private http: HttpClient) {
    this.userUpdated.subscribe((user: User) => {
      this.changeTemplate.emit({ template: user.template, token: 1 });
      if (user.preferedTheme)
        this.themeSwitch.emit({ theme: user.preferedTheme, token: 1 });
      this.user = user;
    });
    this.privacyAuthenticated.subscribe((authenticated: boolean) => {
      this.isPrivate = authenticated;
    });
    this.changeTemplate.subscribe((event) => {
      this.template = event.template;
    });

    this.getUser();
  }

  getUser = async (): Promise<User> => {
    return new Promise((res, rej) => {
      this.http.get<any>(environment.User_API_URL).subscribe(
        (user: User) => {
          if (user) {
            this.userUpdated.emit(user);
          }
        },
        (error) => {}
      );
    });
  };
}
