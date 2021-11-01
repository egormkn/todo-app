import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent {
  isReady = true;

  words = ['cat', 'dog', 'ball'];

  constructor(library: FaIconLibrary) {
    library.addIcons(faSpinner, faPlus, faArrowLeft);
  }

  addWord() {
    // TODO
  }

  onDeleteWord(_event: any) {
    // TODO
  }
}
