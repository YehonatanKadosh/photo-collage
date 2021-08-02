import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PrivateModeAuthComponent } from 'src/app/components/popUps/private-mode-auth/private-mode-auth.component';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/Modules/User';

@Component({
  selector: 'app-collage-menu',
  templateUrl: './collage-menu.component.html',
  styleUrls: ['./collage-menu.component.css'],
})
export class CollageMenuComponent implements OnInit {
  @Input() user: User;
  darkMode: boolean = false;
  isPrivate: boolean = false;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private siteState: SiteStateService
  ) {
    this.siteState.themeSwitch.subscribe((event) => {
      this.darkMode = event.theme === environment.DARK_MODE;
    });
    this.siteState.privacyAuthenticated.subscribe((auth: boolean) => {
      this.isPrivate = auth;
    });
  }
  ngOnInit(): void {}

  changeMode = () => {
    this.siteState.themeSwitch.next({
      theme: this.darkMode ? environment.LIGHT_MODE : environment.DARK_MODE,
      token: this.user ? 0 : 1,
    });
  };

  changePrivacy = () => {
    if (!this.isPrivate) {
      this._bottomSheet.open(PrivateModeAuthComponent);
    } else this.siteState.privacyAuthenticated.emit(false);
  };
}
