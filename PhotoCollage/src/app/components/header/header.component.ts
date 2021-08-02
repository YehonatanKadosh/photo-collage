import { Component, OnInit } from '@angular/core';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { User } from 'src/Modules/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(private siteState: SiteStateService) {
    this.siteState.userUpdated.subscribe((user: User) => {
      this.user = user;
    });
  }
  ngOnInit(): void {}
}
