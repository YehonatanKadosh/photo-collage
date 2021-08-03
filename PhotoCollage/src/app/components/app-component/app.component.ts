import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SiteStateService } from '../../Services/site-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') className: string = environment.LIGHT_MODE;

  constructor(
    private overlay: OverlayContainer,
    private siteState: SiteStateService
  ) {
    this.siteState.themeSwitch.subscribe((event) => {
      this.setClassName(event.theme);
    });
  }
  ngOnInit() {}

  setClassName = (theme: string) => {
    this.className = theme;
    if (theme == environment.DARK_MODE) {
      this.overlay.getContainerElement().classList.add(environment.DARK_MODE);
    } else {
      this.overlay
        .getContainerElement()
        .classList.remove(environment.DARK_MODE);
    }
  };
}
