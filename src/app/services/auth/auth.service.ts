import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { AuthResponse, Email } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  getAccess(email: Email): Observable<AuthResponse>{
    const params = new HttpParams()
      .set('email', email.toString());

    // const headers = new HttpHeaders().set('authorization', '123')
    return this.http.get<AuthResponse>(`${environment.baseUrl}/user`, { params });
  }

  toVerifaicationPage(): void {
    this.router.navigate(['/verification']);
  }
}
