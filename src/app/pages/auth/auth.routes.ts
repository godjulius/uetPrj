import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {TeacherSignupComponent} from './teacher-signup/teacher-signup.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: "full"
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: SignUpComponent
    },
    {
        path: 'teacher-signup',
        component: TeacherSignupComponent
    }

];
