import {Action} from '@ngrx/store';
import {ICustomer, ICustomerState} from '../interfaces';
import {CustomersActions, customersActionsType} from './customers.actions';

export const customersNode = 'customers';

const customersState: ICustomerState = {
  'BB-123': {
    customerNo: 'BB-123',
    name: 'Burger Bar',
    address: 'Main Street, 1234 Zurich',
    deliveryDays: 'Mon, Wed, Fri',
  },
  'GZ-889': {
    customerNo: 'GZ-889',
    name: 'Gyoza SS',
    address: 'Second Street 3421 Geneva',
    deliveryDays: 'Tue, Thu, Sat',
  }
};

export const customersReducer = (state: ICustomerState = customersState, action: Action): any => {
  const customersActions = action as CustomersActions;
  switch (customersActions.type) {
    case customersActionsType.confirmCustomers:
      return {
        ...state,
        [customersActions.payload.code]: {
          ...state[customersActions.payload.code],
          status: true
        }
      };
    default:
      return state;
  }
};
