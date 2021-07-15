import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { getCustomersState, IState } from 'src/app/reducers';
import { ICustomer } from 'src/app/reducers/interfaces';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { columnsToDisplayCustomers } from 'src/app/constants';

import { AddCustomerComponent } from './add-customer/add-customer.component';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})

export class CustomersComponent implements OnInit, AfterViewInit {
  public customersArr: MatTableDataSource<ICustomer>;
  public ngUnsubscribe$ = new Subject<void>();
  public columnsToDisplay = columnsToDisplayCustomers;
  public expandedElement: ICustomer | null;

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
      .subscribe(dataObj => this.customersArr.data = Object.values(dataObj));
  }

  ngAfterViewInit(): void {
    this.customersArr.paginator = this.paginator;
  }

  moveSidebar(): void {
    this.sidebarService.changeSideBarStatus();
  }

  openAddModal(): void {
    this.dialog.open(AddCustomerComponent, {
      data: {}
    });
  }
}
