import { Component, OnInit } from "@angular/core";
import { BackendapiService } from "../backendapi.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { MyAccountLeftMenuComponent } from "../my-account-left-menu/my-account-left-menu.component";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-update-payment-info',
  templateUrl: './update-payment-info.component.html',
  styleUrls: ['./update-payment-info.component.css']
})
export class UpdatePaymentInfoComponent implements OnInit {

  constructor(
    private titleService: Title,
    private backendapiService: BackendapiService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  
  model: any = {};
  ll_order_id:any;
  membership_uemail: string = '';
  authenticated: any = false;
  order: any;
  baseurl: any;
  siteName: string;
  total = 0.00;
  order_details:any;
  success_msg: string = '';
  error_msg: string = '';
  stateListAvailable: any = false;
  requiredCountries: any = {};
  countryList: any;
  stateList: any;
  expmonthList: any;
  expyearList: any;
  showLoader:boolean = false;
  
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
    this.showLoader = true;  
    //==== Updating Billing Info for the offer the User ====//
    this.backendapiService.commonDataPostFn('admin/order/updatePaymentInfoForm', this.model).subscribe(
      resp => {
        this.showLoader = false;  
        if (resp.type == 'success') {
          this.success_msg = resp.msg;
          window.scrollTo(0, 0);
        }
        if (resp.type == 'error') {
          this.error_msg = resp.msg;
        }
      },
      err => {
        this.showLoader = false;  
      }
    );
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }
  

  ngOnInit() {
    this.showLoader = false;  
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (this.membership_uemail) {
      this.authenticated = true;
    }else{     
        this.router.navigate(["/login"]);
    }

    this.expmonthList = [
      { id: 1, name: "(01) January" },
      { id: 2, name: "(02) February" },
      { id: 3, name: "(03) March" },
      { id: 4, name: "(04) April" },
      { id: 5, name: "(05) May" },
      { id: 6, name: "(06) June" },
      { id: 7, name: "(07) July" },
      { id: 8, name: "(08) August" },
      { id: 9, name: "(09) September" },
      { id: 10, name: "(10) October" },
      { id: 11, name: "(11) November" },
      { id: 12, name: "(12) December" }
    ];
    var year = new Date().getFullYear();
    var range = [];
    for (var i = 0; i < 20; i++) {
      var years = { id: (year + i).toString().substr(-2), name: year + i };
      range.push(years);
    }
    this.expyearList = range;

     /*** Required Country Code can be given in the requiredCountries Array to List Only those Countries.
    If make the array blank it will fetch all the countries.***/
    this.requiredCountries = ['US'];
    this.backendapiService.getCountryList(this.requiredCountries).subscribe(res => {
      this.countryList = res.data;
    });
    
    this.ll_order_id = this.route.snapshot.paramMap.get('ll_order_id');
    this.backendapiService.commonDataFetchFn('admin/order/fetchOrderData?ll_order_id='+this.ll_order_id).subscribe(resp => {
      this.model = resp.data[0];
      this.order_details = this.model.get_order_details;
      this.total = resp.total;
      this.getStateList(this.model.billingCountry);
    });
    this.baseurl = this.backendapiService.getBaseUrl();
    this.siteName = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.siteName+' | Update Order Payment Info');
  }

}


