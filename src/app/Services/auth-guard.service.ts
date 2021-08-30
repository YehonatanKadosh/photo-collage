import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate() {
    if (!this.userService.user) {
      this.router.navigateByUrl('/404');
      return false;
    }
    return true;
  }
}
