import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { faNestJs } from './fontawesome-svg-nestjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faNestJs = faNestJs;

  constructor(library: FaIconLibrary) {
    library.addIcons(faAngular, faNestJs);
  }
}
