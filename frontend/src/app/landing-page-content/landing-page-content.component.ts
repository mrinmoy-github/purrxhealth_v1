import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { DialogService } from "ng2-bootstrap-modal";
import { RecomendationModalComponent } from "../recomendation-modal/recomendation-modal.component";

interface response1 {
  data: any;
}

@Component({
  selector: 'app-landing-page-content',
  templateUrl: './landing-page-content.component.html',
  styleUrls: ['./landing-page-content.component.css']
})
export class LandingPageContentComponent implements OnInit {

  pageTitle:string;
  baseurl: any;
  product_list: response1;
  product_list1: response1;
  currentPageNo: string;
  authenticated: any = false;
  membership_uemail: string;
  user_id: any;

  public constructor(
    private titleService: Title,
    private backendapiService: BackendapiService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService:DialogService
  ) { }
 
  category_list:any;
  
  routeProductDetails(productId){
    this.router.navigate(['/products/'+productId]);
  }

  ngOnInit() {
    let _self = this;
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (this.membership_uemail) {
      this.user_id = localStorage.getItem("user_id");
      this.authenticated = true;
    }
    else{
      this.route.queryParams.subscribe(params => {
        if(params['xref'] !== undefined && params['xref'] !== ''){
          localStorage.removeItem("referral_code");
          localStorage.setItem("referral_code", params['xref']);
          _self.router.navigate(['']);
        }
      });
    }
    /* Redirect Parameter */
    this.route.queryParams.subscribe(params => {
      if(params['xhttp'] !== undefined){
        _self.router.navigate([params['xhttp']]);
      }
    });
    /* Redirect Parameter */
    this.backendapiService.commonDataFetchFn('getAllProductCategories').subscribe(res => {
      this.category_list = res.data;
    });

    this.backendapiService.getProducts('getProducts?media=1').subscribe(res => {
      this.product_list1 = res.data;
      this.product_list = this.product_list1.data;
      this.currentPageNo = res.data.current_page;
    });

    this.baseurl = this.backendapiService.getBaseUrl();
    this.pageTitle = this.backendapiService.getSiteName();
    this.titleService.setTitle( this.pageTitle );

    if(this.authenticated){
      let _self = this;
      let _body = {
        "email" : _self.membership_uemail,
        "user_id" : _self.user_id
      };
      _self.backendapiService
        .commonDataPostFn('admin/get-recommendations', _body)
        .subscribe((resp) => {
          if(resp.type != undefined && resp.type === "success"){
            let _colCount = 3;
            if(resp.data.length != undefined){
              if(resp.data.length > 3){
                _colCount = 5;
              }
              else if(resp.data.length == 3){
                _colCount = 3;
              }
              else if(resp.data.length == 2){
                _colCount = 2;
              }
              else if(resp.data.length == 1){
                _colCount = 1;
              }
            }
            let _obj  = {
              products: resp.data, 
              user_id: _self.user_id,
              title: "You may also like!",
              colCount: _colCount
            };
            let disposable = _self.dialogService.addDialog(RecomendationModalComponent, _obj);
          }
        });
    }
  }

}
