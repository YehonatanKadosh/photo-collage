import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
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
    public _bottomSheetRef: MatBottomSheetRef<PrivateModeAuthComponent>
  ) {}

  ngOnInit(): void {}

  setPassword = async () => {
    if (this.Password.valid) {
      let correct: boolean = await this.userService.checkIfPasswordValid(
        this.Password.value
      );
      if (!correct) this.Password.setErrors({ inCorrect: true });
      else this._bottomSheetRef.dismiss();
    } else this.Password.markAsTouched();
  };

  close = () => this._bottomSheetRef.dismiss();
}
