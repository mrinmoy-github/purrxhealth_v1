import { Component, OnInit } from "@angular/core";
import { BackendapiService } from "../backendapi.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  sitename: string;
  showLoader : boolean;
  loginButtonText : string = "";
  model: any = {};
  success_msg: string = "";
  error_msg: string = "";
  membership_uemail: string = "";
  _this: any;

  public constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService,
    private toastr: ToastrService
  ) {}

  onSubmit(f: NgForm) {
    this.success_msg = "";
    this.error_msg = "";
    this.showLoader = true;
    this.loginButtonText = "Processing...";
    this.backendapiService
      .commonDataPostFn("admin/login/postForgotPasswordForm", this.model)
      .subscribe(resp => {
        this.showLoader = false;
        this.loginButtonText = "Submit";
        if (resp.type == "success") {
          var resetForm = <HTMLFormElement>document.getElementById("frmForm");
          resetForm.reset();
          //this.success_msg = resp.msg;
          this.toastr.success(resp.msg, 'Success!');
        }
        if (resp.type == "error") {
          //this.error_msg = resp.msg;
          this.toastr.error(resp.msg, 'Oops!');
        }
      },
      err => {
        this.showLoader = false;
        this.loginButtonText = "Submit";
        this.toastr.error("Something went wrong while processing your request.", 'Oops!');
      });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }

  

  ngOnInit() {
    this.membership_uemail = localStorage.getItem("membership_uemail");
    // console.log(this.membership_uemail);
    if (this.membership_uemail) {
      this.router.navigate([""]);
    }

    window.scrollTo(0, 0);
    this.sitename = this.backendapiService.getSiteName();
    this.titleService.setTitle(this.sitename + " | Forgot Password");
    this.showLoader = false;
    this.loginButtonText = "Submit";
  }
}

