import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  public breadcrumbs = [{
    name: 'Home',
    url: '',
    hasNext: true
  },
  {
    name: 'Terms & Conditions',
    url: undefined
  }];

  constructor() { }

  ngOnInit() {
  }

}
