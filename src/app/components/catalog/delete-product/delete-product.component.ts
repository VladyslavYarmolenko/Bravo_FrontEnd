import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ICatalogState } from '../../../reducers/interfaces';
import { DeleteCatalogAction } from '../../../reducers/catalog/catalog.actions';


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<any>,
              public store: Store<{ state: ICatalogState }>) {
  }

  ngOnInit(): void {
  }

  removeProduct(): void {
    this.store.dispatch(new DeleteCatalogAction({ code: this.data.code }));
  }
}
