import { Action } from '@ngrx/store';

import { CustomersActions, customersActionsType } from './customers.actions';
import { ICustomerState } from '../interfaces';
import { FormControl } from '@angular/forms';

export const customersNode = 'customers';

const customersState: ICustomerState = {
  'BB-123': {
    customerNo: 'BB-123',
    name: 'Burger Bar',
    address: 'Main Street, 1234 Zurich',
    deliveryDays: {
      Mon: true,
      Tue: false,
      Wed: true,
      Thu: false,
      Fri: true,
      Sat: false,
      Sun: false,
    }
  },
  'GZ-889': {
    customerNo: 'GZ-889',
    name: 'Gyoza SS',
    address: 'Second Street 3421 Geneva',
    deliveryDays: {
      Mon: false,
      Tue: true,
      Wed: false,
      Thu: true,
      Fri: false,
      Sat: true,
      Sun: false,
    },
  }
};

export const customersReducer = (state: ICustomerState = customersState, action: Action): any => {
  const customersActions = action as CustomersActions;
  switch (customersActions.type) {
    case customersActionsType.addCustomer:
      return {
        ...state,
        [customersActions.payload.code]: customersActions.payload.data,
      };
    default:
      return state;
  }
};
