import {Routes} from '@angular/router';

import {authRoutes} from '@pages/authentication/auth.routes';
import {hubRoutes} from '@pages/hub/hub.routes';

export const routes: Routes = [
    ...authRoutes,
    ...hubRoutes
];
