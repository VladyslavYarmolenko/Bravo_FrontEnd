import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { daysArr } from 'src/app/constants';
import { ICustomerState } from 'src/app/reducers/interfaces';
import { AddCustomerAction } from 'src/app/reducers/customers/customers.actions';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})

export class AddCustomerComponent implements OnInit {
  public days = daysArr;
  public addCustomerGroup: FormGroup;

  constructor(public fb: FormBuilder, public store: Store<{ state: ICustomerState }>) {
    this.addCustomerGroup = fb.group({
      customerNo: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      deliveryDays: fb.group({
        Mon: new FormControl(false),
        Tue: new FormControl(false),
        Wed: new FormControl(false),
        Thu: new FormControl(false),
        Fri: new FormControl(false),
        Sat: new FormControl(false),
        Sun: new FormControl(false)
      }),
      // shortlistedProducts: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log(this.addCustomerGroup.controls);
  }

  addCustomer(): void {
    this.store.dispatch(new AddCustomerAction({ code: this.addCustomerGroup.value.customerNo, data: this.addCustomerGroup.value }));
  }
}
