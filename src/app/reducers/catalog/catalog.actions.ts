import { Action } from '@ngrx/store';


export enum catalogActionsType {
  confirmProducts = '[CATALOG] confirmProducts',
}

export class ConfirmProductsAction implements Action {
  readonly type = catalogActionsType.confirmProducts;
  constructor(public payload: { code: string }) { }
}

export type CatalogActions = ConfirmProductsAction;
