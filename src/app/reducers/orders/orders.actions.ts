import { Action } from '@ngrx/store';
import { IOrderState } from '../../interfaces';


export enum ordersActionsType {
  confirmOrders = '[ORDERS] confirmOrders',
  setFilteredOrders = '[ORDERS] setFilteredOrders'
}

export class ConfirmOrdersAction implements Action {
  readonly type = ordersActionsType.confirmOrders;

  constructor(public payload: { code: string }) {
  }
}

export class SetFilteredOrdersAction implements Action {
  readonly type = ordersActionsType.setFilteredOrders;

  constructor(public payload: { newState: IOrderState }) {
  }
}

export type OrdersActions = ConfirmOrdersAction | SetFilteredOrdersAction;
