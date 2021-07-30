import { Component, OnInit } from '@angular/core';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collage-menu',
  templateUrl: './collage-menu.component.html',
  styleUrls: ['./collage-menu.component.css'],
})
export class CollageMenuComponent implements OnInit {
  darkMode: boolean;
  isPrivate: boolean;

  constructor(private siteState: SiteStateService) {
    this.setTheme();
  }
  ngOnInit(): void {}

  setTheme = async () => {
    await this.siteState.getTheme().then((theme) => {
      this.darkMode = theme == environment.DARK_MODE;
    });
  };

  changeMode = () => {
    this.darkMode = !this.darkMode;
    this.siteState.modeSwitch.emit({
      theme: this.darkMode ? environment.DARK_MODE : environment.LIGHT_MODE,
      token: 0,
    });
  };

  changePrivacy = () => {
    this.isPrivate = !this.isPrivate;
  };
}
