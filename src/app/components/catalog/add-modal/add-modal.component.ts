import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {

  addModalGroup: FormGroup = new FormGroup({});
  modalKeysArr = ['productCode', 'name', 'unit', 'price', 'availability'];

  public invalid = false;
  constructor() { }

  ngOnInit(): void {}


  onSubmit(): void {
    console.log(this.addModalGroup.value);
  }

}
