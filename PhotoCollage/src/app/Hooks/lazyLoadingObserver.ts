import { Injectable } from '@angular/core';
import { IntersectionObserverHooks, Attributes } from 'ng-lazyload-image';
import { PhotoService } from '../Services/photo-service.service';

@Injectable()
export class LazyLoadImageHooks extends IntersectionObserverHooks {
  constructor(private photoService: PhotoService) {
    super();
  }
  setErrorImage(error: Error, attributes: Attributes): void {
    this.photoService.imageDeprecated.emit(parseInt(attributes.element.id));
  }
  setup(attributes: Attributes) {
    attributes.defaultImagePath = '../../assets/no-image-placeholder.jpg';
    super.setup(attributes);
  }
}
