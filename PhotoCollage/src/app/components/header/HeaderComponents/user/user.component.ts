import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user-service.service';
import { User } from 'src/Modules/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() user: User;
  Template: string = 'Grid';

  constructor(private userService: UserService) {
    this.userService.userExistsEventEmmiter.subscribe((user: User) => {
      this.Template = user.template;
    });
  }
  ngOnInit(): void {}

  templateChange = () => {
    if (this.user)
      this.userService.setLibraryNameDescriptionAndTempplate({
        template: this.user?.template === 'Grid' ? 'List' : 'Grid',
      });
    else this.Template = this.Template === 'Grid' ? 'List' : 'Grid';
  };
}
