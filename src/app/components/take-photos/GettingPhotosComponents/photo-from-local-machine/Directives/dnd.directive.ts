import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[dropzoneDnd]',
})
export class DndDirective {
  constructor() {}

  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }
  @HostListener('drop', ['$event']) Drop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    this.fileDropped.emit(event.dataTransfer.files);
  }
}
