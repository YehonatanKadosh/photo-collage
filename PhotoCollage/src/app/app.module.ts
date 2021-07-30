import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { HeaderComponent } from './components/header/header.component';
import { CollageMenuComponent } from './components/header/HeaderComponents/collage-menu/collage-menu.component';
import { LogoComponent } from './components/header/HeaderComponents/logo/logo.component';
import { UserComponent } from './components/header/HeaderComponents/user/user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WelcomePageComponent } from './Pages/welcome-page/welcome-page.component';
import { PremissionsPageComponent } from './Pages/premissions-page/premissions-page.component';
import { MoreDetailsComponent } from './Pages/more-details/more-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TakePhotosComponent } from './Pages/take-photos/take-photos.component';
import { PhotoFromCameraComponent } from './Pages/take-photos/GettingPhotosComponents/photo-from-camera/photo-from-camera.component';
import { PhotoFromLocalMachineComponent } from './Pages/take-photos/GettingPhotosComponents/photo-from-local-machine/photo-from-local-machine.component';
import { PhotoFromTheWebComponent } from './Pages/take-photos/GettingPhotosComponents/photo-from-the-web/photo-from-the-web.component';
import { WebcamModule } from 'ngx-webcam';
import { PhotosBarComponent } from './Pages/take-photos/GettingPhotosComponents/photos-bar/photos-bar.component';
import { DndDirective } from './Pages/take-photos/GettingPhotosComponents/photo-from-local-machine/Directives/dnd.directive';
import { HttpClientModule } from '@angular/common/http';
import { PhotoContainerComponent } from './components/popUps/photo-container/photo-container.component';
// Design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { materials } from './materials';
import { TogglerComponent } from './UIKit/toggler/toggler.component';
import { PhotoGalleryComponent } from './Pages/photo-gallery/photo-gallery.component';
import { CategoriesSelectionComponent } from './components/popUps/categories-selection/categories-selection.component';
import { NewCategoryComponent } from './components/popUps/new-category/new-category.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { MapsComponent } from './components/popUps/maps/maps.component';
//googleMaps
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CollageMenuComponent,
    LogoComponent,
    UserComponent,
    WelcomePageComponent,
    PremissionsPageComponent,
    MoreDetailsComponent,
    TakePhotosComponent,
    PhotoFromCameraComponent,
    PhotoFromLocalMachineComponent,
    PhotoFromTheWebComponent,
    DndDirective,
    PhotosBarComponent,
    TogglerComponent,
    PhotoGalleryComponent,
    PhotoContainerComponent,
    CategoriesSelectionComponent,
    NewCategoryComponent,
    GridViewComponent,
    MapsComponent,
  ],
  imports: [
    materials,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    WebcamModule,
    WebcamModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY, // Will be removed after Presentation
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
