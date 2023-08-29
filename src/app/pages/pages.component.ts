import {Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
    template: `
        <iframe [height]="height" [width]="width" frameBorder="0" [src]="urlSafe"></iframe>
    `,
    styles: [
        `
            :host {
                display: flex;
                height: 100vh;
            }
        `
    ]
})
export class PagesComponent {
    url: string;
    urlSafe: SafeResourceUrl;
    height: string;
    width: string;

    constructor(public sanitizer: DomSanitizer, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.url = params['url'];
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
            this.height = params['height'];
            this.width = params['width'];
        });
    }
}
