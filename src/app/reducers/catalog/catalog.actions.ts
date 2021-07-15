import { Action } from '@ngrx/store';

export enum catalogActionsType {
  addNewCatalog = '[CATALOG] addNewCatalogAction',
  deleteCatalog = '[CATALOG] deleteCatalog',
}

export class AddNewCatalogAction implements Action {
  readonly type = catalogActionsType.addNewCatalog;

  constructor(public payload: { code: string, data: any }) {
  }
}

export class DeleteCatalogAction implements Action {
  readonly type = catalogActionsType.deleteCatalog;

  constructor(public payload: { code: string }) {
  }
}

export type CatalogActions = AddNewCatalogAction | DeleteCatalogAction;
