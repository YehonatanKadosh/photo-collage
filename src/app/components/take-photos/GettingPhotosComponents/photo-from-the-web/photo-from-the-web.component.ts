import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoFromWebContainerComponent } from 'src/app/components/photo-from-web-container/photo-from-web-container.component';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { UserService } from 'src/app/Services/user-service.service';
import { Photo } from 'src/Modules/Photo';
import { PhotoService } from '../../../../Services/photo-service.service';

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
  template: string;

  constructor(
    private siteState: SiteStateService,
    private userSevice: UserService,
    private photoService: PhotoService,
    public dialog: MatDialog
  ) {
    this.template = this.userSevice.user?.template; // ? only for debugging
    this.siteState.newTemplate.subscribe((templateEvent) => {
      this.template = templateEvent.template;
    });
  }

  searchImages = async (query: string, amountOfResults: number = 10) => {
    this.searching = true;
    try {
      let data = await this.photoService.getImagesFromWeb(
        query,
        amountOfResults < 10
          ? 10
          : amountOfResults > 200
          ? 200
          : amountOfResults
      );
      this.HandleImages(data);
      this.searching = false;
    } catch (err) {
      this.imagesFound = false;
      this.searching = false;
    }
  };

  HandleImages(data): void {
    this.imagesFound = true;
    this.images = data.hits;
  }

  AddImage = (image: any) => {
    this.photoService.getNewUrl.emit(image.webformatURL);
  };

  popPhotoContainer = (image: Photo) => {
    this.dialog.open(PhotoFromWebContainerComponent, {
      maxWidth: '300px',
      maxHeight: '500px',
      data: image,
    });
  };

  ngOnInit(): void {}
}
