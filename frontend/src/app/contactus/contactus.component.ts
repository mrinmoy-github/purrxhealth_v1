import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

interface response1 {
  data: any;
}

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})

export class ContactusComponent implements OnInit {

  settingsdata: any;
  baseurl: any;
  pageTitle: string;
  cmsslug: string;
  cmsName: string;
  message: any;
  model: any = {};
  success_msg: string = '';
  error_msg: string = '';

  public constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private backendapiService: BackendapiService
  ) { }



  onSubmit(f: NgForm) {
    this.backendapiService.postContactForm('postContactForm', this.model).subscribe(
      resp => {
        console.log(resp);
        if (resp.type == 'success') {
          var resetForm = <HTMLFormElement>document.getElementById('frmForm');
          resetForm.reset();
          // f.reset();
          this.success_msg = resp.msg;
        }

        if (resp.type == 'error') {
          this.error_msg = resp.msg;
        }
      }
    );
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }


  ngOnInit() {
    // this.cmsslug = this.route.snapshot.paramMap.get('slug');


    this.backendapiService.currentMessage.subscribe(message => {
      console.log(message);
      this.settingsdata = message;
    });

    window.scrollTo(0, 0);
    this.pageTitle = this.backendapiService.getSiteName();
    this.titleService.setTitle('Contact');
  }
}
