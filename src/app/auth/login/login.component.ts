import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  public ngUnsubscribe$ = new Subject();
  public isDisabledLoginBtn: boolean;
  public isAuthorized: string;
  public formData = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
  });

  constructor(private auth: AuthService) {
    this.isAuthorized = '';
    this.isDisabledLoginBtn = true;
  }

  ngOnInit(): void {
    this.formData.statusChanges
     .pipe(takeUntil(this.ngUnsubscribe$))
     .subscribe(
      status => {
        if (status === 'VALID') {
          this.auth.getAccess(this.formData.value.email)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(response => {
              if (response) {
                this.isAuthorized = response.status;
                if (this.isAuthorized === 'Authorized') {
                  this.isDisabledLoginBtn = false;
                } else {
                  this.isDisabledLoginBtn = true;
                }
              }
            });
        } else {
          return;
        }
      }
    );
  }

  onLogin(email: any): void {
    this.auth.onLogin(email);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
