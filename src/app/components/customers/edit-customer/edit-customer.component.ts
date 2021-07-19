import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { daysArr } from 'src/app/constants';
import { EditCustomerAction } from 'src/app/reducers/customers/customers.actions';
import { IState } from '../../../reducers';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})

export class EditCustomerComponent implements OnInit {
  public days = daysArr;
  public editCustomerGroup: FormGroup;


  constructor(public fb: FormBuilder, private store: Store<IState>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editCustomerGroup = fb.group({
      customerNo: new FormControl(data.selectedObj.customerNo, [Validators.required]),
      name: new FormControl(data.selectedObj.name, [Validators.required]),
      address: new FormControl(data.selectedObj.address, [Validators.required]),
      deliveryDays: fb.group({
        Mon: new FormControl(data.selectedObj.deliveryDays.Mon),
        Tue: new FormControl(data.selectedObj.deliveryDays.Tue),
        Wed: new FormControl(data.selectedObj.deliveryDays.Wed),
        Thu: new FormControl(data.selectedObj.deliveryDays.Thu),
        Fri: new FormControl(data.selectedObj.deliveryDays.Fri),
        Sat: new FormControl(data.selectedObj.deliveryDays.Sat),
        Sun: new FormControl(data.selectedObj.deliveryDays.Sun)
      }),
      // shortlistedProducts: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log();
  }

  editCustomer(): void {
    this.store.dispatch(new EditCustomerAction({ code: this.editCustomerGroup.value.customerNo, data: this.editCustomerGroup.value }));
  }
}
