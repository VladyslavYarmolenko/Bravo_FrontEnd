import { Action } from '@ngrx/store';

import { IOrderState } from '../../interfaces';
import { OrdersActions, ordersActionsType } from './orders.actions';

export const ordersNode = 'orders';

const ordersState: IOrderState = {
  35322: {
    orderNo: 35322,
    customer: 'Burger Bar',
    customerNo: 'BB-243',
    items: 12,
    notes: 'Please deliver...',
    ordered: 'Tue, 20 Jul 2021, 22:01',
    reqDelivery: 'Today',
    status: false,
  },
  35342: {
    orderNo: 35342,
    customer: 'Gyoza SS',
    customerNo: 'GZ-889',
    items: 75,
    notes: 'Confirmed',
    ordered: 'Mon, 19 Jul 2021, 22:01',
    reqDelivery: 'Tomorrow',
    status: true,
  },
  23424: {
    orderNo: 23424,
    customer: 'Burger Bar',
    customerNo: 'BB-243',
    items: 9,
    notes: '+1 Bottle Coc...',
    ordered: 'Mon, 15 Jun 2021, 22:01',
    reqDelivery: 'Mon, 15 Jun 2021, 22:01',
    status: true,
  }
};

export const ordersReducer = (state: IOrderState = ordersState, action: Action): any => {
  const ordersActions = action as OrdersActions;
  switch (ordersActions.type) {
    case ordersActionsType.confirmOrders:
      return {
        ...state,
        [ordersActions.payload.code]: {
          ...state[ordersActions.payload.code],
          status: true
        }
      };
    case ordersActionsType.setFilteredOrders:
      return {
        ...ordersActions.payload.newState,
      };
    default:
      return state;
  }
};
