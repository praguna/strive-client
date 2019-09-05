import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from  './user';
import { JwtResponse } from  './jwt-response';
import { tap } from  'rxjs/operators';
import * as auth from '.././auth.key'
import { Observable, BehaviorSubject } from  'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject  =  new  BehaviorSubject(false);
  constructor(private httpClient: HttpClient) { }

  login(user: any): Observable<JwtResponse> {
    return this.httpClient.post(`${auth.base_url}data/login`, user).pipe(
      tap(async (res: JwtResponse) => {
        if (res.user) {
          //localStorage.setItem("ACCESS_TOKEN", res.token);
          //localStorage.setItem("EXPIRES_IN", res.expires_in.toString());
          this.authSubject.next(true);
        }
      })
    );
  }

   isLoggedIn(){
    return  this.authSubject.asObservable();

  }

   logout(){
  //  localStorage.removeItem("ACCESS_TOKEN");
   // localStorage.removeItem("EXPIRES_IN");
    this.authSubject.next(false);
  }
  register(user: any): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${auth.base_url}data/register`, user).pipe(
      tap((res:  JwtResponse ) => {
        if (res.user) {
          localStorage.setItem("ACCESS_TOKEN", res.token);
          localStorage.setItem("EXPIRES_IN", res.expires_in.toString());
          this.authSubject.next(true);
        }
      })
    );
  }
}