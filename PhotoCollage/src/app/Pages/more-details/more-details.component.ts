import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user-service.service';
@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css'],
})
export class MoreDetailsComponent implements OnInit {
  libraryName = new FormControl('', [Validators.required]);
  description = new FormControl('');
  SelectedLayout = new FormControl('', [Validators.required]);
  constructor(private userService: UserService) {
    this.initFields();
  }

  initFields() {
    this.libraryName.setValue(this.userService.user?.libraryName);
    this.description.setValue(this.userService.user?.description);
    this.SelectedLayout.setValue(this.userService.user?.template);
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
