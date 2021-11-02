import { Component, OnInit } from "@angular/core";
import { BackendapiService } from "../backendapi.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor(
    private titleService: Title,
    private backendapiService: BackendapiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }
  showLoader:boolean;
  ll_order_id:any;
  membership_uemail: string = '';
  user_id: any;
  authenticated: any = false;
  all_orders: any;
  baseurl: any;
  siteName: string;
  total = 0.00;
  orderCount:any;

  ngOnInit() {
    
    this.membership_uemail = localStorage.getItem("membership_uemail");
    this.user_id = localStorage.getItem("user_id");
    if (this.membership_uemail) {
      this.authenticated = true;
    }else{     
        this.router.navigate(["/login"]);
    }  
    this.showLoader = true;      
    this.backendapiService.commonDataFetchFn('admin/order/allOrdersListing?user_id='+this.user_id).subscribe(resp => {
      
      this.all_orders = resp.data;
      this.orderCount = this.all_orders.length;
      this.showLoader = false;
    },err => {
      this.showLoader = false;
    });
    this.baseurl = this.backendapiService.getBaseUrl();
    this.siteName = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.siteName+' | My Orders');
  }

  buyItAgain(orderId) {
    const url = `admin/order/buyOrderAgain?user_id=${this.user_id}&order_id=${orderId}`;
    this.showLoader = true;
    this.backendapiService.commonDataFetchFn(url).subscribe(resp => {
      this.showLoader = false;
      if(resp.type == "success") {
        this.updateCartItemCount(resp.cartCount);
        this.router.navigate(['/cart']);
      } else {
        this.toastr.error('Can not add products to cart!', 'Oops!');
      }
    },err => {
      this.showLoader = false;
    });
  }

  updateCartItemCount(cartCount) {
    var itemCount = <HTMLFormElement>document.getElementById('item-count');
    if(cartCount == 0 || cartCount == 1){
      itemCount.innerHTML = cartCount + ' ITEM';
    }else{
      itemCount.innerHTML = cartCount + ' ITEMS';
    }

  }

}

