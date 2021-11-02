import { Component, OnInit } from "@angular/core";
import { BackendapiService } from "../backendapi.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { NgForm } from "@angular/forms";
import { LocalCartService } from "../providers/local-cart-service/local-cart.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';
import creditCardType, { getTypeInfo, types as CardType } from 'credit-card-type';

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService,
    private localCartService: LocalCartService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,

  ) { }

  model: any = {
      country_id: '223'
  };
  requiredCountries: any = {};
  baseurl: any;
  sitename: string;
  countryList: any;
  stateList: any;
  stateListAvailable: any = false;
  success_msg: string = "";
  error_msg: string = "";
  isMembership: string = "";
  membership_uemail: string = "";
  cart_details: any;
  cartCount: any = 1;
  total: any = 0.0;
  public cartTotal : any = 0.0;
  user_id: string = "";
  shippingCollapsed: any = false;
  shippingCollapsedText: any = "";
  billingCollapsed: any = false;
  billingCollapsedText: any = "";
  expmonthList: any;
  expyearList: any;
  public authenticated: boolean = false;
  public referralCode: string;
  public wallet: any;
  public walletBalance: any = 0.0;
  public takeCardInformation: boolean = true;
  public shippingAmount;
  public redeem_status: boolean = false;
  public redeem_btn_status: boolean = true;
  public redeem_value: any = '';

  AFID: any;
  SID: any;
  AFFID: any;
  C1: any;
  C2: any;
  C3: any;
  AID: any;
  OPT: any;
  click_id: any;
  cartLLProductIdList: any = '';
  cartProductPriceList: any = '';
  cartProductIdList: any = '';
  resetPasswordToken = false;
  editable = false;

//======= Fetching the existing customer record ==========//
  checkExistingCustomer(name,value){
    if(name == 'email' && value !=''){
      this.spinner.show();
      this.backendapiService
        .commonDataPostFn("admin/order/checkEmailExists", {'email':value})
        .subscribe(resp => {
          if (resp.type == "success") {
            this.model.billingFirstName = resp.data.firstName;
            this.model.billingLastName = resp.data.lastName;
            this.editable = true;
          }
          if (resp.type == "error") {
            this.editable = false;
          }
          this.spinner.hide();
        });
    }
  }
//======= Fetching the States for the selected Country ==========//
  getStateList(country) {
    this.backendapiService.getStateList(country).subscribe(res => {
      this.stateList = res.data;
      this.stateListAvailable = true;
    });
  }

  shippingCollapse() {
    if (!this.shippingCollapsed) {
      console.log("1");
      this.shippingCollapsed = true;
      this.shippingCollapsedText = "+ Collapsed";
      return;
    }
    if (this.shippingCollapsed) {
      console.log("2");
      this.shippingCollapsed = false;
      this.shippingCollapsedText = "- Collapse";
      return;
    }
  }

  billingCollapse() {
    if (this.billingCollapsed == false) {
      this.billingCollapsed = true;
      this.billingCollapsedText = "+ Collapsed";
      return;
    }
    if (this.billingCollapsed == true) {
      this.billingCollapsed = false;
      this.billingCollapsedText = "- Collapse";
      return;
    }
  }

  onSubmit(f: NgForm) {
    this.success_msg = "";
    this.error_msg = "";
    this.isMembership = "";
    this.resetPasswordToken = false;
    this.model.productId = this.cartProductIdList;
    this.model.llProductId = this.cartLLProductIdList;
    this.model.cartProductPriceList = this.cartProductPriceList;
    this.spinner.show();
    let billing_stCurr = this.stateList.find(item => item.state_code == this.model.billingState);
    this.model.billing_state_id = billing_stCurr.state_id !== undefined ? billing_stCurr.state_id : '';
    if(this.model.ship_to_different_address){
    let shipping_stCurr = this.stateList.find(item => item.state_code == this.model.state);
    this.model.shipping_state_id = shipping_stCurr.state_id !== undefined ? shipping_stCurr.state_id : '';
    }
    
    if (this.authenticated) {
      //==== Sending Checkout Data ====//
      this.model['u_id'] = this.user_id;
      this.backendapiService
        .commonDataPostFn("admin/order/placeOrder", this.model)
        .subscribe(resp => {

          if (resp.type == "success") {
            this.success_msg = resp.msg;
            this.router.navigate(["/order-success/" + resp.ll_order_id]);
            window.scrollTo(0, 0);
          }
          if (resp.type == "error") {
            this.error_msg = resp.msg;
          }
          this.spinner.hide();
        });
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
    }
    else {
      let _cart = this.localCartService.getCart();
      this.model['cart'] = _cart;
      let _self = this;
      if (this.referralCode !== undefined) {
        this.model['referral_code'] = this.referralCode;
      }
      this.backendapiService
        .commonDataPostFn("admin/order/place-new-order-with-prospect", this.model)
        .subscribe(resp => {
          if (resp) {
            if (resp.type == "success") {
              _self.localCartService.clearCart();
              _self.success_msg = resp.msg;
              window.scrollTo(0, 0);
              // window.setTimeout(_self.redirectToLogin, 2000);
              this.referralCode = undefined;
              localStorage.removeItem("referral_code");
              localStorage.setItem('resetToken', resp.token);
              //added swa
              if(resp.flagmsg == 'flag') {
                localStorage.setItem('flag_msg', 'yes');
              }
              //added
              this.router.navigate(["/order-success/" + resp.ll_order_id]);
            }
            else {
              _self.error_msg = resp.msg;
              //flag msg
              if(resp.msgFlag == 'vip_member') {
                _self.isMembership = resp.msgFlag;
              }
              else if(resp.msgFlag == 'non_vip_member') {
                _self.isMembership = resp.msgFlag;
              }
              //flag msg
              if (resp.token && resp.token.length && resp.user_id) {
                this.resetPasswordToken = resp.token;
                localStorage.setItem('continue_checkout', 'true');
              }
              window.scrollTo(0, 0);
            }
          }
          else {
            _self.error_msg = "Something went wrong, please try after sometime.";
            window.scrollTo(0, 0);
          }
          _self.spinner.hide();
        });
    }
  }

  public redirectToLogin() {
    this.router.navigate(["login"]);
  }

  ngOnInit() {
    //======= Auth Checking ==========//
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (this.membership_uemail) {
      //this.router.navigate(["login"]); //== If user not logged in redirect ==//
      this.authenticated = true;
    }
    else {
      let _cartCount = this.localCartService.getCount();
      if (_cartCount <= 0) {
        this.router.navigate(["/cart"]);
      }
      if (localStorage.getItem("referral_code")) {
        this.referralCode = localStorage.getItem("referral_code");
      }
    }
    this.user_id = localStorage.getItem("user_id");
    window.scrollTo(0, 0);

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
    this.requiredCountries = ["US"];
    this.backendapiService
      .getCountryList(this.requiredCountries)
      .subscribe(res => {
        this.countryList = res.data;
      });

    if (this.authenticated) {
      this.backendapiService
        // .getUserData("gxxetUserData", 'test16@codeclouds.com')
        .getUserData("getUserData", this.membership_uemail)
        .subscribe(resp => {
          this.model = resp.data[0];
          this.getStateList(this.model.country);
          this.getStateList(this.model.billingCountry);
        });

      this.backendapiService
        .commonDataFetchFn("admin/cart/fetchCartData?user_id=" + this.user_id)
        .subscribe(res => {
          this.total = res.total;
          this.cart_details = res.data;
          console.log(res.data);
          this.cartTotal = res.main_total;
          this.shippingAmount = res.shipping_amount;
          // this.shippingAmount = (res.shipping_amount !== undefined) ? res.shipping_amount : 0.00;         
          this.cartCount = this.cart_details.length;
          if (res.wallet !== undefined) {
            this.wallet = res.wallet;
            this.walletBalance = (this.wallet.balanced_amount !== undefined) ? parseFloat(this.wallet.balanced_amount) : 0.0;
          }
          if (typeof this.cart_details != undefined) {
            this.cart_details.forEach((item, index) => {
              this.cartLLProductIdList += (',' + ((item.billing_model !== undefined && item.billing_model === 'recurringSale') ? item.get_product.recurring_kk_product_id.toString() : item.get_product.ll_product_id.toString()));
              this.cartProductIdList += ',' + item.get_product.id.toString();
              this.cartProductPriceList += ',' + item.updatedPrice.toString();
            });
          }
        });
    }
    else {
      let _cart = this.localCartService.getCart();
      let _self = this;
      this.requiredCountries = ['US'];
      this.backendapiService.getCountryList(this.requiredCountries).subscribe(res => {
        //this.countryList = res.data;
        this.getStateList('US');
      });
      this.backendapiService.commonDataPostFn("admin/cart/get_cart_data", _cart).toPromise().then(resp => {
        console.log("RESPONSE_BODY", resp)
        if (resp.type && resp.type == "success") {
          _self.total = resp.total;
          _self.cartTotal = resp.main_total;
          //console.log(resp.data);
          _self.cart_details = resp.data;          
          _self.shippingAmount = (resp.shipping_amount !== undefined) ? resp.shipping_amount : 0.00;
          // _self.shippingAmount = (resp.main_total >= 100) ? 0.00 : resp.shipping_amount;
          _self.cartCount = _self.cart_details.length;
          if (typeof _self.cart_details != undefined) {
            _self.cart_details.forEach((item, index) => {
              if(item.billing_model == 'recurringSale'){
                _self.cartLLProductIdList += ',' + item.get_product.recurring_kk_product_id.toString();
               }else{
                _self.cartLLProductIdList += ',' + item.get_product.ll_product_id.toString();
               }
              _self.cartProductIdList += ',' + item.get_product.id.toString();
              _self.cartProductPriceList += ',' + item.updatedPrice.toString();
            });
          }
        }
      }).catch(error => {
        console.log("Errors", error)
      });
    }
    

    this.baseurl = this.backendapiService.getBaseUrl();
    this.sitename = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.sitename + " | Checkout");
  }

  public redeemWalletAmountCheck() {
    let _self = this;
    if (_self.model['redeemCheck'] != undefined && parseFloat(_self.model['redeemCheck']) > 0.0) {
      _self.redeem_value = _self.model['redeemWallet'] = _self.model['redeemCheck'];
      _self.redeemWalletAmount();
    } else {
      _self.toaster.error('Please enter a valid redeem amount.', 'Error!');
    }
  }

  public redeemWalletAmountEditOrRemove(val) {
    let _self = this;
    if (_self.redeem_btn_status === false) {
      this.model['redeemWallet'] = '';
      _self.total = _self.total + parseFloat(_self.redeem_value);
      _self.redeem_btn_status = true;
      _self.redeem_status = false;
      if (val === 'remove') {
        _self.model['redeemCheck'] = '';
      }
    }
  }

  public redeemWalletAmount() {
    let _self = this;
    _self.success_msg = '';
    _self.error_msg = '';
    if (this.model['redeemWallet'] != undefined && parseFloat(this.model['redeemWallet']) > 0.0) {
      let _amount = parseFloat(this.model['redeemWallet']);
      if (_amount <= _self.walletBalance) {
        if (_amount <= _self.total) {
          _self.total = _self.total - parseFloat(_self.redeem_value);
          _self.redeem_btn_status = false;
          _self.redeem_status = true;
          if (_amount == _self.total) {
            _self.toaster.success("You can pay total amont $" + _amount + " from your wallet.", "Success!");
          }
          else {
            _self.toaster.success("You can redeem $" + _amount, "Success!");
          }
        }
        else {
          _self.toaster.error('You order amount is $' + _self.total, 'Error!');
        }
      }
      else {
        _self.toaster.error('You can redeem maximum $' + _self.walletBalance, 'Error!');
      }
    }
    else {
      _self.toaster.error('Please enter a valid redeem amount.', 'Error!');
    }
  }
  /*samAsBillingAddressPopulate(e) {
    if (e.target.checked) {
      if (
        this.model['billingFirstName'] &&
        this.model['billingLastName'] &&
        this.model['billingAddress1'] &&
        this.model['billingCity'] &&
        this.model['billingCountry'] &&
        this.model['billingState'] &&
        this.model['billingZip']
      ) {
        this.model['firstName'] = this.model['billingFirstName'];
        this.model['lastName'] = this.model['billingLastName'];
        this.model['address'] = this.model['billingAddress1'];
        this.model['city'] = this.model['billingCity'];
        this.model['country'] = this.model['billingCountry'];
        this.model['state'] = this.model['billingState'];
        this.model['zip'] = this.model['billingZip'];
      } else {
        this.toaster.error('Please provide all mandatory infomrations to Billing Address.');
        e.target.checked = false;
      }
    } else {
      this.model['firstName'] = '';
      this.model['lastName'] = '';
      this.model['address'] = '';
      this.model['city'] = '';
      this.model['country'] = '';
      this.model['state'] = '';
      this.model['zip'] = '';
    }
  }*/

  addressSelectedHandler(selectedAddress, type) {
    if (type == 'shipping') {
      this.model.firstName = selectedAddress.first_name;
      this.model.lastName = selectedAddress.last_name;
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
