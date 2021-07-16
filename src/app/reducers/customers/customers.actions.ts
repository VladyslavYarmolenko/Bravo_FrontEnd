import { Action } from '@ngrx/store';


export enum customersActionsType {
  addCustomer = '[CUSTOMERS] addCustomer',
}


export class AddCustomerAction implements Action {
  readonly type = customersActionsType.addCustomer;

  constructor(public payload: { code: string, data: any }) {
  }
}

export type CustomersActions = AddCustomerAction;
