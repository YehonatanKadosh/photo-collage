import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-private-mode-configured',
  templateUrl: './no-private-mode-configured.component.html',
  styleUrls: ['./no-private-mode-configured.component.css'],
})
export class NoPrivateModeConfiguredComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NoPrivateModeConfiguredComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}
  configurePassword = () => {
    this.router.navigateByUrl('/PremissionsPage');
    this.dialogRef.close();
  };
}
