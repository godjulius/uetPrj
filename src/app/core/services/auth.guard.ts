import {inject, Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieStorageService } from './cookie-storage.service';
import { AUTH_TOKEN } from '../constants/common.const';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private readonly messageService = inject(MessageService);
  constructor(private router: Router, private cookieService: CookieStorageService) {}

  canActivate(): boolean {
    const token = this.cookieService.getCookie(AUTH_TOKEN);
    if (token) {
      return true;
    } else {
        this.messageService.add({severity:'error', summary:'Error', detail:'Please login to continue'});
      this.router.navigate(['/account/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieStorageService) {}

  canActivate(): boolean {
    const token = this.cookieService.getCookie(AUTH_TOKEN);
    if (token) {
      this.router.navigate(['/user/profile']);
      return false;
    } else {
      return true;
    }
  }
}
