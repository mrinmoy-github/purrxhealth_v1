import { OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { BackendapiService } from './../backendapi.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cms-list',
  templateUrl: './cms-list.component.html',
  styleUrls: ['./cms-list.component.css']
})
export class CmsListComponent implements OnInit, OnDestroy {

  public blogs: any;
  blogsSubscriber;
  baseUrl: any;
  siteName: any;
  constructor(
    private backendapiService: BackendapiService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.blogsSubscriber = this.backendapiService.commonDataFetchFn('admin/blogs').subscribe((resp) => {
      if (resp.type !== undefined && resp.type === 'success') {
        console.log(resp);
        this.blogs = resp.data;
      }
    });
    this.baseUrl = this.backendapiService.getBaseUrl();
    this.siteName = this.backendapiService.getSiteName();
  }

  ngOnDestroy() {
    this.blogsSubscriber.unsubscribe();
  }

  getContent(content){
    let conTnt = content.replace(/<[^>]+>/gm, '');
    if(conTnt.length > 250){
      conTnt = conTnt.substr(0, 250) + '...';
    }
    console.log('conTnt', conTnt)
    return conTnt;
  }

  _get_object_keys(obj){
    return Object.keys(obj);
  }

}
