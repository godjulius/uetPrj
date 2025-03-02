import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    private httpClient = inject(HttpClient);
    constructor() {
    }

    ngOnInit() {

    }

    OAuth2Login() {
        let headers = new HttpHeaders();
        headers = headers.set('response_type', 'token')
        headers = headers.set('client_id', '678773826180-11bfng2mkn4h8h3p4s17kcl32a4fdjfp.apps.googleusercontent.com') // Todo: Replace YOUR_CLIENT_ID with your client ID
        headers = headers.set('redirect_uri', 'http://localhost:4200/')
        headers = headers.set('scope', 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly')
        // headers = headers.set('state', 'pass-through value')
        // headers = headers.set('include_granted_scopes', 'true')
        // console.log(headers);
        this.httpClient.get('https://accounts.google.com/o/oauth2/v2/auth', {
            headers: headers
        }).subscribe((response) => {
            console.log(response);
        });
    }
}
