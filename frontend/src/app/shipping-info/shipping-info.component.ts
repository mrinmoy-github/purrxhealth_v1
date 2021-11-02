import { Component, OnInit } from "@angular/core";
import { MyAccountLeftMenuComponent } from "../my-account-left-menu/my-account-left-menu.component";

import { BackendapiService } from "../backendapi.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-shipping-info",
  templateUrl: "./shipping-info.component.html",
  styleUrls: ["./shipping-info.component.css"]
})
export class ShippingInfoComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService
  ) {}

  sitename: string;
  membership_uemail: string = "";
  model: any = {};
  countryList: any;
  stateList: any;
  stateListAvailable: any = false;
  requiredCountries: any = {};
  success_msg: string = '';
  error_msg: string = '';

  //======= Fetching the States for the selected Country ==========//
  getStateList(country) {
    this.backendapiService.getStateList(country).subscribe(res => {
      this.stateList = res.data;
      this.stateListAvailable = true;
    });
  }

  onSubmit(f: NgForm) {
    this.success_msg = '';
    this.error_msg = '';
    //==== Registering the User ====//
    this.backendapiService.updateShippingInfoForm('updateShippingInfoForm', this.model).subscribe(
      resp => {
        if (resp.type == 'success') {       
          this.success_msg = resp.msg;
          window.scrollTo(0, 0);
        }
        if (resp.type == 'error') {
          this.error_msg = resp.msg;
        }
      }
    );
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }


  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (!this.membership_uemail) {
      this.router.navigate(['/login']);
    }

    /*** Required Country Code can be given in the requiredCountries Array to List Only those Countries.
    If make the array blank it will fetch all the countries.***/
    this.requiredCountries = ['US'];
    this.backendapiService.getCountryList(this.requiredCountries).subscribe(res => {
      this.countryList = res.data;
    });

    this.backendapiService
      // .getUserData("getUserData", this.membership_uemail)
      .getUserData("getUserData", 'test16@codeclouds.com')
      .subscribe(resp => {
        this.model = resp.data[0];
        this.getStateList(this.model.country);
      });

    this.sitename = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.sitename + " | Shipping Info");
    window.scrollTo(0, 0);
  }
}
