import { Injectable } from '@angular/core';
import { IntersectionObserverHooks, Attributes } from 'ng-lazyload-image';
import { PhotoService } from '../Services/photo-service.service';

@Injectable()
export class LazyLoadImageHooks extends IntersectionObserverHooks {
  constructor(private photoService: PhotoService) {
    super();
  }
  setErrorImage(error: Error, attributes: Attributes): void {
    this.photoService.Deprecated(parseInt(attributes.element.id));
  }
}
