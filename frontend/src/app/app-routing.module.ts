import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageContentComponent } from './landing-page-content/landing-page-content.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetails1Component } from './product-details1/product-details1.component';
import { ErrorComponent } from './error/error.component';
import { CmsComponent } from './cms/cms.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductIndexComponent } from './product-index/product-index.component';
import { CategoryIndexComponent } from './category-index/category-index.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipDetailsComponent } from './membership-details/membership-details.component';
import { BuyMembershipComponent } from './buy-membership/buy-membership.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AccessContentsComponent } from './access-contents/access-contents.component';
import { AccessContentDetailsComponent } from './access-content-details/access-content-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { UpdateBillingInfoComponent } from './update-billing-info/update-billing-info.component';
import { UpdateShippingInfoComponent } from './update-shipping-info/update-shipping-info.component';
import { UpdatePaymentInfoComponent } from './update-payment-info/update-payment-info.component';
import { WalletComponent } from './wallet/wallet.component';
import { MySubscriptionComponent } from './my-subscription/my-subscription.component';
import { MySubscriptionDetailsComponent } from './my-subscription-details/my-subscription-details.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CmsListComponent } from './cms-list/cms-list.component';
import { AddressInfoListComponent } from './address-info-list/address-info-list.component';
import { AddressFormWrapperComponent } from './address-form-wrapper/address-form-wrapper.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { FaqComponent } from './faq/faq.component';
import { AboutcbdComponent } from './aboutcbd/aboutcbd.component';
// import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: LandingPageContentComponent },
  { path: 'order-success/:ll_order_id', component: OrderSuccessComponent },
  { path: 'login', component: LoginComponent },
  /*{ path: 'signup', component: SignupComponent },*/
  { path: 'signup', component: MembershipComponent }, // For Syncronize te process of Signup
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'blogs', component: CmsListComponent },
  { path: 'blog/:slug', component: CmsComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'category/:slug', component: ProductComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products1/:id', component: ProductDetails1Component },
  { path: 'products-list', component: ProductIndexComponent },
  { path: 'categories-list', component: CategoryIndexComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'membershipDetails/:id', component: MembershipDetailsComponent },
  { path: 'buyMembership/:id', component: BuyMembershipComponent },
  { path: 'address/:type/:action', component: AddressFormWrapperComponent },
  { path: 'address/:type/:action/:id', component: AddressFormWrapperComponent },
  { path: 'address/:type', component: AddressInfoListComponent },
  // { path: 'shippingInfo', component: ShippingInfoListComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'order-view/:ll_order_id', component: OrderViewComponent },
  { path: 'update-shipping-info/:ll_order_id', component: UpdateShippingInfoComponent },
  { path: 'update-billing-info/:ll_order_id', component: UpdateBillingInfoComponent },
  { path: 'update-payment-info/:ll_order_id', component: UpdatePaymentInfoComponent },
  { path: 'generic-content', component: AccessContentsComponent },
  { path: 'generic-content/:id', component: AccessContentDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'my-subscription', component: MySubscriptionComponent },
  { path: 'my-subscription/:ll_order_id', component: MySubscriptionDetailsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'aboutcbd', component: AboutcbdComponent },
  { path: '**', component: ErrorComponent },
  // { path: 'test', component: TestComponent },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}



