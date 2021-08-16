import { Action } from '@ngrx/store';


export enum customersActionsType {
  addCustomer = '[CUSTOMERS] addCustomer',
  editCustomer = '[CUSTOMERS] editCustomer'
}

export class AddCustomerAction implements Action {
  readonly type = customersActionsType.addCustomer;

  constructor(public payload: { code: string, data: any }) {
  }
}

export class EditCustomerAction implements Action {
  readonly type = customersActionsType.editCustomer;

  constructor(public payload: { code: string, data: any }) {
  }
}


export type CustomersActions = AddCustomerAction | EditCustomerAction;
