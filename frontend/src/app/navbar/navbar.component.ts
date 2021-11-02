import { Component, OnInit } from "@angular/core";
import { BackendapiService } from "../backendapi.service";
import { ActivatedRoute } from "@angular/router";
import { LocalCartService } from "../providers/local-cart-service/local-cart.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  authenticated: any = false;
  membership_uemail: string;
  category_list: any;
  sitename: string;
  user_id: string;
  settingsdata: any;
  cartCount:any = 0;
  showSubMenu : Array<boolean> = [];

  constructor(
    private backendapiService: BackendapiService,
    private localCartService : LocalCartService
    ) {}

  signout() {
    window.setTimeout(this.signoutprocess, 2000);
  }

  signoutprocess() {
    localStorage.removeItem("membership_uemail");
    localStorage.removeItem("user_id");
    localStorage.removeItem("referral_code");
    localStorage.removeItem("user_referral_link");
    window.location.href = "";
  }

  toggleNavMenu() {
    document.getElementsByClassName('st-container')[0].classList.remove('st-menu-open');
  }
  ngOnInit() {

    this.membership_uemail = localStorage.getItem("membership_uemail");
    this.user_id = localStorage.getItem("user_id");
    // console.log(this.membership_uemail);
    if (this.membership_uemail) {
      this.authenticated = true;

      this.backendapiService.getCartCount("admin/cart/getCartCount?user_id="+this.user_id).subscribe(res => {
        this.cartCount = res.cartCount;
      });
    }
    else{
        this.cartCount = this.localCartService.getCount();
    }

    this.backendapiService.currentMessage.subscribe(message => {
      // console.log(message);
      this.settingsdata = message;
    });

    this.sitename = this.backendapiService.getSiteName();
    this.backendapiService.getCategories("getCategories").subscribe(res => {
      this.category_list = res.data;
    });


  }
  toggleSubMenu(i) {
    this.showSubMenu[i] = (this.showSubMenu[i] === true) ? false: true;
  }
}
