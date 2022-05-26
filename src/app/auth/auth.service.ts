import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'

interface userNameAvailableResponse {
  available: boolean;
}

interface signUpCredentials {
  username: string;
  password: string;
  passwordConfrimation: string
}

interface signUpResponse {
  username: string;
}

interface signedInResponse {
  authenticated: boolean;
  username: string;
}

interface signInCredentials {
  username: string;
  password: string;
}

interface signInResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject(null);
  username = '';

  constructor(private http: HttpClient) { }

  userNameAvailable(username: string) {
    return this.http.post<userNameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username
    })
  }

  signUp(credentials: signUpCredentials) {
    return this.http.post<signUpResponse>(`${this.rootUrl}/auth/signup`, credentials, {
      // withCredentials: true
    }).pipe(tap(({ username }) => {
      this.signedIn$.next(true);
      this.username = username;
    }));
  }

  checkAuth() {
    return this.http.get<signedInResponse>(`${this.rootUrl}/auth/signedin`, {
      // withCredentials: true
    }).pipe(tap(({ authenticated, username }) => {
      this.signedIn$.next(authenticated);
      this.username = username;
    }))
  }

  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(tap(() => {
      this.signedIn$.next(false);
    }));
  }

  signin(credentials: signInCredentials) {
    return this.http.post<signInResponse>(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap(({ username }) => {
        this.signedIn$.next(true);
        this.username = username;
      })
    )
  }
}
