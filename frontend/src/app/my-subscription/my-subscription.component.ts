import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-subscription',
  templateUrl: './my-subscription.component.html',
  styleUrls: ['./my-subscription.component.css']
})
export class MySubscriptionComponent implements OnInit {

  membership_uemail = '';
  user_id: any;
  authenticated: any = false;
  all_orders: any;
  baseurl: any;
  siteName: string;
  total = 0.00;
  orderCount: any;
  showLoader:boolean = false;
  constructor(
    private titleService: Title,
    private backendapiService: BackendapiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem('membership_uemail');
    this.user_id = localStorage.getItem('user_id');
    if (this.membership_uemail) {
      this.authenticated = true;
    } else {
        this.router.navigate(['/login']);
    }
    const _self = this;
    let url = 'admin/order/allOrdersListing?user_id=' + this.user_id + '&only_actives=1';
    url += '&' + encodeURI('order_types[0]=subscription') + '&' + encodeURI('order_types[1]=membership');
    this.showLoader = true;  
    this.backendapiService.commonDataFetchFn(url).subscribe(resp => {
      this.showLoader = false;  
      _self.all_orders = resp.data;
      _self.orderCount = this.all_orders.length;
    },
    err => {
      this.showLoader = false;  
    });
    _self.baseurl = this.backendapiService.getBaseUrl();
    _self.siteName = this.backendapiService.getSiteName();
    _self.titleService.setTitle(_self.siteName + ' | My Subscriptions');
  }

  buyItAgain(orderId) {
    const url = `admin/order/buyOrderAgain?user_id=${this.user_id}&order_id=${orderId}`;

    this.backendapiService.commonDataFetchFn(url).subscribe(resp => {
      // tslint:disable-next-line:triple-equals
      if ( resp.type == 'success' ) {
        this.updateCartItemCount(resp.cartCount);
        this.router.navigate(['/cart']);
      } else {
        this.toastr.error('Can not add products to cart!', 'Oops!');
      }
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

  getNextOrderDate(order) {
    if (order.orderDetails !== undefined) {
      if (
        order.orderDetails.recurring_date !== undefined &&
        order.orderDetails.recurring_date !== '' &&
        order.orderDetails.recurring_date !== '0000-00-00'
      ) {
        return order.orderDetails.recurring_date;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}
