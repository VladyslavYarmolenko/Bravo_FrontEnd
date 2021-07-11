import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { IOrder } from '../../reducers/interfaces';
import { getOrdersState, IState } from '../../reducers/index';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { SidebarService } from '../../services/sidebar.service';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class OrdersComponent implements OnInit, AfterViewInit {
  public ordersArr: MatTableDataSource<IOrder>;
  public ngUnsubscribe$ = new Subject<void>();

  columnsToDisplay = ['orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'reqDelivery', 'status'];
  expandedElement: IOrder| null;


  @ViewChild(MatPaginator) paginator: MatPaginator | null;

  constructor(private store: Store<IState>, private sidebarService: SidebarService) {
    this.ordersArr = new MatTableDataSource<IOrder>();
    this.expandedElement = null;
    this.paginator = null;
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
