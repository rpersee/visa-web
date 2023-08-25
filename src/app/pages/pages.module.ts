import {NgModule} from '@angular/core';
import {ROUTING} from './pages.routing';
import {PagesComponent} from './pages.component';
import {SharedModule} from '@shared';

@NgModule({
    imports: [
        SharedModule,
        ROUTING
    ],
    declarations: [
        PagesComponent,
    ]
})
export class PagesModule {


}
