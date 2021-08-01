import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user-service.service';
import { User } from 'src/Modules/User';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
})
export class LogoComponent implements OnInit {
  @Input() user: User;
  constructor(private userService: UserService) {}
  ngOnInit(): void {}
}
