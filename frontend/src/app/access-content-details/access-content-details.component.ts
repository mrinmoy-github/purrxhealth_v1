import { Component, OnInit } from "@angular/core";
import { MyAccountLeftMenuComponent } from "../my-account-left-menu/my-account-left-menu.component";
import { BackendapiService } from "../backendapi.service";
import { Title, DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-access-content-details',
  templateUrl: './access-content-details.component.html',
  styleUrls: ['./access-content-details.component.css']
})
export class AccessContentDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService,
    private sanitizer: DomSanitizer
  ) {}

  sitename: string;
  membership_uemail: string = "";
  accessContent: any;
  accessContentId: any;
  accessContentData: any;
  public contentHtmlData : string ;

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (!this.membership_uemail) {
      this.router.navigate(["/login"]);
    }
    let _self = this;
    this.sitename = this.backendapiService.getSiteName();
    this.accessContentId = this.route.snapshot.paramMap.get("id");
    this.backendapiService
      // .getUserData("getUserData", this.membership_uemail)
      .commonDataFetchFn("getAccessContent?id="+this.accessContentId)
      .subscribe(resp => {
        this.accessContent = resp.data;
        this.accessContentData = this.sanitizer.bypassSecurityTrustHtml(this.accessContent.content);
        _self.contentHtmlData = this.accessContent.content;
        this.titleService.setTitle(this.sitename + " | Access Content Details: "+this.accessContent.title);
      });   
    window.scrollTo(0, 0);
  }
}
