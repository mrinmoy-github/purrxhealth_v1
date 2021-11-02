import { Component, OnInit } from "@angular/core";
import { BackendapiService } from "../backendapi.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  resetPasswordToken: string;
  flag_msg: string;
  flag_msg_show: string;

  constructor(
    private titleService: Title,
    private backendapiService: BackendapiService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ll_order_id:any;
  membership_uemail: string = '';
  authenticated: any = false;
  order: any;
  wallet: any;
  transaction_amount: any = 0.00;
  baseurl: any;
  siteName: string;
  total = 0.00;
  order_details:any;
  shippingAmount = 0.0;
  couponDiscountPrice = 0.0;
  totalProductPrice = 0.0;
  showLoader:boolean = false;
  ngOnInit() {
    this.showLoader = true;
    this.flag_msg_show = '';
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (this.membership_uemail) {
      this.authenticated = true;
    }else{
        // this.router.navigate(["/login"]);
    }

    this.ll_order_id = this.route.snapshot.paramMap.get('ll_order_id');
    this.backendapiService.commonDataFetchFn('admin/order/fetchOrderData?ll_order_id='+this.ll_order_id).subscribe(resp => {
      this.showLoader = false;
      this.order = resp.data;
      this.order_details = this.order[0].get_order_details;
      this.total = resp.total;
      this.shippingAmount = resp.shipping_amount;
      this.totalProductPrice = this.order[0].sub_total;
      this.couponDiscountPrice = this.order[0].coupon_discount_price;
      // Wallet Logic Removed
      if (this.order[0].get_order_to_wallet_transaction.get_wallet_transactions.is_active === 1 ) {
        this.wallet = this.order[0].get_order_to_wallet_transaction.get_wallet_transactions;
        this.transaction_amount = this.wallet.transaction_amount;
        //this.total = this.total - this.transaction_amount;
      }
    },
    err => {
      this.showLoader = false;
    });
    this.baseurl = this.backendapiService.getBaseUrl();
    this.siteName = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.siteName + ' | Order Success');

    this.resetPasswordToken = localStorage.getItem('resetToken');
    localStorage.removeItem('resetToken');

    //added swa
    this.flag_msg = localStorage.getItem('flag_msg');
    if(this.flag_msg === 'yes') {
      this.flag_msg_show = 'yes';
      localStorage.removeItem('flag_msg');
    }
    //added
  }

}
