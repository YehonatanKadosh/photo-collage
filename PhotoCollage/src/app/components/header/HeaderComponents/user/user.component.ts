import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  Template: string;

  constructor(private userService: UserService) {
    this.initUserPreferences();
  }
  ngOnInit(): void {}

  initUserPreferences = async () => {
    this.Template = this.userService.user?.template || 'Grid';
  };

  templateChange = () => {
    // this.userService.user.changeTemplate(this.Template === 'Grid' ? 'List' : 'Grid');
    this.initUserPreferences();
  };
}
