import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Photo } from 'src/Modules/Photo';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 1500, noPause: false, showIndicators: true },
    },
  ],
})
export class CarouselComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CarouselComponent>,
    @Inject(MAT_DIALOG_DATA) public images: Photo[]
  ) {
    this.shuffleArray(images);
  }

  ngOnInit(): void {}

  shuffleArray(array) {
    var m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}
