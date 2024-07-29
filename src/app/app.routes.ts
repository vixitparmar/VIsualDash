import { Routes } from '@angular/router';
import { DashboardComponent } from '../Dashboard/dashboard/dashboard.component';
import { MainComponent } from '../main/main.component';

export const routes: Routes = [
    {
        path: 'app',
        component: MainComponent,
        children:[{
            path:'dashboard',
            component:DashboardComponent
        }]
    },
    { path: '**', redirectTo: 'app/dashboard' }
];
