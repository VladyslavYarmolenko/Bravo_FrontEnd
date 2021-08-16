import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from 'src/environments/environment';

import { ordersNode, ordersReducer } from './orders/orders.reducer';
import { customersNode, customersReducer } from './customers/customers.reducer';
import { catalogNode, catalogReducer } from './catalog/catalog.reducer';
import * as ordersSelector from './orders/orders.selectors';
import * as customersSelector from './customers/customers.selectors';
import * as catalogSelector from './catalog/catalog.selectors';

import { ICatalogState, ICustomerState, IOrderState } from '../interfaces';

export interface IState {
  [ordersNode]: IOrderState;
  [customersNode]: ICustomerState;
  [catalogNode]: ICatalogState;
}

export const reducers: ActionReducerMap<IState> = {
  [ordersNode]: ordersReducer,
  [customersNode]: customersReducer,
  [catalogNode]: catalogReducer,
};

export const getOrdersState = (state: IState): IOrderState => state[ordersNode];
export const getCustomersState = (state: IState): ICustomerState => state[customersNode];
export const getCatalogState = (state: IState): ICatalogState => state[catalogNode];


export const getOrdersData = createSelector(
  getOrdersState,
  ordersSelector.selectOrdersState
);

export const getCatalogData = createSelector(
  getCatalogState,
  catalogSelector.selectCatalogState
);

export const getCustomersData = createSelector(
  getCustomersState,
  customersSelector.selectCustomersState
);

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];
