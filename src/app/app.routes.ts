import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { RegisterComponent } from './register-component/register-component';
import { ProfileComponent } from './profile-component/profile-component';
import { LandingComponent } from './landing-component/landing-component';
import { ActivityComponent } from './activity-component/activity-component';
import { GoalComponent } from './goal-component/goal-component';
import { LoginComponent } from './login-component/login-component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'register', component: RegisterComponent},
    {path:'profile', component:ProfileComponent},
    {path: 'landing', component:LandingComponent},
    {path: 'activity', component:ActivityComponent},
    {path: 'goals', component:GoalComponent},
    {path:'login', component: LoginComponent}
];
