import { Component, TemplateRef, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  cmsdata: any;
  siteSettingsData: any;
  baseurl: any;
  sitename: string;
  cmsslug: string;
  cmsName: string;
  private fragment: string;
  current_year: any;
  path: any;
  hotCatgories: any;
  authenticated: any = false;
  membership_uemail: string;
  modalRef: BsModalRef;

  public constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    // console.log(this.membership_uemail);
    if (this.membership_uemail) {
      this.authenticated = true;
    }

    var d = new Date();
    this.current_year = d.getFullYear();
    this.backendapiService.currentMessage.subscribe(message => this.cmsdata = message);
    this.sitename = this.backendapiService.getSiteName();
    this.backendapiService.getSettings('admin/getSiteSettings').subscribe(res => {
      this.siteSettingsData = res.data;
      this.backendapiService.updateData(this.siteSettingsData);
    });

    this.backendapiService.getHotCategories('getHotCategories').subscribe(res => {
      this.hotCatgories = res.data;
    });

  }

  callBackendService(path: any, domId: string = '') {
    this.cmsslug = path;
    this.cmsslug = this.route.snapshot.paramMap.get('slug');
    this.backendapiService.getCms('admin/getCms', path).subscribe(res => {
      this.cmsdata = this.sanitizer.bypassSecurityTrustHtml(res.data.content);
      this.cmsName = res.data.slug;
      this.backendapiService.updateData(this.cmsdata);
      if (domId != '') {
        var ele = document.getElementById(domId);
        window.scrollTo(0, ele.offsetTop);
      }

    });
    this.baseurl = this.backendapiService.getBaseUrl();
    this.sitename = this.backendapiService.getSiteName();
    // this.titleService.setTitle('CMS | ' + this.cmsName);

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-custom modal-lg' })
    );
  }
}
