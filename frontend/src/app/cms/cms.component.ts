import { Component, OnInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


interface response1 {
    data: any;
}

@Component({
    selector: 'app-cms',
    templateUrl: './cms.component.html',
    styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {

    cmsdata: any;
    baseurl: any;
    pageTitle: string;
    cmsslug: string;
    cmsName: string;
    private fragment: string;
    message: any;
    cms: any;

    public constructor(
        private titleService: Title,
        private route: ActivatedRoute,
        private backendapiService: BackendapiService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {

        this.cmsslug = this.route.snapshot.paramMap.get('slug');
        this.backendapiService.getCms('admin/getCms', this.cmsslug).subscribe(res => {
            //this.cmsdata = this.sanitizer.bypassSecurityTrustHtml(res.data.content);
            this.cmsdata = res.data.content;
            this.cmsName = res.data.name;
            this.cms = res.data;
        });
        this.baseurl = this.backendapiService.getBaseUrl();
        this.pageTitle = this.backendapiService.getSiteName();
        this.titleService.setTitle('CMS | ' + this.cmsName);

        this.route.fragment.subscribe(fragment => { this.fragment = fragment; });

        this.backendapiService.currentMessage.subscribe(message => {
            this.cmsdata = message;
        });
    }

}


