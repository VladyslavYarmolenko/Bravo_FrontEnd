import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ICatalogState } from 'src/app/interfaces';
import { AddNewCatalogAction } from 'src/app/reducers/catalog/catalog.actions';
import { addProduct } from 'src/app/constants';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  public addModalGroup: FormGroup = new FormGroup({});
  public modalKeysArr = addProduct;
  public invalid = false;

  constructor(private store: Store<{ state: ICatalogState }>) {
  }

  ngOnInit(): void {
    this.updateControls(this.modalKeysArr);
  }

  updateControls(modalNamesArr: any[]): void {
    modalNamesArr.forEach(elem => {
      this.addModalGroup.addControl(elem, new FormControl(''));
    });
  }

  onSubmit(): void {
    this.store.dispatch(new AddNewCatalogAction({
      code: this.addModalGroup.get('productCode')?.value,
      data: this.addModalGroup.value,
    }));
  }
}
