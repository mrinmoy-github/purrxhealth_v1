import { Component, OnInit, OnDestroy } from "@angular/core";
import { BackendapiService } from "../backendapi.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductLeftSideBarComponent } from '../product-left-side-bar/product-left-side-bar.component';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-lander',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  product_list: any;
  product_list1: any;
  baseurl: any;
  sitename: string;
  currentPageNo: string;
  categoryName: any;
  categoryDesc: any;
  totalItems: any;
  authenticated: any = false;
  membership_uemail: string;
  productCatId: string = '';
  productCatSlug: string;
  productCategory: any;
  public subCategories: any;
  breadcrumbs;
  public categoryBanners;

  public constructor(
    private titleService: Title,
    private backendapiService: BackendapiService,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }


  routeProductDetails(productId) {
    this.router.navigate(['/products/' + productId]);

  // routeProductDetails(productId) {
  //   this.router.navigate(['/products1/' + productId]);


  }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem('membership_uemail');
    if (this.membership_uemail) {
      this.authenticated = true;
    }

    this.route.paramMap.subscribe(params => {
      // this.productCatId = this.route.snapshot.paramMap.get('id');
      this.productCatSlug = this.route.snapshot.paramMap.get('slug');
      const _self = this;
      _self.breadcrumbs = [{
        name: 'Home',
        url: '',
        hasNext: true
      }];
      let _url = 'getProducts?page=1&media=1&limit=18&catid=' + this.productCatId + '&category_slug=' + this.productCatSlug;
      if (this.authenticated) {
        _url = _url + '&user_id=' + localStorage.getItem('user_id');
      }
      this.backendapiService
      .getProducts(_url)
      .subscribe(res => {
        this.product_list1 = res.data;
        this.product_list = (this.product_list1.data !== undefined) ? this.product_list1.data : this.product_list1;
        this.currentPageNo = res.data.current_page;
        this.totalItems = (res.data.total !== undefined) ? res.data.total : ((res.total !== undefined) ? res.total : 0);
        if (this.product_list.length > 0 && this.product_list[0].get_category !== null && this.product_list[0].get_category !== undefined) {
          this.categoryName = this.product_list[0].get_category.name;
          this.categoryDesc = this.product_list[0].get_category.description;
        } else {
          this.categoryName = '';
          this.categoryDesc = '';
        }
        if (res.category_details !== undefined) {
          this.productCategory = res.category_details;
          this.categoryName = this.productCategory.name;
          this.categoryDesc = this.productCategory.description;
          if (
            res.category_details.get_parent_category &&
            res.category_details.get_parent_category.name !== undefined
          ) {
            _self.breadcrumbs.push({
              url: '/category/' + res.category_details.get_parent_category.slug,
              name: res.category_details.get_parent_category.name,
              hasNext: true
            });
          }
          _self.categoryBanners = res.category_details.get_banners;
        }

        if ( res.subCategories && res.subCategories !== null && res.subCategories != [] ) {
          _self.subCategories = res.subCategories;
          console.warn(_self.subCategories);
        } else {
          _self.subCategories = undefined;
        }

        _self.breadcrumbs.push({
          name: this.categoryName,
          hasNext: false,
          url: undefined
        });
      });
    });

    // this.productCatId = this.route.snapshot.paramMap.get('id');
    console.log(this.productCatId);
    // window.location.href="/categoryProducts/"+this.productCatId;

    this.baseurl = this.backendapiService.getBaseUrl();
    this.sitename = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.sitename + " | Products");
    //window.scrollTo(0, 0);
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public routeSubCategory( slug: string ) {
    this.router.navigate( ['category/' + slug] );
  }

  ngOnDestroy() {
    this.breadcrumbs = [];
  }

  getShortDescription(category){
    let subStr = category.description;
    if (category.description.length > 50) {
      subStr = category.description.substr(0, 50) +
            "...<p class='category_link'><a href='/#/category/" + category.slug + "'>Continue Reading</a></p>";
    }
    return subStr;
  }
}
