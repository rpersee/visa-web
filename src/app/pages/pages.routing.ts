import {RouterModule, Routes} from '@angular/router';
import {AuthenticatedContainerComponent} from '@shared';
import {PagesComponent} from './pages.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: AuthenticatedContainerComponent,
        children: [
            {
                path: '',
                component: PagesComponent,
            },
        ],
    },
];

export const ROUTING = RouterModule.forChild(ROUTES);
