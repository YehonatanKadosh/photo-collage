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
  userUpdated: EventEmitter<User> = new EventEmitter<User>();
  user: User;

  constructor(private http: HttpClient, private siteState: SiteStateService) {
    this.getUser();

    this.siteState.newTheme.subscribe((themeEvent) => {
      if (themeEvent.token == 0) this.setpreferedTheme(themeEvent.theme);
    });

    this.siteState.newTemplate.subscribe((templateEvent) => {
      if (templateEvent.token == 0) {
        this.setLibraryNameDescriptionAndTempplate({
          template: templateEvent.template,
        });
      }
    });

    this.userUpdated.subscribe((user: User) => {
      this.user = user;
    });
  }

  getUser = async (): Promise<User> => {
    return new Promise((res, rej) => {
      this.http.get<any>(environment.SERVER_URL + '/User').subscribe(
        (user: User) => {
          if (user) {
            this.userUpdated.emit(user);
            this.siteState.newTemplate.emit({
              template: user.template,
              token: 1,
            });
            if (user.preferedTheme)
              this.siteState.newTheme.emit({
                theme: user.preferedTheme,
                token: 1,
              });
          }
        },
        (error) => {}
      );
    });
  };

  checkIfPasswordValid = async (password: string): Promise<boolean> => {
    return new Promise((res) => {
      this.http
        .get(environment.SERVER_URL + '/User/validatePassword', {
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
        .post(environment.SERVER_URL + '/User/setprivateModePassword', {
          password: password,
        })
        .subscribe(
          (user: User) => {
            this.userUpdated.emit(user);
          },
          (err) => {},
          () => res(true)
        );
    });
  };

  setpreferedTheme = async (preferedTheme: string) => {
    return new Promise((res) => {
      this.http
        .post(environment.SERVER_URL + '/User/setPreferedTheme', {
          preferedTheme: preferedTheme,
        })
        .subscribe(
          (user: User) => {
            this.userUpdated.emit(user);
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
        .post(environment.SERVER_URL + '/User/setExtraDetails', params)
        .subscribe(
          (user: User) => {
            this.userUpdated.emit(user);
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
          .post(environment.SERVER_URL + '/User/setCategory', {
            category: category,
          })
          .subscribe(
            (user: User) => {
              this.userUpdated.emit(user);
              this.siteState.categoriesUpdate.emit(user.categories);
            },
            (err) => {},
            () => res(true)
          );
      }
    });
  };
}
