import { Component, OnInit } from '@angular/core';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { UserService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  constructor(
    private siteState: SiteStateService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
}
