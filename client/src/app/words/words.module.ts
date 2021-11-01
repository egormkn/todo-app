import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words.component';
import { WordsService } from './words.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WordComponent } from './word/word.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeWordsService } from './fake-words.service';

@NgModule({
  declarations: [WordsComponent, WordComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forFeature(FakeWordsService),
    WordsRoutingModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [WordsService],
})
export class WordsModule {}
