import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { PhotoService } from '../../Services/photo-service.service';

@Component({
  selector: 'app-take-photos',
  templateUrl: './take-photos.component.html',
  styleUrls: ['./take-photos.component.css'],
})
export class TakePhotosComponent implements OnInit {
  selectedTab: number = 0;
  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit(): void {}

  Done = async () => {
    if (this.photoService.getAllPhotos().length == 0)
      this.router.navigateByUrl('/PhotoGallery');
    await this.photoService
      .saveNewPhotos()
      .then((finished) => this.router.navigateByUrl('/PhotoGallery'));
  };
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.selectedTab = tabChangeEvent.index;
  };
}
