import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  model: any = {};
  requiredCountries: any = {};
  baseurl: any;
  sitename: string;
  countryList: any;
  stateList: any;
  stateListAvailable: any = false;
  success_msg: string = '';
  error_msg: string = '';
  membership_uemail: string = '';
  AFID: any; SID: any; AFFID: any; C1: any; C2: any; C3: any; AID: any; OPT: any; click_id: any;
  public referralCode : string;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService
  ) { }

  //======= Fetching the States for the selected Country ==========//
  getStateList(country) {
    this.backendapiService.getStateList(country).subscribe(res => {
      this.stateList = res.data;
      this.stateListAvailable = true;
    });
  }

  onSubmit(f: NgForm) {
    this.success_msg = '';
    this.error_msg = '';
    //==== Registering the User ====//
    if(this.referralCode !== undefined){
      this.model['referral_code'] = this.referralCode;
    }
    this.backendapiService.postSigninForm('postSigninForm', this.model).subscribe(
      resp => {
        if (resp.type == 'success') {
          var resetForm = <HTMLFormElement>document.getElementById('registrationform');
          resetForm.reset();
          this.success_msg = resp.msg;
          if(this.referralCode !== undefined){
            this.referralCode = undefined;
            localStorage.removeItem("referral_code");
          }
          window.scrollTo(0, 0);
        }
        if (resp.type == 'error') {
          this.error_msg = resp.msg;
        }
      }
    );
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }

  ngOnInit() {
    //======= Auth Checking ==========//
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (this.membership_uemail) {
      this.router.navigate(['']); //== If user logged in redirect ==//
    }

    window.scrollTo(0, 0);    

    this.model.AFID = this.route.snapshot.queryParamMap.get('AFID');
    this.model.SID = this.route.snapshot.queryParamMap.get('SID');
    this.model.AFFID = this.route.snapshot.queryParamMap.get('AFFID');
    this.model.C1 = this.route.snapshot.queryParamMap.get('C1');
    this.model.C2 = this.route.snapshot.queryParamMap.get('C2');
    this.model.C3 = this.route.snapshot.queryParamMap.get('C3');
    this.model.AID = this.route.snapshot.queryParamMap.get('AID');
    this.model.OPT = this.route.snapshot.queryParamMap.get('OPT');
    this.model.OPT = this.route.snapshot.queryParamMap.get('OPT');
    this.model.click_id = this.route.snapshot.queryParamMap.get('click_id');

    if(localStorage.getItem("referral_code")){
      this.referralCode = localStorage.getItem("referral_code");
    }

    /*** Required Country Code can be given in the requiredCountries Array to List Only those Countries.
    If make the array blank it will fetch all the countries.***/
    this.requiredCountries = ['US'];
    this.backendapiService.getCountryList(this.requiredCountries).subscribe(res => {
      this.countryList = res.data;
    });

    this.baseurl = this.backendapiService.getBaseUrl();
    this.sitename = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.sitename + ' | Signup');
  }

}
