import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getOrdersState, IState } from '../../reducers';

interface ResultObject {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class CustomerFilterService {
  public ordersState$ = this.store.select(getOrdersState);
  public selectedCustomers$ = new BehaviorSubject<string[]>([]);

  constructor(private store: Store<IState>) {
  }

  setSelectedCustomers(customers: string[]): any {
    this.selectedCustomers$.next(customers);
    let resultObj: any = {};

    combineLatest([this.selectedCustomers$, this.ordersState$])
      .subscribe(result => {
        resultObj = {};
        const selectedCustomers = result[0];
        const ordersState = result[1];
        for (const ordersStateKey in ordersState) {
          if (selectedCustomers.some(item => ordersState[ordersStateKey].customer === item)) {
            resultObj[ordersStateKey] = { ...ordersState[ordersStateKey]};
          }
        }
      });
    return resultObj;
  }
}
