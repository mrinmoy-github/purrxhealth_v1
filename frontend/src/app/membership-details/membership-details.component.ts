import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import * as  ImageSlider from './../shared/class/image-slider';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-membership-details',
  templateUrl: './membership-details.component.html',
  styleUrls: ['./membership-details.component.css']
})
export class MembershipDetailsComponent implements OnInit {

  membership_details: any;
  baseurl: any;
  membershipId: string;
  siteName: string;
  membership_uemail: string = '';
  authenticated: any = false;
  descTabVisible: any = false;
  reviewTabVisible: any = false;
  public settings: any;
  public _isInStock = 0;
  model: any = {};


  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService,
    private toastrService: ToastrService
  ) {
    this.galleryOptions = ImageSlider.config;
   }


  toggleTab(niddle){
    if(niddle == 'review'){
      this.reviewTabVisible = true;
      this.descTabVisible = false;
    }
    if(niddle == 'description'){
      this.descTabVisible = true;
      this.reviewTabVisible = false;
    }
  }

  buyMembership(membershipId){
    this.router.navigate(['/buyMembership/'+membershipId]);
  }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (this.membership_uemail) {
      this.authenticated = true;
    }
    this.descTabVisible = true;
    this.membershipId = this.route.snapshot.paramMap.get('id');
    this.backendapiService.getProduct('getMembershipPackage', this.membershipId).subscribe(res => {
      this.membership_details = res.data;
      this._isInStock = parseInt(this.membership_details.is_instock);
      this.model.membership_package_id = this.membershipId;
      this.setGalleryImages(this.membership_details.get_media);
    });

    this.backendapiService.currentMessage.subscribe(message => {
      this.settings = message;
    });

    this.baseurl = this.backendapiService.getBaseUrl();
    this.siteName = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.siteName+' | Membership Details');
  }

  public getReferAFriendUrl(){
    let _emailTriggerUrl = '';
    let _subject = "You May Like "+this.membership_details.product_name+" of "+this.siteName;
    let _body = "Hi\n I like "+this.membership_details.product_name+" membership of "+this.siteName +".\n You may also checkout this from here : ";
    if(this.authenticated){
      _emailTriggerUrl = "mailto:?subject="+encodeURI(_subject)+"&body="+encodeURI(_body)+encodeURI(localStorage.getItem("user_referral_link"))+"%26xhttp="+'/membershipDetails/'+this.membershipId;
    }
    else{
      _emailTriggerUrl = "mailto:?subject="+encodeURI(_subject)+"&body="+encodeURI(_body)+this.settings.site_url+"%3Fxhttp="+'/membershipDetails/'+this.membershipId;
    }
    window.location.href = _emailTriggerUrl;
  }
  public setGalleryImages(images) {
    let imageArray = [];

    if (images.length) {
      images.forEach(element => {
        let obj = {small: '', medium: '', big: ''};
        obj.small = `${this.baseurl}backend/images/membershipPackage/${element.image}`;
        obj.medium = `${this.baseurl}backend/images/membershipPackage/${element.image}`;
        obj.big = `${this.baseurl}backend/images/membershipPackage/${element.image}`;
        imageArray.push(obj);
      });
    } else {
      const defaultImage = 'https://via.placeholder.com/550x300.png?text=No%20Image%20Found';
      const obj = {small: defaultImage, medium: defaultImage, big: defaultImage};
      imageArray.push(obj);
    }
    this.galleryImages = imageArray;
    console.log(this.galleryImages);

  }

  public onStockEntryNotifyMe(f){
    const _self = this;
    this.backendapiService.commonDataPostFn('admin/notify-me', _self.model).toPromise().then((resp) => {
      if(resp.type != undefined){
        if(resp.type == "success"){
          _self.toastrService.success(resp.msg, "Congratulations!");
        }
        else{
          _self.toastrService.error(resp.msg, "Error!");
        }
      }
      else {
        _self.toastrService.error("Something went wrong, please contact administrator.", "Error!");
      }
    });
  }
}
