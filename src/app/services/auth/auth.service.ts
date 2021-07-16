import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Email, Request, SuccessEmail, } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public ngUnsubscribe$ = new Subject();
  public reqData: Request | null;

  constructor(private http: HttpClient, private router: Router) {
    this.reqData = null;
  }

  getAccess(email: Email): Observable<SuccessEmail> {
    const params = new HttpParams()
      .set('email', email.toString());

    return this.http.get<SuccessEmail>(`${environment.baseUrl}/user`, { params });
  }

  onLogin(emailQuery: any): void {
    this.reqData = { email: emailQuery };

    this.http.post(`${environment.baseUrl}/login`, this.reqData)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        if (response) {
          this.router.navigate(['/verification']);
        }
      });
  }

  getTokens(verificationCode: number): void {
    if (this.reqData) {
      this.reqData.code = verificationCode;
      this.http.post(`${environment.baseUrl}/verification`, this.reqData)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response: any) => {
          if (response.status === 'success') {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            this.router.navigate(['/orders']);
          }
        });
    }
  }

  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
