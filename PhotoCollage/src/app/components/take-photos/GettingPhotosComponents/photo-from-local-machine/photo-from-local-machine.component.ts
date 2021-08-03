import { Component, OnInit } from '@angular/core';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { promise } from 'protractor';
import { Photo } from 'src/Modules/Photo';
import { PhotoService } from '../../../../Services/photo-service.service';

@Component({
  selector: 'app-photo-from-local-machine',
  templateUrl: './photo-from-local-machine.component.html',
  styleUrls: ['./photo-from-local-machine.component.css'],
})
export class PhotoFromLocalMachineComponent implements OnInit {
  constructor(private photoService: PhotoService) {}
  fileUploadIcon = faFileUpload;
  ngOnInit(): void {}

  async onFileDropped(files: FileList) {
    if (files.length > 0) {
      await this.filesBrowseHandler(
        Array.from(files).filter(
          (file: File) =>
            file.type?.search(/.(gif|jpe?g|tiff?|png|webp|bmp)$/) > 0
        )
      );
    }
  }
  async filesBrowseHandler(files: File[]) {
    this.photoService.getNewFiles.emit(files);
  }
}
