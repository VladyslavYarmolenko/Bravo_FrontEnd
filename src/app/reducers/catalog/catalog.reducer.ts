import { Action } from '@ngrx/store';

import { CatalogActions, catalogActionsType } from './catalog.actions';
import { ICatalogState } from '../interfaces';

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

    case catalogActionsType.addNewCatalog:
      return {
        ...state,
        [catalogActions.payload.code]: catalogActions.payload.data
      };

    case catalogActionsType.deleteCatalog:
      const newState = { ...state };
      delete newState[catalogActions.payload.code];
      return {
        ...newState
      };

    default:
      return state;
  }
};
