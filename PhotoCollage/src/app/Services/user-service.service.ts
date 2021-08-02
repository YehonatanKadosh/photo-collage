import { HttpClient, HttpParams } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from 'src/Modules/Category';
import { User } from 'src/Modules/User';
import { SiteStateService } from './site-state.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userExistsEventEmmiter: EventEmitter<User> = new EventEmitter<User>();
  user: User;

  constructor(private http: HttpClient, private siteState: SiteStateService) {
    this.getUser();

    this.siteState.themeSwitch.subscribe((event) => {
      if (event.token == 0) this.setpreferedTheme(event.theme);
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
          this.siteState.privacyAuthenticated.emit(authenticated);
        });
    });
  };

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
