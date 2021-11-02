import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

interface response1 {
  data: any;
}

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrls: ['./category-index.component.css']
})
export class CategoryIndexComponent implements OnInit {

  category_list: any;
  baseurl: any;
  sitename: string;

  constructor(
    private titleService: Title,
    private backendapiService: BackendapiService
  ) { }

  ngOnInit() {
    this.backendapiService.getCategories('getCategories').subscribe(res => {
      this.category_list = res.data;
    });
    this.baseurl = this.backendapiService.getBaseUrl();
    this.sitename = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.sitename + ' | Product Categories');
    window.scrollTo(0, 0);
  }

}

