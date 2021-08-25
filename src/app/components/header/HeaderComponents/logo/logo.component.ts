import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/Modules/User';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
})
export class LogoComponent implements OnInit {
  @Input() user: User;
  constructor() {}
  ngOnInit(): void {}
}
