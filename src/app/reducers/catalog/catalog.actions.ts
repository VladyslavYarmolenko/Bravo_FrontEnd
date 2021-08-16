import { Action } from '@ngrx/store';
import { ICatalogState } from '../../interfaces';

export enum catalogActionsType {
  addNewCatalog = '[CATALOG] addNewCatalogAction',
  deleteCatalog = '[CATALOG] deleteCatalog',
  setFilteredCatalog = '[CATALOG] setFilteredCatalog'
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

export class SetFilteredCatalogAction implements Action {
  readonly type = catalogActionsType.setFilteredCatalog;

  constructor(public payload: { newState: ICatalogState }) {
  }
}

export type CatalogActions = AddNewCatalogAction | DeleteCatalogAction | SetFilteredCatalogAction;
