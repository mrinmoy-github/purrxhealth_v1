import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendapiService } from '../backendapi.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public model = { password: '', confirmPassword: '', token: '' };
  public isPasswordMatched = true;
  showLoader : boolean;
  loginButtonText : any = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private backendapiService: BackendapiService
  ) { }

  ngOnInit() {
    if(localStorage.getItem("membership_uemail")) {
      this.router.navigate(['/']);
    }
    this.model.token = this.route.snapshot.paramMap.get("token");
    this.showLoader = false;
    this.loginButtonText = "Reset";
  }

  onSubmit(f: NgForm) {
    if(this.model.password == this.model.confirmPassword) {
      this.showLoader = true;
      this.loginButtonText = "Processing...";
      this.backendapiService
      .commonDataPostFn("reset-password", this.model)
      .subscribe(resp => {
        this.showLoader = false;
        this.loginButtonText = "Reset";
        if (resp.type == "success") {
          var resetForm = <HTMLFormElement>document.getElementById("frmForm");
          resetForm.reset();
          this.toaster.success(resp.msg, 'Success!');
          this.router.navigate(['/login']);
          // this.toaster.info('please login ')
        }
        if (resp.type == "error") {
          this.toaster.error(resp.msg, 'Oops!');
        }
      },
      err => {
        this.showLoader = false;
        this.loginButtonText = "Reset";
        this.toaster.error("Something went wrong while processing your request.", 'Oops!');
      });
    } else {
      this.isPasswordMatched = false;
    }
  }
  checkConfirmPassword() {
    this.isPasswordMatched = this.model.password == this.model.confirmPassword;
  }
}
