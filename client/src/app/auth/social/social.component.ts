import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocialServiceType, services } from './social.model';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  services = services;

  constructor(private authService: AuthService, private router: Router) {}

  logIn(type: SocialServiceType) {
    window.location.href = `/api/auth/${type}`;
  }
}
