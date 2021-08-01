import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-premissions-page',
  templateUrl: './premissions-page.component.html',
  styleUrls: ['./premissions-page.component.css'],
})
export class PremissionsPageComponent implements OnInit {
  geolocation: boolean;
  camera: boolean;
  privateMode: boolean;
  passHover: boolean;
  privatePass = new FormControl('', Validators.required);

  ngOnInit(): void {}

  constructor(private userService: UserService) {
    this.initPermissions();
  }

  async handleGeoPermission() {
    let result = await navigator.permissions.query({ name: 'geolocation' });
    if (result.state == 'granted') {
      this.geolocation = true;
    } else if (result.state == 'prompt') {
      navigator.geolocation.getCurrentPosition(
        () => (this.geolocation = true),
        () => (this.geolocation = false)
      );
    } else if (result.state == 'denied') {
      alert('Permission denied');
      this.geolocation = false;
    }
  }

  async handleCameraPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      let result = await navigator.permissions.query({ name: 'camera' });
      if (result.state == 'granted') {
        this.camera = true;
      } else if (result.state == 'prompt') {
        let prompedResult = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        this.camera = prompedResult.active;
      } else if (result.state == 'denied') {
        alert('Permission denied');
        this.camera = false;
      }
    }
  }

  async initPermissions() {
    this.geolocation =
      (await navigator.permissions.query({ name: 'geolocation' })).state ===
      'granted';
    this.camera =
      (await navigator.permissions.query({ name: 'camera' })).state ===
      'granted';
  }
  setPrivateMode = () => (this.privateMode = !this.privateMode);
  showPassword = () => (this.passHover = true);
  hidePassword = () => (this.passHover = false);

  done = () => {
    if (this.privateMode && this.privatePass.valid)
      this.userService.setPassword(this.privatePass.value);
  };
}
