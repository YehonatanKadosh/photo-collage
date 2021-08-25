import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { UserService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-private-mode-auth',
  templateUrl: './private-mode-auth.component.html',
  styleUrls: ['./private-mode-auth.component.css'],
})
export class PrivateModeAuthComponent implements OnInit {
  Password = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    private siteState: SiteStateService,
    public _bottomSheetRef: MatBottomSheetRef<PrivateModeAuthComponent>
  ) {}

  ngOnInit(): void {}

  setPasswordClick = async () => {
    if (this.Password.valid) {
      let correct: boolean = await this.userService.checkIfPasswordValid(
        this.Password.value
      );
      if (!correct) this.Password.setErrors({ inCorrect: true });
      else {
        this.siteState.privacyAuthenticated.emit(correct);
        this._bottomSheetRef.dismiss();
      }
    } else this.Password.markAsTouched();
  };

  close = () => this._bottomSheetRef.dismiss();
}
