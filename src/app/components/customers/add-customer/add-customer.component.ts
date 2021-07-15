import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { daysArr } from 'src/app/constants';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})

export class AddCustomerComponent implements OnInit {
  public days = daysArr;
  public addCustomerGroup: FormGroup;

  constructor(public fb: FormBuilder) {
    this.addCustomerGroup = fb.group({
      customerNo: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      days: fb.group({
        Mon: new FormControl(false),
        Tue: new FormControl(false),
        Wed: new FormControl(false),
        Thu: new FormControl(false),
        Fri: new FormControl(false),
        Sat: new FormControl(false),
        Sun: new FormControl(false)
      }),
      shortlistedProducts: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log(this.addCustomerGroup.controls);
  }

  addCustomer(): void {
  }
}
