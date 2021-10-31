import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { HttpStatusService } from './http-status.service';

@Component({
  selector: 'app-http-status',
  templateUrl: './http-status.component.html',
  styleUrls: ['./http-status.component.scss'],
})
export class HttpStatusComponent implements OnInit {
  code = 500;
  message = 'Internal Server Error';
  description = '';
  isBackAvailable = true;

  constructor(
    private httpStatus: HttpStatusService,
    private route: ActivatedRoute,
    private location: Location,
    library: FaIconLibrary,
  ) {
    library.addIcons(faArrowLeft, faHome);
  }

  ngOnInit(): void {
    this.httpStatus.setStatus(this.code);
    this.route.data.subscribe((data) => {
      this.code = data.code ?? this.code;
      this.message = data.message ?? this.message;
      this.httpStatus.setStatus(this.code);
    });
    // if (isPlatformBrowser(this.platformId)) {
    //   this.isBackAvailable = !!(document.referrer);
    // } else if (isPlatformServer(this.platformId)) {
    //   const { req, res } = this;
    //   if (req) {
    //     this.isBackAvailable = !!(req.headers.referrer);
    //   }
    // }
  }

  goBack() {
    this.location.back();
  }
}
