import {Action} from '@ngrx/store';
import { IProduct, ICatalogState } from '../interfaces';
import { CatalogActions, catalogActionsType } from './catalog.actions';

export const catalogNode = 'catalog';

const catalogState: ICatalogState = {
  APP123: {
    productCode: 'APP123',
    name: 'Apples',
    unit: 'kg',
    price: 2.03,
    availability: 'In stock',
  },
  TOM53: {
    productCode: 'TOM53',
    name: 'Tomatos',
    unit: 'box',
    price: 12.03,
    availability: 'In stock',
  },
  APP124: {
    productCode: 'APP124',
    name: 'Apples',
    unit: 'kg',
    price: 2.03,
    availability: 'In stock',
  },
  CUC997: {
    productCode: 'CUC997',
    name: 'Cucumbers',
    unit: 'pcs',
    price: 0.52,
    availability: 'Out of stock',
  },
  PIN112: {
    productCode: 'PIN112',
    name: 'Pineapple',
    unit: 'pcs',
    price: 3.20,
    availability: 'Discontinued',
  }
};

export const catalogReducer = (state: ICatalogState = catalogState, action: Action): any => {
  const catalogActions = action as CatalogActions;
  switch (catalogActions.type) {
    case catalogActionsType.confirmProducts:
      return {
        ...state,
        [catalogActions.payload.code]: {
          ...state[catalogActions.payload.code],
          status: true
        }
      };
    default:
      return state;
  }
};
