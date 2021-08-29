import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Category } from 'src/Modules/Category';

@Injectable({
  providedIn: 'root',
})
export class SiteStateService {
  newTemplate: EventEmitter<{ template: string; token: number }> =
    new EventEmitter<{
      template: string;
      token: number;
    }>();
  newTheme: EventEmitter<{ theme: string; token: number }> = new EventEmitter<{
    theme: string;
    token: number;
  }>();

  categoriesUpdate: EventEmitter<Category[]> = new EventEmitter<Category[]>();

  privacyAuthenticated: EventEmitter<boolean> = new EventEmitter<boolean>();
  isPrivate: boolean = false;

  constructor(private http: HttpClient) {
    this.privacyAuthenticated.subscribe((authenticated: boolean) => {
      this.isPrivate = authenticated;
    });
  }
}
