import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICustomer, IOrder } from '../../reducers/interfaces';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { getCustomersState, getOrdersState, IState } from '../../reducers';
import { takeUntil } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomersComponent implements OnInit, AfterViewInit {
  public customersArr: MatTableDataSource<ICustomer>;
  public ngUnsubscribe$ = new Subject<void>();

  columnsToDisplay = ['customerNo', 'name', 'address', 'deliveryDays'];
  expandedElement: ICustomer | null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null;

  constructor(private store: Store<IState>, private sidebarService: SidebarService) {
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
}
