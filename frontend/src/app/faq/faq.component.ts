import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  isFirstOpen = true;
  oneAtATime = true;
  faqs: any;

  constructor(
    private backendapiService: BackendapiService,
  ) { }

  ngOnInit() {
    const url = 'getfaqs';
    this.backendapiService.commonDataFetchFn(url).subscribe(resp => {
      if (resp.type === 'success') {
        this.faqs = resp.data;
      }
    });
  }

}
