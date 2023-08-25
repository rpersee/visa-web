import {Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
    template: `
        <iframe width="100%" height="100%" frameBorder="0" [src]="urlSafe"></iframe>
    `,
    styles: [
        `
            iframe {
                display: flex;
                min-height: 100vh;
            }
        `
    ]
})
export class PagesComponent {
    url: string;
    urlSafe: SafeResourceUrl;

    constructor(public sanitizer: DomSanitizer, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.url = params['url'];
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        });
    }
}
