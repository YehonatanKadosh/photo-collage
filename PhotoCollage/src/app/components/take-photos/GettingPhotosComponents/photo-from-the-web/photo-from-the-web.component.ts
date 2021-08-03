import { Component } from '@angular/core';
import { Photo } from 'src/Modules/Photo';
import { PhotoService } from '../../../../Services/photo-service.service';
import { WebPhotoService } from '../../../../Services/web-photo-service.service';

@Component({
  selector: 'app-photo-from-the-web',
  templateUrl: './photo-from-the-web.component.html',
  styleUrls: ['./photo-from-the-web.component.css'],
})
export class PhotoFromTheWebComponent {
  searchQuery: string;
  images: any[];
  imagesFound: boolean = false;
  searching: boolean = false;
  amountOfResults: number = 10;

  constructor(
    private imageService: WebPhotoService,
    private photoService: PhotoService
  ) {}

  searchImages = async (query: string, amountOfResults: number = 10) => {
    this.searching = true;
    return (
      await this.imageService.getImages(
        query,
        amountOfResults < 10
          ? 10
          : amountOfResults > 200
          ? 200
          : amountOfResults
      )
    ).subscribe({
      next: (data) => this.HandleImages(data),
      error: (error) => (this.imagesFound = false),
      complete: () => (this.searching = false),
    });
  };

  HandleImages(data): void {
    this.imagesFound = true;
    this.images = data.hits;
  }

  AddImage = (image: any) => {
    this.photoService.getNewUrl.emit(image.webformatURL);
  };

  ngOnInit(): void {}
}
