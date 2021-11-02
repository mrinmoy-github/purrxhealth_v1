import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BackendapiService } from '../backendapi.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-my-subscription-details',
  templateUrl: './my-subscription-details.component.html',
  styleUrls: ['./my-subscription-details.component.css']
})
export class MySubscriptionDetailsComponent implements OnInit {

  ll_order_id: any;
  membership_uemail: string = "";
  authenticated: any = false;
  order: any;
  baseurl: any;
  siteName: string;
  order_details: any;
  cancelSubsConfirmationDialog = false;
  cancelSubsConfBtn = true;
  orderDetailsId: any;
  previousUrl: any;
  modalRef: BsModalRef;
  changedSubscriptionFreequency;
  changedSubscriptionProduct;
  subscriptionFreequencyOptions;
  subscriptionProductsOptions;
  userId: string;
  showLoader:boolean = false;
  updateSubscriptionModel = {
    order_id: '',
    product_id: '',
    rec_product_id : '',
    order_details_id: '',
    billing_model_id: '',
    additional_product_id: '',
    _type: 'update',
    quantity: null,
    recurring_date : ''
  };

  cancelSubscriptionModel = {
    order_id: '',
    order_details_id: ''   
  };
  showMainProductAlert = true;
  canModify = false;
  ll_order_details: any;
  getSubscriptedCount: any;
  changedRebillDate;
  minDate = new Date();

  constructor(
    private titleService: Title,
    private backendapiService: BackendapiService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (this.membership_uemail) {
      this.authenticated = true;
      this.userId = localStorage.getItem("user_id");
    } else {
      this.router.navigate(["/login"]);
    }
    this.getSubscriptionProducts();
    this.baseurl = this.backendapiService.getBaseUrl();
    this.siteName = this.backendapiService.getSiteName();
    this.titleService.setTitle(
      this.siteName + " | Manage Subscription - Order#" + this.ll_order_id
    );

  }

  getSubscriptionProducts() {
    this.showLoader = true;
    this.ll_order_id = this.route.snapshot.paramMap.get("ll_order_id");
    this.backendapiService
      .commonDataFetchFn(
        "admin/order/fetchOrderData?ll_order_id=" + this.ll_order_id + '&subs=1'
      )
      .subscribe(resp => {
        this.showLoader = false;
        this.order = resp.data[0];
        // if (this.order.order_type == "subscription") {
          if (this.order.get_order_details && this.order.get_order_details.length) {
            this.order_details = this.order.get_order_details.filter(item => item.billing_model == "recurringSale");
            const mainProduct =  this.order_details.filter(item => item.is_main_product == 1)
            this.canModify = mainProduct && mainProduct.is_stopped_recurring != 1 ? true : false;
            this.ll_order_details = (resp.order_details !== undefined && resp.order_details !== null) ? resp.order_details : undefined;
            this.changedRebillDate = this.ll_order_details !== undefined ? this.ll_order_details.recurring_date : null;
            this.getSubscriptedCount = this.ll_order_details.products.length ? this.ll_order_details.products.some(
                (x) => x.is_recurring === '1'
              ) : '';
          }
        // } else {
        //   this.toaster.error('Invalid order selected');
        //   // this.router.navigate(["/my-orders"]);
        // }

      },
      err => {
        this.showLoader = false;
      });
  }

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

  cancelSubsConfirmation(showMessage = true) {
    this.cancelSubscriptionModel.order_id = this.route.snapshot.paramMap.get("ll_order_id");
    this.cancelSubscriptionModel.order_details_id = this.orderDetailsId;
    this.backendapiService
      // .commonDataFetchFn(
      //   "admin/order/updateRecurring?ll_order_id=" +
      //   this.ll_order_id +
      //   "&order_details_id=" + ODID
      // )
      .commonDataPostFn("admin/cancel-my-subscription", this.cancelSubscriptionModel)
      .subscribe(resp => {
        if (resp.type == 'success') {
          this.getSubscriptionProducts();
          if (showMessage) {
            this.toaster.success(resp.msg);
            this.cancelSubsConfirmationDialog = false;
            this.cancelSubsConfBtn = false;
          }
        } else {
          if (showMessage) {
            this.toaster.error(resp.msg);
            this.cancelSubsConfirmationDialog = true;
            window.scrollTo(0, 0);
          }
        }
      });
  }

  goBack() {
    history.back();
  }
  openModal(template: TemplateRef<any>, productId, orderDetailsId,recproductID) {
      const selectedItem = this.order_details.find(item => item.get_product.ll_product_id == productId);
      this.changedSubscriptionFreequency = selectedItem.billing_model_id;
      this.showMainProductAlert = selectedItem.is_main_product == 1 ? true : false;
      this.updateSubscriptionModel.product_id = productId;
      this.updateSubscriptionModel.rec_product_id = recproductID;
      this.updateSubscriptionModel.order_id = this.ll_order_id;
      this.updateSubscriptionModel.order_details_id = orderDetailsId;
      this.updateSubscriptionModel._type = 'update';
      this.updateSubscriptionModel.quantity = null;
      this.orderDetailsId = orderDetailsId;

    this.getFreequencyOptions();
    this.getAvailableProducts();
    this.modalRef = this.modalService.show(template);
  }
  openAddModal(template: TemplateRef<any>) {
    this.updateSubscriptionModel.order_id = this.ll_order_id;
    this.updateSubscriptionModel.quantity = 1;
    this.updateSubscriptionModel._type = 'add';
    this.getAvailableProducts();
    this.modalRef = this.modalService.show(template);
  }
  getFreequencyOptions() {
    this.backendapiService
      .commonDataFetchFn("admin/get-subscription-plans")
      .subscribe(resp => {
        if (resp.type == 'success') {
          this.subscriptionFreequencyOptions = resp.data;
        }
      });
  }

  getAvailableProducts() {
    this.backendapiService
      .commonDataPostFn("admin/get-available-products", { user_id: this.userId, order_id: this.order.id })
      .subscribe(resp => {
        if (resp.type == 'success') {
          this.subscriptionProductsOptions = resp.data;
        } else {
          this.toaster.error(resp.msg);
        }
      });
  }
  updateFreequency() {
    this.updateSubscriptionModel.billing_model_id = this.changedSubscriptionFreequency;
    this.updateSubscriptionModel.additional_product_id = '';
    this.updateMySubscription();
  }
  updateProduct() {
    this.updateSubscriptionModel.billing_model_id = '';
    this.updateSubscriptionModel.additional_product_id = this.changedSubscriptionProduct;
    this.updateMySubscription(true);
  }
  addProduct() {
    this.updateSubscriptionModel.billing_model_id = '';
    this.updateSubscriptionModel.additional_product_id = this.changedSubscriptionProduct;
    this.updateMySubscription(false);
  }
  handelProductQuantity(eventData) {
    if (eventData.quantity !== undefined) {
      this.updateSubscriptionModel.quantity = eventData.quantity;
    }
  }
  updateMySubscription(cancelOrder = false) {
    this.backendapiService
      .commonDataPostFn("admin/update-my-subscription", this.updateSubscriptionModel)
      .subscribe(resp => {
        if (resp.type == 'success') {
          this.subscriptionProductsOptions = resp.data;
          if(cancelOrder) {
            this.cancelSubsConfirmation(false);
          }
          this.ngOnInit();
          this.toaster.success(resp.msg);
          this.modalRef.hide();
        } else {
          this.modalRef.hide();
          this.toaster.error(resp.msg);          
        }
      });
  }

  updateNextShipmentDate() {
    let recur_date = this.dateformat(this.changedRebillDate);    
    this.updateSubscriptionModel.additional_product_id = '';
    this.updateSubscriptionModel.billing_model_id = '';
    this.updateSubscriptionModel.recurring_date = recur_date;
    this.updateSubscriptionModel._type = 'update_recurring_date';
    //console.log(recur_date);
    this.updateMySubscription(false);
  }

   dateformat(dt)
    {
      let d = new Date(dt);
      let month = d.getMonth()+1;
      let day = d.getDate();

      var output = (month<10 ? '0' : '') + month + "/" 
                  + (day<10 ? '0' : '') + day + '/'
                  + d.getFullYear();

      return output;
    }
}
