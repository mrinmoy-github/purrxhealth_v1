import { Component, OnInit, Input } from '@angular/core';

export interface BreadCrumb {
  url: any | undefined;
  name: any | undefined;
  hasNext: boolean | undefined;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadcrumbs: Array<BreadCrumb>;

  @Input() separator: string;

  constructor() { }

  ngOnInit() {
    if ( !this.separator ) {
      this.separator = '&nbsp;&gt;&nbsp;';
    }
  }

}
