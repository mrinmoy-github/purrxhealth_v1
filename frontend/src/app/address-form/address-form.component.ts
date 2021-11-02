import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BackendapiService } from '../backendapi.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  @Input() type = 'billing';
  @Input() action = 'add';
  @Input() id = false;

  model: any = {address_type:'', id : '', user_id: '', country_id: '223'};
  stateList: any;
  stateListAvailable: boolean;
  membership_uemail: string;
  requiredCountries: any = {};
  countryList: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    this.model.user_id = localStorage.getItem('user_id');

    /*** Required Country Code can be given in the requiredCountries Array to List Only those Countries.
      If make the array blank it will fetch all the countries.***/
    this.requiredCountries = ['US'];
    this.backendapiService.getCountryList(this.requiredCountries).subscribe(res => {
      this.countryList = res.data;
      this.getStateList('US');
    });
    if(this.action == "edit" && this.id) {
      this.getAddressFormDetails();
    }

  }
  getStateList(country) {
    this.backendapiService.getStateList(country).subscribe(res => {
      this.stateList = res.data;
      this.stateListAvailable = true;
    });
  }

  getAddressFormDetails() {
    const addressPayload = {
      "user_id" : this.model.user_id,
      "address_type" : this.type,
      "id" : this.id,
    }
    this.backendapiService
      .commonDataPostFn("admin/get-address-list", addressPayload)
      .subscribe(resp => {
        this.model = resp.data;
        this.model.state = resp.data.state.state_code;
        this.getStateList(this.model.country);
      });
  }

  onSubmit(f: NgForm) {
    this.model.address_type = this.type;
    this.model.id = this.id;
    let stCurr = this.stateList.find(item => item.state_code == this.model.state);
    this.model.state_id = stCurr.state_id !== undefined ? stCurr.state_id : '';
    this.backendapiService.commonDataPostFn('admin/add-edit-user-addresses', this.model).subscribe(
      resp => {
        if (resp.type == 'success') {
          this.toaster.success(resp.msg);
          this.model = resp.data;
          window.scrollTo(0, 0);
          this.router.navigate(['address/' + this.type]);
        }
        if (resp.type == 'error') {
          this.toaster.error(resp.msg);
        }
      }
    );
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
