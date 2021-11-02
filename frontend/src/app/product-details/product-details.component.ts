import * as  ImageSlider from './../shared/class/image-slider';
import { Component, OnInit } from "@angular/core";
import { BackendapiService } from "../backendapi.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { NgForm } from "@angular/forms";
import "../../assets/js/jquery.responsive.tabs.min.js";
import "../../assets/js/pagelevel/responsivetabs.js";
import { ProductLeftSideBarComponent } from "../product-left-side-bar/product-left-side-bar.component";
import { LocalCartService } from '../providers/local-cart-service/local-cart.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { ViewportScroller } from '@angular/common';

interface response {
  data: any;
}

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  product_details: any;
  baseurl: any;
  productId: any;
  sitemane: string;
  membership_uemail: string = "";
  user_id: string = "";
  authenticated: any = false;
  is_addedToCart: any = false;
  cartCount: any = 0;
  model: any = {};
  success_msg: string = "";
  error_msg: string = "";
  isCouponApplied: any = false;
  couponCodeApplied: any = "";
  couponIdApplied: any = "";
  cartId: any;
  productPrice: any = "";
  public settings : any;
  public quantity = 1;
  public selectedBillingModel = 'straightSale';

  public inStock = 0;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  breadcrumbs = [{
    name: 'Home',
    url: '',
    hasNext: true
  }];

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService,
    private localCartService: LocalCartService,
    private toastrService: ToastrService,
    private viewportScroller: ViewportScroller
  ) {
    this.galleryOptions = ImageSlider.config;

  }

  addToCart(productId) {
    // Authenticated Service Based Cart
    if(this.authenticated){
      this.user_id = localStorage.getItem("user_id");
      var addToCartAPIMETHOD =
        "admin/cart/addToCart?product_id=" +
        productId +
        "&user_id=" +
        this.user_id +
        "&quantity=" +
        this.quantity +
        "&billing_model=" +
        this.selectedBillingModel;

      //=== Add to Cart After Coupon Applied ===//
      if (this.isCouponApplied == true) {
        addToCartAPIMETHOD =
          "admin/cart/addToCart?product_id=" +
          productId +
          "&user_id=" +
          this.user_id
          "&quantity=" +
          this.quantity;
          "&coupon_id=" +
          this.couponIdApplied;
          this.quantity +
          "&billing_model=" +
          this.selectedBillingModel;
        }

      this.backendapiService.addToCart(addToCartAPIMETHOD).subscribe(res => {
        this.is_addedToCart = true;
        this.cartId = res.cart_id;
        this.cartCount = res.cart_count;
        var itemCount = <HTMLFormElement>document.getElementById('item-count');
        //var mobileItemCount = <HTMLFormElement>document.getElementById('mobile-item-count');
          //mobileItemCount.innerHTML = this.cartCount;
            if(this.cartCount == 0 || this.cartCount == 1){
              itemCount.innerHTML = this.cartCount + ' Item';
            }else{
              itemCount.innerHTML = this.cartCount + ' Items';
            }
        this.toastrService.success('cart updated!');
      });
    }
    else{
      // Non-authenticated LocalStorage Based Cart
      this.localCartService.addToCart(productId, this.quantity, this.selectedBillingModel);
      this.is_addedToCart = true;
      this.cartCount = this.localCartService.getCount();
      let itemCount = <HTMLFormElement>document.getElementById('item-count');
      //var mobileItemCount = <HTMLFormElement>document.getElementById('mobile-item-count');
          //mobileItemCount.innerHTML = this.cartCount;
      if(this.cartCount == 0 || this.cartCount == 1){
        itemCount.innerHTML = this.cartCount + ' Item';
      }else{
        itemCount.innerHTML = this.cartCount + ' Items';
      }
      console.log('local');
      this.toastrService.success('cart updated!');
    }
  }

  isAddedToCart(productId) {
    // Authenticated Service Based Cart
    if(this.authenticated){
      this.user_id = localStorage.getItem("user_id");
      this.backendapiService
      .isAddedToCart(
        "admin/cart/isAddedToCart?product_id=" +
          productId +
          "&user_id=" +
          this.user_id
      )
      .subscribe(res => {
        if (res.type == "error") {
          this.is_addedToCart = true;
          this.selectedBillingModel = res.cart_details.billing_model;
          this.quantity = res.cart_details.quantity
          this.cartId = res.cart_id;

          if (typeof(res.coupon_id) != 'undefined' && res.coupon_id !== "") {
            this.couponCodeApplied = res.coupon_code;
            this.couponIdApplied = res.coupon_id;
            this.isCouponApplied = true;

            this.backendapiService.commonDataFetchFn("admin/cart/checkCouponExpiry?id="+res.coupon_id+'&cart_id='+this.cartId).subscribe(resp => {
              if(resp.type == 'invalid'){
                this.couponCodeApplied = '';
                this.couponIdApplied = '';
                this.isCouponApplied = false;
                this.error_msg = resp.msg;
              }
            });
          }
        }
      });
    }
    else{
      this.is_addedToCart = this.localCartService.checkProductExists(productId);
      this.cartCount = this.localCartService.getCount();
      if(this.is_addedToCart){
        let productDetail = this.localCartService.getProduct(productId);
        this.selectedBillingModel = productDetail['billing_model'];
        if(productDetail['extra'] != undefined){
          this.couponCodeApplied = productDetail['extra']['coupon_code'];
          this.couponIdApplied = productDetail['extra']['coupon_id'];
          this.isCouponApplied = true;
        }
      }
    }
  }

  goToCart() {
    this.router.navigate(["cart"]);
  }

  //=== Removing Coupon ===//
  removeCoupon() {
    var currCartId = this.cartId;
    var currProductPrice = this.productPrice;
    if(this.authenticated){
      //=== If product is already added to cart ===//
      if (this.is_addedToCart == true) {
        this.backendapiService
            .commonDataPostByGETFn(
            "admin/cart/updateCart?id=" + currCartId + "&coupon_id="
          )
          .subscribe(resp => {
            if (resp.type == "success") {
              this.success_msg = "Coupon Removed Successfully.";
              this.couponCodeApplied = "";
              this.couponIdApplied = "";
              this.isCouponApplied = false;

              var productPrice = <HTMLFormElement>(document.getElementById("productPrice"));
              productPrice.innerHTML = "$" + currProductPrice;

              this.model.coupon_code = '';
            }
          });
      } else {
        this.success_msg = "Coupon Removed Successfully.";
        this.couponCodeApplied = "";
        this.couponIdApplied = "";
        this.isCouponApplied = false;
        var productPrice = <HTMLFormElement>(document.getElementById("productPrice"));
        productPrice.innerHTML = "$" + currProductPrice;

        this.model.coupon_code = '';
      }
    }
    else{
      this.couponCodeApplied = "";
      this.couponIdApplied = "";
      this.isCouponApplied = false;
      this.model.coupon_code = '';
      this.success_msg = "Coupon Removed Successfully.";
      this.localCartService.removeExtra( this.productId );
      currProductPrice = this.product_details.product_price;
      if (
        this.authenticated == true &&
        this.product_details.priority_pricing_amount
      ) {
        currProductPrice = this.product_details.priority_pricing_amount;
      }
      if (
        this.authenticated == true &&
        !this.product_details.priority_pricing_amount
      ) {
        currProductPrice = this.product_details.product_price;
      }
      var productPrice = <HTMLFormElement>(
        document.getElementById("productPrice")
      );
      productPrice.innerHTML = "$" + currProductPrice;
    }
  }

  //=== Apply Coupon ===//
  onSubmit(f: NgForm) {
    this.success_msg = "";
    this.error_msg = "";
    var currCartId = this.cartId;
    let _self = this;
    this.backendapiService
      .commonDataPostFn("admin/cart/applyCouponCode", this.model)
      .subscribe(resp => {
        if (resp.type == "success") {
          this.couponCodeApplied = this.model.coupon_code;
          this.couponIdApplied = resp.coupon_id;
          this.isCouponApplied = true;
          var productPrice = <HTMLFormElement>(
            document.getElementById("productPrice")
          );
          productPrice.innerHTML = "$" + resp.updatedPrice;

          //=== Updating Cart After Coupon Apply ===//
          if (this.is_addedToCart == true) {
            if(_self.authenticated){
              this.backendapiService
              .commonDataPostByGETFn(
                "admin/cart/updateCart?id=" +
                  currCartId +
                  "&coupon_id=" +
                  this.couponIdApplied
              )
              .subscribe(res => {});
            }
            else{
              _self.localCartService.addInformationToCartProduct(_self.productId, { "coupon_code" : _self.couponCodeApplied, "coupon_id" : _self.couponIdApplied, "updated_price" : resp.updatedPrice });
            }
          }
          //=== End Updating Cart After Coupon Apply ===//

          this.success_msg = resp.msg;
        }

        if (resp.type == "error") {
          this.error_msg = resp.msg;
        }
      });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (this.membership_uemail) {
      this.authenticated = true;
    }
    //window.scroll(0,0);
    this.viewportScroller.scrollToPosition([0, 0]);
    this.productId = this.route.snapshot.paramMap.get("id");
    this.model.currProductId = this.productId;
    let _url = 'getProduct';
    _url += '?id=' + this.productId;
    if (this.authenticated) {
      _url += '&user_id=' + localStorage.getItem('user_id');
    }
    this.backendapiService
      .commonDataFetchFn(_url)
      .subscribe(res => {
        this.product_details = res.data;
        this.inStock = this.product_details.is_in_stock;
        this.setGalleryImages(this.product_details.get_media);
        this.productPrice = res.data.product_actual_price;

        if ( this.product_details.get_category !== undefined && this.product_details.get_category.name !== undefined ) {
          if (
            this.product_details.get_category.get_parent_category !== undefined &&
            this.product_details.get_category.get_parent_category.name !== undefined
          ) {
            this.breadcrumbs.push({
              url: '/category/' + this.product_details.get_category.get_parent_category.slug,
              name: this.product_details.get_category.get_parent_category.name,
              hasNext : true
            });
          }
          this.breadcrumbs.push({
            url: '/category/' + this.product_details.get_category.slug,
            name: this.product_details.get_category.name,
            hasNext : true
          });
        }

        this.breadcrumbs.push({
          name: this.product_details.product_name,
          hasNext : false,
          url: undefined
        });
        /** Moved to Server Side
        if (
          this.authenticated == true &&
          this.product_details.priority_pricing_amount
        ) {
          this.productPrice = res.data.priority_pricing_amount;
        }
        if (
          this.authenticated == true &&
          !this.product_details.priority_pricing_amount
        ) {
          this.productPrice = res.data.product_price;
        }
        */
        this.isAddedToCart(this.productId);
      });

      this.backendapiService.currentMessage.subscribe(message => {
        this.settings = message;
      });

    // console.log(this.cartId);
    this.baseurl = this.backendapiService.getBaseUrl();
    this.sitemane = this.backendapiService.getSiteName();
    // this.titleService.setTitle(this.product_details.product_name +' | '+ this.sitemane);
  }

  public getReferAFriendUrl(){
    let _emailTriggerUrl = '';
    let _subject = "You May Like "+this.product_details.product_name+" of "+this.sitemane;
    let _body = "Hi\n I like "+this.product_details.product_name+" product of "+this.sitemane +".\n You may also checkout this from here : ";
    if(this.authenticated){
      _emailTriggerUrl = "mailto:?subject="+encodeURI(_subject)+"&body="+encodeURI(_body)+encodeURI(localStorage.getItem("user_referral_link"))+"%26xhttp="+'/products/'+this.productId;
    }
    else{
      _emailTriggerUrl = "mailto:?subject="+encodeURI(_subject)+"&body="+encodeURI(_body)+this.settings.site_url+"%3Fxhttp="+'/products/'+this.productId;
    }
    window.location.href = _emailTriggerUrl;
  }
  public setGalleryImages(images) {
    let imageArray = [];

    if (images.length) {
      images.forEach(element => {
        let obj = {small: '', medium: '', big: ''};
        obj.small = `${this.baseurl}backend/images/products/${element.image}`;
        obj.medium = `${this.baseurl}backend/images/products/${element.image}`;
        obj.big = `${this.baseurl}backend/images/products/${element.image}`;
        imageArray.push(obj);
      });
    } else {
      const defaultImage = 'https://via.placeholder.com/535x300.png?text=No%20Image%20Found';
      const obj = {small: defaultImage, medium: defaultImage, big: defaultImage};
      imageArray.push(obj);
    }
    this.galleryImages = imageArray;
  }

  public handleQuantityUpdate(quantityUpdateResponse) {
    if(quantityUpdateResponse.productId === this.product_details.id) {
      this.quantity = quantityUpdateResponse.quantity;
      if(this.is_addedToCart === true) {
        this.toastrService.info('please update cart!');
      }
    }
  }

  public onStockEntryNotifyMe(f : NgForm){
    const _self = this;
    this.backendapiService.commonDataPostFn('admin/notify-me', _self.model).toPromise().then((resp) => {
      if(resp.type != undefined){
        if(resp.type == "success"){
          _self.toastrService.success(resp.msg, "Congratulations!");
        }
        else{
          _self.toastrService.error(resp.msg, "Error!");
        }
      }
      else {
        _self.toastrService.error("Something went wrong, please contact administrator.", "Error!");
      }
    });
  }
  public getSavePercentage(price) {
    const percentage = (( ( this.product_details.product_list_price - price ) / this.product_details.product_list_price ) * 100).toFixed(2);
    return percentage;
  }
  public biilingModelChanged(modelType) {
    this.selectedBillingModel = modelType;
    // console.log(this.is_addedToCart);
    if(this.is_addedToCart === true) {
      this.toastrService.info('please update cart!');
    }
}
}
