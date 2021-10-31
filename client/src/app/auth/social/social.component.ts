import { Component } from '@angular/core';
import { socialServices } from './social.model';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  services = socialServices;
}
