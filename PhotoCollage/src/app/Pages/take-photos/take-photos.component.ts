import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PhotoService } from '../../Services/photo-service.service';

@Component({
  selector: 'app-take-photos',
  templateUrl: './take-photos.component.html',
  styleUrls: ['./take-photos.component.css'],
})
export class TakePhotosComponent implements OnInit {
  selectedTab: number = 0;
  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {}

  Done = async () => {
    this.photoService.finishedUploading.emit();
  };
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.selectedTab = tabChangeEvent.index;
  };
}
