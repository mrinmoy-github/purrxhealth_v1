import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { BackendapiService } from "../backendapi.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  public referralLink: string;
  public authenticated: boolean = false;
  public membership_uemail: string = '';
  public user_id: any = '';
  public siteName: string = '';
  public baseUrl : string = '';
  public settingsdata: any;
  public referralPercentage : string = '';
  public referralFlatNumber : string = '';
  public referralFlatCent : string = '';
  public walletAndReferralData : any ;
  public wallet : any;
  public refferalBlock: boolean = false;
  public walletAvailableNumber: string = '';
  public walletAvailableCent: string = '';

  constructor(
    private backendapiService: BackendapiService,
    private route: ActivatedRoute,
    private router : Router,
    private titleService: Title,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    this.user_id = localStorage.getItem("user_id");
    if (this.membership_uemail) {
      this.authenticated = true;
    }else{
        this.router.navigate(["/login"]);
    }
    this.siteName = this.backendapiService.getSiteName();
    this.baseUrl = this.backendapiService.getBaseUrl();
    this.backendapiService.currentMessage.subscribe(message => {
      this.settingsdata = message;
    });
    this.titleService.setTitle(this.siteName+' | My Wallet');
    let _self = this;
    let _model = {
      "user_id" : _self.user_id
    };
    _self.backendapiService.
      commonDataPostFn('admin/user-referral-wallet-informations', _model).subscribe((resp) => {
        if(resp.type === "success"){
          _self.refferalBlock = true;
          _self.walletAndReferralData = resp.data;
          _self.referralLink = _self.walletAndReferralData.referral_url;
          _self.referralPercentage = _self.walletAndReferralData.commission_percentage;
          let referralFlat = _self.walletAndReferralData.commission_flat;
          referralFlat = referralFlat.split(".");
          _self.referralFlatNumber = referralFlat[0];
          _self.referralFlatCent = referralFlat[1];
          _self.wallet = _self.walletAndReferralData.wallet;
          let walletAvailedAmount = _self.wallet.balanced_amount;
          walletAvailedAmount = walletAvailedAmount.split(".");
          _self.walletAvailableNumber = walletAvailedAmount[0];
          _self.walletAvailableCent = walletAvailedAmount[1];
        }
      });
  }

  gotoContactUsPage(){
    this.router.navigate(['contactus']);
  }

  showToaster(){
    this.toastr.success('Referral link is copied!', 'Copied!');
  }

}
