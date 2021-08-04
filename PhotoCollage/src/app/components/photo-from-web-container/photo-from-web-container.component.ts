import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Photo } from 'src/Modules/Photo';

@Component({
  selector: 'app-photo-from-web-container',
  templateUrl: './photo-from-web-container.component.html',
  styleUrls: ['./photo-from-web-container.component.css'],
})
export class PhotoFromWebContainerComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PhotoFromWebContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public image: any
  ) {}

  ngOnInit(): void {}
}
