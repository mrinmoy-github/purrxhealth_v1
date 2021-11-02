import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BackendapiService } from './backendapi.service';
import { FormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ClipboardModule } from 'ngx-clipboard';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgxGalleryModule } from 'ngx-gallery';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { LandingPageContentComponent } from './landing-page-content/landing-page-content.component';
import { AppRoutingModule } from './app-routing.module';
import { LimitToPipe } from './limit-to.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PagerComponent } from './pager/pager.component';
import { ErrorComponent } from './error/error.component';
import { CmsComponent } from './cms/cms.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductIndexComponent } from './product-index/product-index.component';
import { NewsLetterComponent } from './news-letter/news-letter.component';
import { LoginComponent } from './login/login.component';
import { MembershipComponent } from './membership/membership.component';
import { SignupComponent } from './signup/signup.component';
import { MembershipDetailsComponent } from './membership-details/membership-details.component';
import { CategoryIndexComponent } from './category-index/category-index.component';
import { BuyMembershipComponent } from './buy-membership/buy-membership.component';
import { MyAccountLeftMenuComponent } from './my-account-left-menu/my-account-left-menu.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AccessContentsComponent } from './access-contents/access-contents.component';
import { ProductLeftSideBarComponent } from './product-left-side-bar/product-left-side-bar.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { UpdateShippingInfoComponent } from './update-shipping-info/update-shipping-info.component';
import { UpdateBillingInfoComponent } from './update-billing-info/update-billing-info.component';
import { UpdatePaymentInfoComponent } from './update-payment-info/update-payment-info.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccessContentDetailsComponent } from './access-content-details/access-content-details.component';
import { RecomendationModalComponent } from './recomendation-modal/recomendation-modal.component';
import { MySubscriptionComponent } from './my-subscription/my-subscription.component';
import { MySubscriptionDetailsComponent } from './my-subscription-details/my-subscription-details.component';

// Custom Providers
import { LocalCartService } from './providers/local-cart-service/local-cart.service';
import { WalletComponent } from './wallet/wallet.component';
import { QuantityModifierComponent } from './quantity-modifier/quantity-modifier.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CmsListComponent } from './cms-list/cms-list.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressInfoListComponent } from './address-info-list/address-info-list.component';
import { AddressCardComponent } from './address-card/address-card.component';
import { AddressFormWrapperComponent } from './address-form-wrapper/address-form-wrapper.component';
import { SafePipe } from './safe.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { FaqComponent } from './faq/faq.component';
import { AboutcbdComponent } from './aboutcbd/aboutcbd.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { ProductDetails1Component } from './product-details1/product-details1.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProductComponent,
    LandingPageContentComponent,
    LimitToPipe,
    ProductDetailsComponent,
    PagerComponent,
    ErrorComponent,
    CmsComponent,
    ContactusComponent,
    ProductIndexComponent,
    NewsLetterComponent,
    LoginComponent,
    MembershipComponent,
    SignupComponent,
    MembershipDetailsComponent,
    CategoryIndexComponent,
    BuyMembershipComponent,
    MyAccountLeftMenuComponent,
    BillingInfoComponent,
    ShippingInfoComponent,
    MyOrdersComponent,
    AccessContentsComponent,
    ProductLeftSideBarComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    OrderViewComponent,
    UpdateShippingInfoComponent,
    UpdateBillingInfoComponent,
    UpdatePaymentInfoComponent,
    ForgotPasswordComponent,
    AccessContentDetailsComponent,
    RecomendationModalComponent,
    WalletComponent,
    QuantityModifierComponent,
    MySubscriptionComponent,
    MySubscriptionDetailsComponent,
    BreadcrumbComponent,
    ResetPasswordComponent,
    CmsListComponent,
    AddressFormComponent,
    AddressInfoListComponent,
    AddressCardComponent,
    AddressFormWrapperComponent,
    SafePipe,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    ScrollToTopComponent,
    FaqComponent,
    AboutcbdComponent,
    ProductDetails1Component,
    TestComponent
  ],
  entryComponents: [
    RecomendationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BootstrapModalModule.forRoot({container:document.body}),
    ClipboardModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxGalleryModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    NgSelectModule,
    AccordionModule.forRoot()
  ],
  providers: [
    BackendapiService,
    Title,
    LocalCartService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
