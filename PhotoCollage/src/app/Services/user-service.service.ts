import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from 'src/Modules/Category';
import { User } from 'src/Modules/User';
import { SiteStateService } from './site-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private siteService: SiteStateService) {
    this.siteService.themeSwitch.subscribe((event) => {
      if (event.token == 0) this.setpreferedTheme(event.theme);
    });

    this.siteService.changeTemplate.subscribe((event) => {
      if (event.token == 0) {
        this.setLibraryNameDescriptionAndTempplate({
          template: event.template,
        });
      }
    });
  }

  checkIfPasswordValid = async (password: string): Promise<boolean> => {
    return new Promise((res) => {
      this.http
        .get(environment.User_API_URL + '/validatePassword', {
          params: new HttpParams().set('password', password),
        })
        .subscribe((authenticated: boolean) => {
          res(authenticated);
        });
    });
  };

  setPassword = async (password: string) => {
    return new Promise((res) => {
      this.http
        .post(environment.User_API_URL + '/setprivateModePassword', {
          password: password,
        })
        .subscribe(
          (user: User) => {
            this.siteService.userUpdated.emit(user);
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
            this.siteService.userUpdated.emit(user);
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
            this.siteService.userUpdated.emit(user);
          },
          (err) => {},
          () => res(true)
        );
    });
  };

  setNewCategory = async (category: Category) => {
    return new Promise((res) => {
      if (
        !this.siteService.user.categories?.find(
          (c) => c.name.toLowerCase() == category.name.toLowerCase()
        )
      ) {
        this.http
          .post(environment.User_API_URL + '/setCategory', {
            category: category,
          })
          .subscribe(
            (user: User) => {
              this.siteService.userUpdated.emit(user);
            },
            (err) => {},
            () => res(true)
          );
      }
    });
  };
}
