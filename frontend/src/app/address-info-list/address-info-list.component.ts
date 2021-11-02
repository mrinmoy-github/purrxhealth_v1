import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BackendapiService } from '../backendapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-info-list',
  templateUrl: './address-info-list.component.html',
  styleUrls: ['./address-info-list.component.css']
})
export class AddressInfoListComponent implements OnInit {

  addressType: any;
  allAddress = [];
  membership_uemail: string;
  user_id: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    this.user_id = localStorage.getItem('user_id');
    if (!this.membership_uemail) {
      this.router.navigate(['/login']);
    }

    this.route.params.subscribe(params => {
      this.addressType = params['type'];
    });
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
