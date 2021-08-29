import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

import {
  faPowerOff,
  faCamera,
  faCheck,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';
import { PhotoService } from '../../../../Services/photo-service.service';
import { Photo } from 'src/Modules/Photo';

@Component({
  selector: 'app-photo-from-camera',
  templateUrl: './photo-from-camera.component.html',
  styleUrls: ['./photo-from-camera.component.scss'],
})
export class PhotoFromCameraComponent implements OnInit {
  //Icons
  cameraIcon = faCamera;
  OnOffIcon = faPowerOff;
  checkIcon = faCheck;
  discarIcon = faRedo;

  imageCaptured: boolean = false;
  capturedImage: WebcamImage;

  constructor(private photoService: PhotoService) {}

  isCameraExist = true;
  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      }
    );
  }

  private trigger: Subject<void> = new Subject<void>();
  takeSnapshot(): void {
    this.trigger.next();
  }

  showWebcam = true;
  onOffWebCam() {
    this.showWebcam = !this.showWebcam;
  }

  handleImage(webcamImage: WebcamImage) {
    this.capturedImage = webcamImage;
    this.imageCaptured = true;
  }

  Base64ToFile = function (imageData: string): File {
    var arr = imageData.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'Photo_' + new Date().getTime(), {
      type: mime,
    });
  };

  async AddCapturedPhoto() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      this.photoService.getNewPhoto.emit(
        this.Base64ToFile(this.capturedImage.imageAsDataUrl)
      );
    });
    this.imageCaptured = false;
  }
  DiscarCapturedPhoto() {
    this.imageCaptured = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
