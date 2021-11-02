import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  constructor(
    private titleService: Title,
    private backendapiService: BackendapiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ll_order_id: any;
  membership_uemail = '';
  authenticated: any = false;
  order: any;
  baseurl: any;
  siteName: string;
  total = 0.0;
  order_details: any;
  order_view_data: any;
  cancelSubsConfirmationDialog = false;
  cancelSubsConfBtn = true;
  success_msg = '';
  error_msg = '';
  subscriptionCancelled = false;
  orderDetailsId: any = '';
  trackingNo: any = '';
  courierInfo: any;
  public orderHasWalletTransaction: any;
  showLoader:boolean = false;
  couponDiscountPrice = 0.0;
  totalProductPrice = 0.0;
  shippingAmount = 0.0;
  wallet: any;
  transaction_amount: any = 0.00;

  cancelSubsConfirmationDialogFn(orderDetailsId) {
    this.cancelSubsConfirmationDialog = true;
    this.cancelSubsConfBtn = false;
    this.orderDetailsId = orderDetailsId;
  }

  ignoreCacelSubsConfirmation() {
    this.cancelSubsConfirmationDialog = false;
    this.cancelSubsConfBtn = true;
    this.orderDetailsId = '';
  }

  cancelSubsConfirmation() {
    this.ll_order_id = this.route.snapshot.paramMap.get('ll_order_id');
    const ODID = this.orderDetailsId;
    this.backendapiService
      .commonDataFetchFn(
        'admin/order/updateRecurring?ll_order_id=' +
          this.ll_order_id +
          '&order_details_id=' + ODID
      )
      .subscribe(resp => {
        if (resp.type === 'success') {
          this.success_msg = resp.msg;
          this.cancelSubsConfirmationDialog = false;
          this.cancelSubsConfBtn = false;
        } else {
          this.error_msg = resp.msg;
          this.cancelSubsConfirmationDialog = true;
          window.scrollTo(0, 0);
        }
      });
  }

  // getTrackingNo(){
  //   this.ll_order_id = this.route.snapshot.paramMap.get("ll_order_id");
  //   this.backendapiService.commonDataFetchFn('admin/order/orderView?ll_order_id='+this.ll_order_id).subscribe(resp => {
  //       this.order_view_data = resp.data;
  //       this.trackingNo = this.order_view_data.tracking_number;
  //       if(this.trackingNo == ''){
  //         this.error_msg = 'Order is in-processing and will be tracked soon.';
  //       }else{
  //         this.success_msg = 'Order has been tracked successfully.';
  //         this.backendapiService.commonDataFetchFn('admin/order/saveTrackingNo?ll_order_id='+this.ll_order_id+'&tracking_number='+this.trackingNo).subscribe(resp => {
  //         });
  //       }
  //   });
  // }


  ngOnInit() {
    this.membership_uemail = localStorage.getItem('membership_uemail');
    if (this.membership_uemail) {
      this.authenticated = true;
    } else {
      this.router.navigate(['/login']);
    }

    this.ll_order_id = this.route.snapshot.paramMap.get('ll_order_id');
    this.showLoader = true;
    this.backendapiService
      .commonDataFetchFn(
        'admin/order/fetchOrderData?ll_order_id=' + this.ll_order_id
      )
      .subscribe(resp => {
        this.showLoader = false;
        this.order = resp.data[0];
        this.totalProductPrice = this.order.sub_total;
        this.couponDiscountPrice = this.order.coupon_discount_price;
        this.shippingAmount = resp.shipping_amount;
        this.trackingNo = this.order.tracking_number;
        this.order_details = this.order.get_order_details;
        this.orderHasWalletTransaction = (this.order.get_order_to_wallet_transaction != undefined && this.order.get_order_to_wallet_transaction != null) ? this.order.get_order_to_wallet_transaction : undefined;
        this.total = resp.total;
        this.courierInfo = resp.order_details.courier;

        if ((this.order.get_order_to_wallet_transaction != undefined && this.order.get_order_to_wallet_transaction != null) && this.order.get_order_to_wallet_transaction.get_wallet_transactions.is_active === 1 ) {
          this.wallet = this.order.get_order_to_wallet_transaction.get_wallet_transactions;
          this.transaction_amount = this.wallet.transaction_amount;
          //this.total = this.total - this.transaction_amount;
        }

        // this.wallet = (this.order.get_order_to_wallet_transaction != undefined && this.order.get_order_to_wallet_transaction != null) ? this.order.get_order_to_wallet_transaction : undefined;
        // this.transaction_amount = (this.wallet != undefined ? this.wallet.transaction_amount : 0.00);
      },
      err => {
        this.showLoader = false;
      });

    // this.backendapiService.commonDataFetchFn('admin/order/orderView?ll_order_id='+this.ll_order_id).subscribe(resp => {
    //   this.order_view_data = resp.data;
    // });

    this.baseurl = this.backendapiService.getBaseUrl();
    this.siteName = this.backendapiService.getSiteName();
    this.titleService.setTitle(
      this.siteName + ' | Order View - Order#' + this.ll_order_id
    );
  }
}
