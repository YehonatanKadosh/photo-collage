import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { SiteStateService } from './site-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private siteState: SiteStateService) {}

  canActivate() {
    // if (!this.siteState.user) {
    //   this.router.navigateByUrl('/404');
    //   return false;
    // }
    return true;
  }
}
