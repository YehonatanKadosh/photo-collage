import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoreDetailsComponent } from './Pages/more-details/more-details.component';
import { PhotoGalleryComponent } from './Pages/photo-gallery/photo-gallery.component';
import { PremissionsPageComponent } from './Pages/premissions-page/premissions-page.component';
import { PhotoFromCameraComponent } from './Pages/take-photos/GettingPhotosComponents/photo-from-camera/photo-from-camera.component';
import { PhotoFromLocalMachineComponent } from './Pages/take-photos/GettingPhotosComponents/photo-from-local-machine/photo-from-local-machine.component';
import { PhotoFromTheWebComponent } from './Pages/take-photos/GettingPhotosComponents/photo-from-the-web/photo-from-the-web.component';
import { TakePhotosComponent } from './Pages/take-photos/take-photos.component';
import { WelcomePageComponent } from './Pages/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'PremissionsPage', component: PremissionsPageComponent },
  { path: 'MoreDetails', component: MoreDetailsComponent },
  { path: 'TakePhotos', component: TakePhotosComponent },
  { path: 'PhotoGallery', component: PhotoGalleryComponent },
  { path: 'TakePhotos/Camera', component: PhotoFromCameraComponent },
  { path: 'TakePhotos/Local', component: PhotoFromLocalMachineComponent },
  { path: 'TakePhotos/Web', component: PhotoFromTheWebComponent },
  { path: '**', component: WelcomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
