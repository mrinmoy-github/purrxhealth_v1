import { Component, OnInit } from "@angular/core";
import { BackendapiService } from "../backendapi.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { LocalCartService } from "../providers/local-cart-service/local-cart.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  sitename: string;
  showLoader : boolean;
  loginButtonText : any = "Login";
  model: any = {};
  success_msg: string = "";
  error_msg: string = "";
  membership_uemail: string = "";
  _this: any;
  redirectLink = '/';
 

  public constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService,
    private localCartService: LocalCartService,
    private toastr: ToastrService
  ) {}

  onSubmit(f: NgForm) {
    this.success_msg = "";
    this.error_msg = "";
    let _cart = this.localCartService.getCart();
    let _cartCount = this.localCartService.getCount();
    if(_cartCount > 0){
      this.model['cart'] = _cart;
    }
    this.showLoader = true;
    this.loginButtonText = "Processing...";
    let _self = this;
    this.backendapiService
      .postLoginForm("postLoginForm", this.model)
      .subscribe(
        resp => {
        this.showLoader = false;
        this.loginButtonText = "Login";
        if (resp.type == "success") {
          var resetForm = <HTMLFormElement>document.getElementById("frmForm");
          resetForm.reset();
          //this.success_msg = resp.msg;
          this.toastr.success(resp.msg, 'Success!');
          localStorage.setItem("membership_uemail", resp.user_email);
          localStorage.setItem("user_id", resp.user_id);
          localStorage.setItem("user_referral_link", resp.user_referral_link);
          
          if(localStorage.getItem('continue_membership_purchase')) {
            this.redirectLink = '/buyMembership/'+ localStorage.getItem('continue_membership_purchase');
            localStorage.removeItem('continue_membership_purchase');
          } 
          else if(localStorage.getItem('continue_checkout')) {
            this.redirectLink = '/checkout';
            localStorage.removeItem('continue_checkout');
          }
          else {
            this.redirectLink = '';
          }
          if(_cartCount > 0){
            _self.localCartService.clearCart();
          }
          if(localStorage.getItem("referral_code")){
            localStorage.removeItem("referral_code");
          }
          window.setTimeout(this.afterSigninprocess, 2000);
          // this.router.navigate([""]);
        }
        if (resp.type == "error") {
          this.toastr.error(resp.msg, 'Oops!');
          //this.error_msg = resp.msg;
        }
      },
      err => {
        this.showLoader = false;
        this.loginButtonText = "Login";
        this.toastr.error("Something went wrong while processing your request.", 'Oops!');
      });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }

  onClickSignupLink() {
    this.router.navigate(["/signup"]);
  }

  afterSigninprocess() {
    window.location.href = this.redirectLink ? this.redirectLink : '';
  }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    // console.log(this.membership_uemail);
    if (this.membership_uemail) {
      this.router.navigate([""]);
    }

    window.scrollTo(0, 0);
    this.sitename = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.sitename + " | Login");
    this.showLoader = false;
    this.loginButtonText = "Login";
  }
}
