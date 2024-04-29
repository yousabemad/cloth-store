import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'about-us',
    loadChildren:()=>
    import ('./modules/about-us/about-us.module').then(m => m.AboutUsModule) 
}
];
