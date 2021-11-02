import { Component, OnInit } from "@angular/core";
import { BackendapiService } from "../backendapi.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { LocalCartService } from "../providers/local-cart-service/local-cart.service";
//import 'rxjs/add/operator/toPromise';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService,
    private localCartService: LocalCartService
  ) {}

  baseurl: any;
  sitemane: string;
  membership_uemail: string = "";  
  user_id: string = "";
  authenticated: any = false;
  cart_details:any;
  cartCount: any = 0;
  total:any = 0.00;
  success_msg: string = "";
  error_msg: string = "";
  public model : any = {};
  public showLoader: boolean = false;
  public redeemModel :any = {};
  public wallet : any;
  public walletBalance : any = 0.0;
  public cartTotal : any = 0.0;
  public hasValidCoupon = false;
  private validCouponId = '';
  public shippingAmount;
  public total_discount_amount = 0.0;
  

  removeFromCart(cartId){
    if(this.authenticated){
      this.showLoader = true;  
      this.backendapiService.commonDataPostByGETFn("admin/cart/removeFromCart?id="+cartId).subscribe(resp => {
        this.showLoader = false;  
        if(resp.type == 'success'){
          const index = this.cart_details.indexOf(cartId);
          this.cart_details.splice(index, 1);
          this.backendapiService.commonDataFetchFn("admin/cart/fetchCartData?user_id="+this.user_id).subscribe(res => {
            this.success_msg = resp.msg;
            this.total = res.total;
            this.cartTotal = res.main_total;
            this.cart_details = res.data;
            this.cartCount = this.cart_details.length;
            var itemCount = <HTMLFormElement>document.getElementById('item-count');
            // var mobileItemCount = <HTMLFormElement>document.getElementById('mobile-item-count');
            // mobileItemCount.innerHTML = this.cartCount;
            itemCount.innerHTML = this.cartCount;
            if(this.cartCount == 0 || this.cartCount == 1){
              itemCount.innerHTML = this.cartCount + ' ITEM';
            }else{
              itemCount.innerHTML = this.cartCount + ' ITEMS';
            }
            window.setTimeout(this.afterRemoveProcess, 2000);
          });
        }else{
          this.error_msg = resp.msg;
        }
      },err => {
        this.showLoader = false;
      });
    }
    else{
      let productId = cartId;
      this.localCartService.removeFromCart(productId);
      this.cartCount = this.localCartService.getCount();
      var itemCount = <HTMLFormElement>document.getElementById('item-count');
      // var mobileItemCount = <HTMLFormElement>document.getElementById('mobile-item-count');
      // mobileItemCount.innerHTML = this.cartCount;
      itemCount.innerHTML = this.cartCount;
      if(this.cartCount == 0 || this.cartCount == 1){
        itemCount.innerHTML = this.cartCount + ' ITEM';
      }else{
        itemCount.innerHTML = this.cartCount + ' ITEMS';
      }
      this.afterRemoveProcess();
      this._initiateData();
    }
  }
  afterRemoveProcess(){
    this.success_msg = '';
  }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    this.user_id = localStorage.getItem("user_id");
    if (this.membership_uemail) {
      this.authenticated = true;
    }else{
      //this.router.navigate(["/login"]);
    }

    this._initiateData();

    this.baseurl = this.backendapiService.getBaseUrl();
    this.sitemane = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.sitemane + ' | Cart' );
  }

  protected _initiateData(){
    
    this.total_discount_amount = 0.0;
    if(this.authenticated){
      this.showLoader = true;
      this.backendapiService.commonDataFetchFn("admin/cart/fetchCartData?user_id="+this.user_id).subscribe(res => {
        // console.log(res)
        this.total = res.total;
        this.cartTotal = res.main_total;
        this.total_discount_amount = res.total_discount_amount !== undefined ? res.total_discount_amount : 0.0;
        // this.shippingAmount = ( res.shipping_amount !== undefined ) ? res.shipping_amount : 0.00;
        this.shippingAmount =  res.shipping_amount;
        this.cart_details = res.data;
        const discountedProduct = this.cart_details.filter(item =>  item.coupon_id);
        this.hasValidCoupon = discountedProduct.length ? true : false;
        this.validCouponId = discountedProduct.length ? discountedProduct[0].coupon_id : false;
        this.cartCount = this.cart_details.length;
        this.wallet = res.wallet;
        this.walletBalance = (this.wallet['balanced_amount'] !== undefined) ? parseFloat(this.wallet['balanced_amount']) : 0.0;
        var itemCount = <HTMLFormElement>document.getElementById('item-count');
        // var mobileItemCount = <HTMLFormElement>document.getElementById('mobile-item-count');
        // mobileItemCount.innerHTML = this.cartCount;
        if(this.cartCount == 0 || this.cartCount == 1){
          itemCount.innerHTML = this.cartCount + ' Item';
        }else{
          itemCount.innerHTML = this.cartCount + ' Items';
        }
        this.showLoader = false;
      },err => {
        this.showLoader = false;
      });
    }
    else{
      let _cart = this.localCartService.getCart();
      let _self = this;
      this.showLoader = true;
      this.backendapiService.commonDataPostFn("admin/cart/get_cart_data", _cart).toPromise().then(resp => {
        // console.log("RESPONSE_BODY", resp)
        if(resp.type && resp.type == "success"){
          _self.total = resp.total;
          _self.cartTotal = resp.main_total;
          _self.total_discount_amount = resp.total_discount_amount !== undefined ? resp.total_discount_amount : 0.0;
          _self.cart_details = resp.data;
          _self.shippingAmount =  (resp.shipping_amount !== undefined ) ? resp.shipping_amount : 0.00;
          if(resp.out_of_stock_products.length) {
            this.localCartService.removeOutOfStockProduct(resp.out_of_stock_products);
          }
          const discountedProduct = _self.cart_details.filter(item => item.coupon_id);
          _self.hasValidCoupon = discountedProduct.length ? true : false;
          this.validCouponId = discountedProduct.length ? discountedProduct[0].coupon_id : false;
          _self.cartCount = (_self.cart_details != undefined && _self.cart_details.length != 0 ) ? _self.localCartService.getCount() : 0;
          var itemCount = <HTMLFormElement>document.getElementById('item-count');
          // var mobileItemCount = <HTMLFormElement>document.getElementById('mobile-item-count');
          // mobileItemCount.innerHTML = _self.cartCount;
          if(_self.cartCount == 0 || _self.cartCount == 1){
            itemCount.innerHTML = _self.cartCount + ' Item';
          }else{
            itemCount.innerHTML = _self.cartCount + ' Items';
          }
        }
        else{
          this.total = 0;
          this.cart_details = [];
          _self.cartCount = 0;
        }
        //_self.showLoader = false;
        this.showLoader = false;
      }).catch(error => {
        //_self.showLoader = false;
        this.showLoader = false;
      });
    }
  }

  // public onSubmit(f: NgForm){
  //   let _self = this;
  //   _self.error_msg = '';
  //   _self.success_msg = '';
  //   _self.showLoader = true;
  //   this.hasValidCoupon = false;
  //   _self.backendapiService.commonDataPostFn('admin/cart/validation-coupon', _self.model).subscribe(response => {
  //     // console.warn("RESPONSE_BODY" , response);
  //     if(response.type != undefined && response.type === "success"){
  //       let coupon = response.data;
  //       if(coupon.assigned_products != undefined && coupon.assigned_products != []){
  //         let _appliedProductsId = [];
  //         for(let i = 0; i < _self.cart_details.length; i++){
  //           let _currentProd = _self.cart_details[i];
  //           if(_currentProd.get_product.id != undefined && coupon.assigned_products.find(findId => findId == _currentProd.get_product.id)){
  //             _appliedProductsId.push(_currentProd.get_product.id);
  //             let _body = _self.model;
  //             _body['currProductId'] = _currentProd.get_product.id;
  //             _body['is_logged_in'] = _self.authenticated;
  //             _self.backendapiService.commonDataPostFn("admin/cart/applyCouponCode", _body).subscribe(resp => {
  //               // console.warn("RESPONSE_BODY_1" , resp);
  //               if (resp.type == "success") {
  //                 _self.validCouponId = resp.coupon_id;
  //                 //=== Updating Cart After Coupon Apply ===//
  //                 if(_self.authenticated){
  //                   _self.backendapiService
  //                     .commonDataPostByGETFn(
  //                       "admin/cart/updateCart?id=" +
  //                         _currentProd.id +
  //                         "&coupon_id=" +
  //                         resp.coupon_id
  //                     )
  //                     .subscribe(res => {
  //                       // console.warn("RESPONSE_BODY_2" , res);
  //                       _self._initiateData();
  //                     });
  //                 }
  //                 else{
  //                   _self.localCartService.addInformationToCartProduct(_currentProd.get_product.id, { "coupon_code" : _self.model.coupon_code, "coupon_id" : resp.coupon_id, "updated_price" : resp.updatedPrice });
  //                   _self._initiateData();
  //                 }
  //                 //=== End Updating Cart After Coupon Apply ===//
  //               }
  //             });
  //           }
  //         }
  //         if(_appliedProductsId.length > 0){
  //           _self.success_msg = response.msg;
  //           _self.showLoader = false;
  //           this.hasValidCoupon = true;
  //         }
  //         else{
  //           _self.success_msg = '';
  //           _self.error_msg = "Coupon is valid but no relevent products are found in cart.";
  //           _self.showLoader = false;
  //         }
  //       }
  //       else{
  //         _self.success_msg = "This coupon is valid but not assigned to any products.";
  //         _self.showLoader = false;
  //       }
  //     }
  //     else{
  //       _self.error_msg = response.msg;
  //       _self.showLoader = false;
  //       window.scrollTo(0, 200);
  //     }
  //   });
  // }

  public onSubmit(f: NgForm){
    this.error_msg = '';
    this.success_msg = '';
    this.showLoader = true;
    this.hasValidCoupon = false;
    if(this.authenticated) {
      this.applyCouponForLoggedInUser();
    } else {
      this.applyCouponForGuestUser();
    }
  }

  public applyCouponForLoggedInUser() {
    const requestData = { user_id : this.user_id, coupon: this.model.coupon_code}
    let couponSubscriber = this.backendapiService.commonDataPostFn('admin/apply-coupon-to-cart', requestData).subscribe(response => {
      if(response.type === "success"){
          this.success_msg      = response.msg;
          this._initiateData();
        } else {
        this.error_msg = response.msg;
      }
      this.showLoader = false;
      couponSubscriber.unsubscribe();
    });
  }

  public applyCouponForGuestUser() {
    const productIds = this.localCartService.getCart().map(elem => elem.product_id);
    const cartProducts = this.localCartService.getCart();
    const requestData = { produst_ids : productIds, coupon: this.model.coupon_code, cartProducts: cartProducts}
    let couponSubscriber = this.backendapiService.commonDataPostFn('admin/apply-coupon-to-local-cart', requestData).subscribe(response => {
      if(response.type === "success"){
        response.products.forEach(product => {
          this.localCartService.addInformationToCartProduct(product.id, product);
        });
          this.success_msg      = response.msg;
          this._initiateData();
        } else {
        this.error_msg = response.msg;
      }
      this.showLoader = false;
      couponSubscriber.unsubscribe();
    });
  }
  public removeCoupon(currCartId: number, currProductId:number){
    //console.log(currCartId);
    let _self = this;
    if(_self.authenticated){
      //this.showLoader = true;
      _self.backendapiService
      .commonDataPostByGETFn(
        "admin/cart/updateCart?id=" + currCartId + "&coupon_id=&product_id="+currProductId
      )
      .subscribe(resp => {
        //this.showLoader = false;
        if (resp.type == "success") {
          _self.success_msg = "Coupon Removed Successfully.";
          _self._initiateData();
        }
      });
    }
    else{
      let productId = currCartId;
      _self.localCartService.removeExtra(productId);
      _self._initiateData();
     }
  }
  public handleQuantityUpdate(quantityUpdateResponse) {
    this.addToCart(quantityUpdateResponse.productId, quantityUpdateResponse.quantity);
  }

  addToCart(productId, quantity) {
    // Authenticated Service Based Cart model.coupon_code
    if(this.authenticated){
      this.user_id = localStorage.getItem("user_id");
      var addToCartAPIMETHOD =
        "admin/cart/addToCart?product_id=" +
        productId +
        "&user_id=" +
        this.user_id +
        "&quantity=" +
        quantity +
        "&coupon_id=" +
        this.validCouponId
        this.backendapiService.addToCart(addToCartAPIMETHOD).subscribe(res => {
        this._initiateData();
     });
    }
    else{
      // Non-authenticated LocalStorage Based Cart
      this.localCartService.addToCart(productId, quantity);
      this._initiateData();
    }
  }

}
