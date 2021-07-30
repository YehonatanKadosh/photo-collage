import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from 'src/Modules/Category';
import { User } from 'src/Modules/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User;
  constructor(private http: HttpClient) {}

  getUser = async (): Promise<User> => {
    return new Promise(async (res, rej) => {
      await this.http.get<any>(environment.User_API_URL).subscribe(
        (user) => {
          this.user = user;
          res(user);
        },
        (error) => {}
      );
    });
  };

  setPrivateMode = async (password: string) => {
    return new Promise(async (res) => {
      if (!this.user) this.user = new User();
      this.user.privateModePassword = password;
      await this.http
        .put(environment.User_API_URL + '/setPassword', {
          password: password,
        })
        .subscribe(
          (data) => {},
          (err) => {},
          () => res(true)
        );
    });
  };

  setpreferedTheme = async (preferedTheme: string) => {
    return new Promise(async (res) => {
      if (!this.user) this.user = new User();
      this.user.preferedTheme = preferedTheme;
      await this.http
        .put(environment.User_API_URL + '/setPreferedTheme', {
          preferedTheme: preferedTheme,
        })
        .subscribe(
          (data) => {},
          (err) => {},
          () => res(true)
        );
    });
  };

  setLibraryNameDescriptionAndTempplate = async (
    libraryName: string,
    template: string,
    description?: string
  ) => {
    return new Promise(async (res) => {
      if (!this.user) this.user = new User();
      this.user.libraryName = libraryName;
      this.user.description = description ? description : '';
      this.user.template = template;

      let sendObj = description
        ? {
            libraryName: libraryName,
            template: template,
            description: description,
          }
        : {
            libraryName: libraryName,
            template: template,
          };
      await this.http
        .put(environment.User_API_URL + '/setExtraDetails', sendObj)
        .subscribe(
          (data) => {},
          (err) => {},
          () => res(true)
        );
    });
  };

  setNewCategory = async (category: Category) => {
    return new Promise(async (res) => {
      if (!this.user) this.user = new User();
      if (this.user.categories) {
        if (
          !this.user.categories.find(
            (c) => c.name.toLowerCase() == category.name.toLowerCase()
          )
        ) {
          this.user.categories.push(category);
        }
      } else {
        this.user.categories = [category];
      }
      await this.http
        .put(environment.User_API_URL + '/setCategory', { category: category })
        .subscribe(
          (data) => {},
          (err) => {},
          () => res(true)
        );
    });
  };
}
