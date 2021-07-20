import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { IOrder } from 'src/app/reducers/interfaces';
import { getOrdersState, IState } from 'src/app/reducers/index';
import { columnsToDisplayOrders } from 'src/app/constants';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class OrdersComponent implements OnInit, AfterViewInit {
  public ordersArr: MatTableDataSource<IOrder>;
  public ngUnsubscribe$ = new Subject<void>();
  public columnsToDisplay = columnsToDisplayOrders;
  public expandedElement: IOrder | null;
  public rangePickerGroup: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator | null;

  constructor(private store: Store<IState>, private sidebarService: SidebarService) {
    this.ordersArr = new MatTableDataSource<IOrder>();
    this.expandedElement = null;
    this.paginator = null;
    this.rangePickerGroup = new FormGroup({
      start : new FormControl(''),
      end : new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.store.select(getOrdersState)
      .pipe(
        takeUntil(this.ngUnsubscribe$))
      .subscribe(dataObj => this.ordersArr.data = Object.values(dataObj));
  }

  ngAfterViewInit(): void {
    this.ordersArr.paginator = this.paginator;
  }

  moveSidebar(): void {
    this.sidebarService.changeSideBarStatus();
  }
}
