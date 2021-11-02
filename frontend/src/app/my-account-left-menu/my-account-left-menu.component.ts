import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from "@angular/router";
@Component({
  selector: 'app-my-account-left-menu',
  templateUrl: './my-account-left-menu.component.html',
  styleUrls: ['./my-account-left-menu.component.css']
})
export class MyAccountLeftMenuComponent implements OnInit {
  currentUrl : any = '';
  activeCurrentLink : boolean = false;
  constructor(
    private router : Router
  ) { }

  ngOnInit() {
    let _self = this;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
        let strExts = this.currentUrl.indexOf("accessContentDetails");
        if(strExts >= 0){
          _self.activeCurrentLink = true;
        }
        else{
          strExts = this.currentUrl.indexOf("accessContent");
          if(strExts >= 0){
            _self.activeCurrentLink = true;
          }
        }
      }
    });
  }

}
