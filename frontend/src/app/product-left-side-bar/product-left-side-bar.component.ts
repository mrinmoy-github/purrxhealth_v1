import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';

@Component({
  selector: 'app-product-left-side-bar',
  templateUrl: './product-left-side-bar.component.html',
  styleUrls: ['./product-left-side-bar.component.css']
})
export class ProductLeftSideBarComponent implements OnInit {

  constructor(private backendapiService: BackendapiService) { }
  sitename: string;

  ngOnInit() {
  this.sitename = this.backendapiService.getSiteName();
  }

}
