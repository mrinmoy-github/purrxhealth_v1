import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BackendapiService } from '../backendapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-form-wrapper',
  templateUrl: './address-form-wrapper.component.html',
  styleUrls: ['./address-form-wrapper.component.css']
})
export class AddressFormWrapperComponent implements OnInit {

  addressTypeName = 'Billing';
  actionType = 'Add';
  addressId: any;
  membership_uemail: string;

  constructor(
    private titleService: Title,
    private backendapiService: BackendapiService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (!this.membership_uemail) {
      this.router.navigate(['/login']);
    }

    this.route.params.subscribe(params => {
      this.addressTypeName = params['type'];
      this.actionType = params['action'];
      this.addressId = params['id'];

      if(this.actionType === 'add' || (this.actionType === 'edit' && this.addressId)) {
        // all correct
      } else {
        // redirect to home
        this.router.navigate(['/']);
      }
    });
  }

}
