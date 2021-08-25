import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faCheck,
  faTimes,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.css'],
})
export class TogglerComponent implements OnInit {
  @Output() StateChanged = new EventEmitter<boolean>();
  @Input()
  initialState: boolean;

  times = faTimes;
  check = faCheck;
  state: boolean;
  constructor() {}

  ngOnInit(): void {
    if (this.initialState) this.state = this.initialState;
  }

  TogglerClicked = () => {
    this.state = !this.state;
    this.StateChanged.emit(this.state);
  };
}
