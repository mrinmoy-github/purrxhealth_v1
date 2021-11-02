import { Component, TemplateRef, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BackendapiService } from '../backendapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent implements OnChanges {

  @Input() type;
  @Input() viewType = 'modify';
  @Output() addressSelected = new EventEmitter();

  allAddress: any;
  model: any = {};
  modalRef: BsModalRef;
  addrId: any;

  constructor(
    private backendapiService: BackendapiService,
    private router: Router,
    private toaster: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnChanges() {
    this.getAddressFormDetails();
    console.log(this.type);
  }
  getAddressFormDetails() {
    const addressPayload = {
      "user_id" : localStorage.getItem('user_id'),
      "address_type" : this.type,
    }
    this.backendapiService
      .commonDataPostFn("admin/get-address-list", addressPayload)
      .subscribe(resp => {
        if(resp.type == 'success') {
          this.allAddress = resp.data;
        }
      });
  }
  selected(selectedAddress) {
    this.addressSelected.emit(selectedAddress);

  }

  deleteAddress(id) {
    const _self = this;
    _self.backendapiService.deleteBillingInfoForm('admin/delete-address-list/' + id, _self.model)
    .subscribe( resp => {
        if (resp.type === 'success') {
          _self.toaster.success(resp.msg);
          _self.getAddressFormDetails();
          this.modalRef.hide();
        }
      }
    );
  }

  openModal(template: TemplateRef<any>, id) {
    this.addrId = id;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-sm' })
    );
  }

}
