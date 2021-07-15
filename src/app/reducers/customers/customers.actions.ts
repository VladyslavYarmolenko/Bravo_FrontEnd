import { Action } from '@ngrx/store';


export enum customersActionsType {
  confirmCustomers = '[CUSTOMERS] confirmCustomers',
}

export class ConfirmCustomersAction implements Action {
  readonly type = customersActionsType.confirmCustomers;

  constructor(public payload: { code: string }) {
  }
}

export type CustomersActions = ConfirmCustomersAction;
