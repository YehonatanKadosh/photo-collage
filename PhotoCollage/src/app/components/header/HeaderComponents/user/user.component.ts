import { Component, Input, OnInit } from '@angular/core';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { UserService } from 'src/app/Services/user-service.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/Modules/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() user: User;
  Template: string = environment.Template_GRID;

  constructor(
    private userService: UserService,
    private siteService: SiteStateService
  ) {
    this.siteService.changeTemplate.subscribe((newTemplate: string) => {
      this.Template = newTemplate;
    });
  }
  ngOnInit(): void {}

  templateChange = () => {
    this.siteService.changeTemplate.emit(
      this.Template === environment.Template_GRID
        ? environment.Template_LIST
        : environment.Template_GRID
    );
  };
}
