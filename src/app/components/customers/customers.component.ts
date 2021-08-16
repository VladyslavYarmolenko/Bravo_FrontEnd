import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { getCustomersState, IState } from 'src/app/reducers';
import { DeliveryDays, ICustomer } from 'src/app/interfaces';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { columnsToDisplayCustomers } from 'src/app/constants';

import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})

export class CustomersComponent implements OnInit, AfterViewInit {
  public customersArr: MatTableDataSource<ICustomer>;
  public customersObj: any;
  public ngUnsubscribe$ = new Subject<void>();
  public columnsToDisplay = columnsToDisplayCustomers;
  public expandedElement: ICustomer | null;
  public daysString: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | null;

  constructor(private store: Store<IState>, private sidebarService: SidebarService, public dialog: MatDialog) {
    this.customersArr = new MatTableDataSource<ICustomer>();
    this.expandedElement = null;
    this.paginator = null;

  }

  ngOnInit(): void {
    this.store.select(getCustomersState)
      .pipe(
        takeUntil(this.ngUnsubscribe$))
      .subscribe(dataObj => {
        this.customersArr.data = Object.values(dataObj);
        this.customersObj = { ...dataObj };
      });
  }

  ngAfterViewInit(): void {
    this.customersArr.paginator = this.paginator;
  }

  moveSidebar(): void {
    this.sidebarService.changeSideBarStatus();
  }

  getCheckedDays(daysObj: DeliveryDays): string {
    const resultArr = [];
    for (const daysObjKey in daysObj) {
      if (daysObj[daysObjKey] === true) {
        resultArr.push(daysObjKey);
      }
    }
    return resultArr.join(', ');
  }

  editCustomer(customerNumber: string): void {
    const selectedObj = this.customersObj[customerNumber];
    this.dialog.open(EditCustomerComponent, {
      data: { selectedObj }
    }).afterClosed().subscribe(result => console.log(result));
  }

  openAddModal(): void {
    this.dialog.open(AddCustomerComponent, {
      data: {}
    });
  }
}
