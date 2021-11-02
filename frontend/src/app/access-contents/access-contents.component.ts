import { Component, OnInit } from "@angular/core";
import { MyAccountLeftMenuComponent } from "../my-account-left-menu/my-account-left-menu.component";
import { BackendapiService } from "../backendapi.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-access-contents",
  templateUrl: "./access-contents.component.html",
  styleUrls: ["./access-contents.component.css"]
})
export class AccessContentsComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService
  ) {}

  sitename: string;
  membership_uemail: string = "";
  accessContentList: any;
  currentPageNo: string;

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    if (!this.membership_uemail) {
      this.router.navigate(["/login"]);
    }

    this.backendapiService
      // .getUserData("getUserData", this.membership_uemail)
      .getAccessContents("getAccessContents?page=1&media=1&limit=12")
      .subscribe(resp => {
        this.accessContentList = resp.data.data;
        this.currentPageNo = resp.data.current_page;
      });

    this.sitename = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.sitename + " | Access Contents");
    window.scrollTo(0, 0);
  }
}
