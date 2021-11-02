import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import creditCardType, { getTypeInfo, types as CardType } from 'credit-card-type';

@Component({
  selector: 'app-buy-membership',
  templateUrl: './buy-membership.component.html',
  styleUrls: ['./buy-membership.component.css']
})

export class BuyMembershipComponent implements OnInit {
  model: any = {

  };
  requiredCountries: any = {};
  baseurl: any;
  sitename: string;
  countryList: any;
  stateList: any;
  stateListAvailable: any = false;
  success_msg: string = '';
  error_msg: string = '';
  isMembershipExist: string = "";
  membership_uemail: string = '';
  membershipId: string;
  membership_details: any;

  public authenticated = false;

  AFID: any;
  SID: any;
  AFFID: any;
  C1: any;
  C2: any;
  C3: any;
  AID: any;
  OPT: any;
  click_id: any;
  resetPasswordToken = false;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  //======= Fetching the States for the selected Country ==========//
  getStateList(country) {
    this.backendapiService.getStateList(country).subscribe(res => {
      this.stateList = res.data;
      this.stateListAvailable = true;
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onSubmit(f: NgForm) {
    this.spinner.show();
    this.success_msg = '';
    this.error_msg = '';
    this.isMembershipExist = "";
    //==== Registering the User ====//
    this.model['productId'] = this.membershipId;
    this.model['is_logged_in'] = (this.authenticated) ? 'yes' : 'no';
    if (this.authenticated) {
      this.model['user_id'] = localStorage.getItem('user_id');
    }
    else {
      if (localStorage.getItem('referral_code')) {
        this.model['referral_code'] = localStorage.getItem('referral_code');
      }
    }
    this.backendapiService.postMembershipOrderForm('postMembershipOrderForm', this.model).subscribe(
      (resp) => {
        //console.log(resp);
        if (resp.type == 'success') {
          var resetForm = <HTMLFormElement>document.getElementById('buyMembershipform');
          resetForm.reset();
          // this.success_msg = resp.msg;
          //window.scrollTo(0, 0);
          this.toaster.success(resp.msg, 'Success!');
          if (!this.authenticated) {
            localStorage.setItem('resetToken', resp.token);
          }
          //added swa
          if(resp.flagmsg === 'flag') {
            localStorage.setItem('flag_msg', 'yes');
          }
          //added
          this.router.navigate(["/order-success/"+resp.ll_order_id]);
        }
        if (resp.type == 'error') {
          // this.error_msg = resp.msg;
          //flag msg
          if(resp.msgFlag == 'vip_member') {
            this.isMembershipExist = resp.msgFlag;
          }
          else if(resp.msgFlag == 'non_vip_member') {
            this.isMembershipExist = resp.msgFlag;
          }
          //flag msg
          this.toaster.error(resp.msg, 'Error!');
          if(resp.token && resp.token.length && resp.user_id) {
            window.scrollTo(0,0);
            this.resetPasswordToken = resp.token;
            localStorage.setItem('continue_membership_purchase', this.membershipId);
          }
        }
        this.spinner.hide();
      }
    );
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }

  months: any = [
    { id: '01', name: '(01) January' },
    { id: '02', name: '(02) February' },
    { id: '03', name: '(03) March' },
    { id: '04', name: '(04) April' },
    { id: '05', name: '(05) May' },
    { id: '06', name: '(06) June' },
    { id: '07', name: '(07) July' },
    { id: '08', name: '(08) August' },
    { id: '09', name: '(09) September' },
    { id: '10', name: '(10) October' },
    { id: '11', name: '(11) November' },
    { id: '12', name: '(12) December' }
  ];
  years = [];

  GetCardType(event)
  {
    let number = event.target.value;
      // visa
      var re = new RegExp("^4");
      if (number.match(re) != null)
         return this.model.creditCardType='visa';

      // Mastercard
      // Updated for Mastercard 2017 BINs expansion
       if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
       return this.model.creditCardType='master';

      // Discover
      re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
      if (number.match(re) != null)
          return this.model.creditCardType='discover';

      return "";
  }


  ngOnInit() {
    //======= Auth Checking ==========//
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (this.membership_uemail) {
      this.authenticated = true;
    }
    let date = new Date();
    let currentYearShort = date.getFullYear().toString().substr(-2);
    let currentYearFull = date.getFullYear();

    for (let i = 0; i <= 20; i++) {
      this.years.push({id: parseInt( currentYearShort ) + i, name: currentYearFull+i});
    }

    this.membershipId = this.route.snapshot.paramMap.get('id');
    this.backendapiService.getProduct('getMembershipPackage', this.membershipId).subscribe(res => {
      this.membership_details = res.data;
      console.log(this.membership_details);

      this.model.productId = this.membership_details.ll_product_id;
      this.model.dynamic_product_price_X = this.membership_details.product_price;
    });

    // this.model.campaignId = 1030;
    // this.model.shippingId = 87;
    if (this.authenticated) {
      this.backendapiService.getUserData('getUserData', this.membership_uemail).subscribe(resp => {
        this.model = resp.data[0];
        this.getStateList(this.model.country);console.log(this.model);
      });
      window.scrollTo(0, 0);
    }

    /*** Required Country Code can be given in the requiredCountries Array to List Only those Countries.
    If make the array blank it will fetch all the countries.***/
    this.requiredCountries = ['US'];
    this.backendapiService.getCountryList(this.requiredCountries).subscribe(res => {
      this.countryList = res.data;
    });

    this.baseurl = this.backendapiService.getBaseUrl();
    this.sitename = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.sitename + ' | Buy Membership');
  }

  samAsBillingAddressPopulate(e) {
    if ( e.target.checked ) {
      if (
        this.model['firstName'] &&
        this.model['lastName'] &&
        this.model['address'] &&
        this.model['city'] &&
        this.model['country'] &&
        this.model['state'] &&
        this.model['zip']
      ) {
        this.model['billingFirstName'] = this.model['firstName'];
        this.model['billingLastName'] = this.model['lastName'];
        this.model['billingAddress1'] = this.model['address'];
        this.model['billingCity'] = this.model['city'];
        this.model['billingCountry'] = this.model['country'];
        this.model['billingState'] = this.model['state'];
        this.model['billingZip'] = this.model['zip'];
      }
      else {
        this.toaster.error('Please provide all mandatory infomrations to Shipping Address.');
        e.target.checked = false;
      }
    }
    else{
      this.model['billingFirstName'] = '';
      this.model['billingLastName'] = '';
      this.model['billingAddress1'] = '';
      this.model['billingCity'] = '';
      this.model['billingCountry'] = '';
      this.model['billingState'] = '';
      this.model['billingZip'] = '';
    }
  }
  addressSelectedHandler(selectedAddress, type) {
    if(type == 'shipping') {
      this.model.firstName = selectedAddress.first_name;
      this.model.lastName = selectedAddress.last_name;
      /*this.model.phone = selectedAddress.phone;*/
      this.model.address = selectedAddress.address;
      this.model.city = selectedAddress.city;
      this.model.country = selectedAddress.country;
      this.model.state = selectedAddress.state.state_code;
      this.model.zip = selectedAddress.zip;
    } else {
        this.model.billingFirstName = selectedAddress.first_name;
        this.model.billingLastName = selectedAddress.last_name;
        this.model.phone = selectedAddress.phone;
        this.model.billingAddress1 = selectedAddress.address;
        this.model.billingCity = selectedAddress.city;
        this.model.billingCountry = selectedAddress.country;
        this.model.billingState = selectedAddress.state.state_code;
        this.model.billingZip = selectedAddress.zip;
    }
  }

  detectCardType() {
    this.model.creditCardType = '';
    if (this.model.creditCardNumber !== '') {
      const cardInfo = creditCardType(this.model.creditCardNumber);
      if (cardInfo && cardInfo[0] !== undefined && cardInfo[0].type !== undefined) {
        switch (cardInfo[0].type) {
          case 'visa':
            this.model.creditCardType = 'visa';
            break;
          case 'mastercard':
            this.model.creditCardType = 'master';
            break;
          case 'discover':
            this.model.creditCardType = 'discover';
            break;
        }
      }
    }
  }
}

