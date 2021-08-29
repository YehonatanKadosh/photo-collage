import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-component/app.component';
import { HeaderComponent } from './components/header/header.component';
import { CollageMenuComponent } from './components/header/HeaderComponents/collage-menu/collage-menu.component';
import { LogoComponent } from './components/header/HeaderComponents/logo/logo.component';
import { UserComponent } from './components/header/HeaderComponents/user/user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { PremissionsPageComponent } from './components/premissions-page/premissions-page.component';
import { MoreDetailsComponent } from './components/more-details/more-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TakePhotosComponent } from './components/take-photos/take-photos.component';
import { PhotoFromCameraComponent } from './components/take-photos/GettingPhotosComponents/photo-from-camera/photo-from-camera.component';
import { PhotoFromLocalMachineComponent } from './components/take-photos/GettingPhotosComponents/photo-from-local-machine/photo-from-local-machine.component';
import { PhotoFromTheWebComponent } from './components/take-photos/GettingPhotosComponents/photo-from-the-web/photo-from-the-web.component';
import { WebcamModule } from 'ngx-webcam';
import { PhotosBarComponent } from './components/take-photos/GettingPhotosComponents/photos-bar/photos-bar.component';
import { DndDirective } from './components/take-photos/GettingPhotosComponents/photo-from-local-machine/Directives/dnd.directive';
import { HttpClientModule } from '@angular/common/http';
import { PhotoContainerComponent } from './components/photo-container/photo-container.component';
// Design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { materials } from './materials';
import { TogglerComponent } from './UIKit/toggler/toggler.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { CategoriesSelectionComponent } from './components/categories-selection/categories-selection.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { MapsComponent } from './components/maps/maps.component';
import { PrivateModeAuthComponent } from './components/private-mode-auth/private-mode-auth.component';
//googleMaps
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
//Lazy loading
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS } from 'ng-lazyload-image';
import { LazyLoadImageHooks } from './Hooks/lazyLoadingObserver';
import { NoPrivateModeConfiguredComponent } from './components/no-private-mode-configured/no-private-mode-configured.component';
import { PhotoFromWebContainerComponent } from './components/photo-from-web-container/photo-from-web-container.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CategoriesControlComponent } from './components/categories-control/categories-control.component';

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
    PageNotFoundComponent,
    PrivateModeAuthComponent,
    NoPrivateModeConfiguredComponent,
    PhotoFromWebContainerComponent,
    ListViewComponent,
    CarouselComponent,
    CategoriesControlComponent,
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
    LazyLoadImageModule,
    CarouselModule.forRoot(),
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: LazyLoadImageHooks }],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
