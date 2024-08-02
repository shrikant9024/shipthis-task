import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path:'',title:'Home', component:HomeComponent
    },
    {
        path:'signup',title:'signup', component:SignupComponent
    },
    {
        path:'login',title:'login', component:LoginComponent
    },

];