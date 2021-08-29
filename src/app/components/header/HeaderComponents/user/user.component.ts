import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { PhotoService } from 'src/app/Services/photo-service.service';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/Modules/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() user: User;
  Template: string = environment.Template_GRID;

  constructor(
    private siteService: SiteStateService,
    private router: Router,
    public dialog: MatDialog,
    private photoService: PhotoService
  ) {
    siteService.newTemplate.subscribe((templateEvent) => {
      this.Template = templateEvent.template;
    });
  }
  ngOnInit(): void {}

  templateChange = () => {
    this.siteService.newTemplate.emit({
      template:
        this.Template === environment.Template_GRID
          ? environment.Template_LIST
          : environment.Template_GRID,
      token: this.user ? 0 : 1,
    });
  };

  importClicked = () => this.router.navigateByUrl('/TakePhotos');
  caruselClicked = async () => {
    let avelablePhotos = await this.photoService.getPhotosFromServer();
    if (avelablePhotos.length)
      this.dialog.open(CarouselComponent, {
        width: '90vw',
        height: '90vh',
        data: await this.photoService.getPhotosFromServer(),
      });
    else alert('No photos to display :(');
  };
}
