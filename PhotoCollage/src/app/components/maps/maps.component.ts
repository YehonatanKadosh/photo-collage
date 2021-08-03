import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MapsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public coords: {
      latitude: number;
      longitude: number;
    }
  ) {}

  ngOnInit(): void {}
}
