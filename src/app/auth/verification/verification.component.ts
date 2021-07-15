import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})

export class VerificationComponent implements OnInit {
  public ngUnsubscribe$ = new Subject();
  public verificationForm = new FormGroup({
    firstInput: new FormControl(''),
    secondInput: new FormControl('')
  });

  public invalidCode: boolean;

  constructor(private auth: AuthService) {
    this.invalidCode = false;
  }

  ngOnInit(): void {
    this.verificationForm.statusChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(status => {
        if (status === 'VALID' && this.verificationForm.value.secondInput) {
          const reqQuery = this.verificationForm.value.firstInput + this.verificationForm.value.secondInput;
          this.auth.getTokens(reqQuery);
        }
      });
  }
}
