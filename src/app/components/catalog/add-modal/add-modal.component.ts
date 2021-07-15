import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ICatalogState } from '../../../reducers/interfaces';
import { AddNewCatalogAction, catalogActionsType } from '../../../reducers/catalog/catalog.actions';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {

  addModalGroup: FormGroup = new FormGroup({});
  modalKeysArr = ['productCode', 'name', 'unit', 'price', 'availability'];

  public invalid = false;
  constructor(private store: Store<{state: ICatalogState}>) { }

  ngOnInit(): void {
    this.updateControls(this.modalKeysArr);
    // console.log(this.addModalGroup.value);
  }

  updateControls(modalNamesArr: any[]): void {
    modalNamesArr.forEach(elem => {
      this.addModalGroup
        .addControl(elem,
          new FormControl(''));
    });
  }

  onSubmit(): void {
    this.store.dispatch(new AddNewCatalogAction({
      code: this.addModalGroup.get('productCode')?.value,
      data: this.addModalGroup.value,
    }));
  }

}
