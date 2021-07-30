import { Component, HostBinding, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SiteStateService } from '../Services/site-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') className: string = '';

  constructor(private siteState: SiteStateService) {}

  ngOnInit() {
    this.siteState.modeSwitch.subscribe((event) => {
      this.setClassNeme(event.theme);
    });
  }

  setClassNeme = (Mode: string) => (this.className = Mode);
}
