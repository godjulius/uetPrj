import {CanActivate, Router} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {USER} from '../constants/common.const';
import {IProfileModel} from '../../pages/auth/auth.model';
import {LocalStorageService} from '../services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class InstructorGuard implements CanActivate {
    private localStorageService = inject(LocalStorageService)

    profile: IProfileModel | undefined

    constructor(private router: Router) {
        this.profile = this.localStorageService.getObject(USER)
        console.log(this.profile)
    }

    canActivate(): boolean {
        if (this.profile?.isInstructor) {
            return true;
        }
        this.router.navigate(['/not-found']);
        return false
    }
}
