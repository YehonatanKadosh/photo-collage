import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { UserService } from 'src/app/Services/user-service.service';
import { User } from 'src/Modules/User';
@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css'],
})
export class MoreDetailsComponent implements OnInit {
  libraryName = new FormControl('', [Validators.required]);
  description = new FormControl('');
  SelectedLayout = new FormControl('', [Validators.required]);
  constructor(
    private userService: UserService,
    private siteState: SiteStateService
  ) {
    if (this.siteState.user) this.initFields(this.siteState.user);
  }

  initFields(user: User) {
    this.libraryName.setValue(user.libraryName);
    this.description.setValue(user.description);
    this.SelectedLayout.setValue(user.template);
  }

  done = () => {
    if (this.libraryName.valid && this.SelectedLayout.valid) {
      this.userService.setLibraryNameDescriptionAndTempplate({
        libraryName: this.libraryName.value,
        template: this.SelectedLayout.value,
        description: this.description?.value,
      });
    }
  };
  ngOnInit(): void {}
}
