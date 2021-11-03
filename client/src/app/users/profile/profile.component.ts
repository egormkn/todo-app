import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner, faSquare, faUser } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private usersService: UsersService, library: FaIconLibrary) {
    library.addIcons(faSquare, faUser, faSpinner);
  }

  ngOnInit(): void {
    this.usersService.getProfile().subscribe((user) => {
      this.user = user;
    });
  }
}
