import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from 'src/Modules/Category';
import { User } from 'src/Modules/User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userExistsEventEmmiter: EventEmitter<User> = new EventEmitter<User>();
  themeSwitch: EventEmitter<{ theme: string; token: number }> =
    new EventEmitter<{ theme: string; token: number }>();

  user: User;
  constructor(private http: HttpClient) {
    this.getUser();

    this.themeSwitch.subscribe((event) => {
      if (event.token == 0) this.setpreferedTheme(event.theme);
    });
  }

  getUser = async (): Promise<User> => {
    return new Promise((res, rej) => {
      this.http.get<any>(environment.User_API_URL).subscribe(
        (user: User) => {
          if (user) {
            this.user = user;
            this.userExistsEventEmmiter.emit(user);
          }
        },
        (error) => {}
      );
    });
  };

  setPassword = async (password: string) => {
    return new Promise((res) => {
      this.http
        .post(environment.User_API_URL + '/setPassword', {
          password: password,
        })
        .subscribe(
          (user: User) => {
            this.user = user;
          },
          (err) => {},
          () => res(true)
        );
    });
  };

  setpreferedTheme = async (preferedTheme: string) => {
    return new Promise((res) => {
      this.http
        .post(environment.User_API_URL + '/setPreferedTheme', {
          preferedTheme: preferedTheme,
        })
        .subscribe(
          (user: User) => {
            this.user = user;
          },
          (err) => {},
          () => res(true)
        );
    });
  };

  setLibraryNameDescriptionAndTempplate = async (params: {
    template: string;
    libraryName?: string;
    description?: string;
  }) => {
    return new Promise((res) => {
      this.http
        .post(environment.User_API_URL + '/setExtraDetails', params)
        .subscribe(
          (user: User) => {
            this.user = user;
            this.userExistsEventEmmiter.emit(user);
          },
          (err) => {},
          () => res(true)
        );
    });
  };

  setNewCategory = async (category: Category) => {
    return new Promise((res) => {
      if (
        !this.user.categories?.find(
          (c) => c.name.toLowerCase() == category.name.toLowerCase()
        )
      ) {
        this.http
          .post(environment.User_API_URL + '/setCategory', {
            category: category,
          })
          .subscribe(
            (user: User) => {
              this.user = user;
            },
            (err) => {},
            () => res(true)
          );
      }
    });
  };
}
