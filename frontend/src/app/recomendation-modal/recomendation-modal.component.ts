import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ActivatedRoute, Router } from '@angular/router';
import { BackendapiService } from "../backendapi.service";

export interface RecommendationModel {
  products:any;
  user_id:any;
  title: any;
  colCount: number;
}
@Component({
  selector: 'app-recomendation-modal',
  templateUrl: './recomendation-modal.component.html',
  styleUrls: ['./recomendation-modal.component.css']
})
export class RecomendationModalComponent extends DialogComponent<RecommendationModel, boolean> implements RecommendationModel {
  products: any = [];
  user_id: any = '';
  title: any = 'Recommended';
  selectedProductId : any = {};
  colCount: number = 3;
  baseurl: any = ''; //this.backendapiService.getBaseUrl();
  constructor(
    dialogService: DialogService,
    private router : Router,
    private backendapiService: BackendapiService
    ) { 
    super(dialogService);
    this.baseurl = this.backendapiService.getBaseUrl();
  }
  navigateProduct(){
    this.close();
  }

  viewProductDetails(productId){
    let _self = this;
    let _model = {
      "user_id" : _self.user_id,
      "product_id" : productId
    };
    _self.dismissFn(_model).subscribe((resp) => {
      if(resp.type == "success"){
        _self.router.navigate(['/products/'+productId]);
        _self.close();
      }
    });
  }

  dismissAll(){
    let _self = this;
    let _model = {
      "user_id" : _self.user_id
    };
    _self.dismissFn(_model).subscribe((resp) => {
      if(resp.type == "success"){
        _self.close();
      }
    });
  }

  dismissFn(model: any){
    return this.backendapiService.commonDataPostFn('admin/dismiss-user-recommendation', model);
  }
}
