import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { IOrder, IOrderState } from 'src/app/interfaces';
import { getOrdersState, IState, getCustomersData } from 'src/app/reducers/index';
import { columnsToDisplayOrders } from 'src/app/constants';
import { FormControl, FormGroup } from '@angular/forms';
import { DateFilterService } from '../../services/date-filter/date-filter.service';
import { ConfirmOrdersAction, SetFilteredOrdersAction } from '../../reducers/orders/orders.actions';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CustomerFilterService } from '../../services/customer-filter/customer-filter.service';


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
  providers: [CustomerFilterService, DateFilterService]
})

export class OrdersComponent implements OnInit, AfterViewInit {
  public ordersState: IOrderState | null;
  public ordersArr: MatTableDataSource<IOrder>;
  public ngUnsubscribe$ = new Subject<void>();
  public columnsToDisplay = columnsToDisplayOrders;
  public expandedElement: IOrder | null;
  public rangePickerGroup: FormGroup;
  public customersArr: string[];

  /// MatChips
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  customerCtrl = new FormControl();
  filteredCustomers$: Observable<string[]>;
  selectedCustomers: string[] = ['Burger Bar'];
  allCustomers: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  @ViewChild('customerInput') customerInput: ElementRef<HTMLInputElement> | null;

  // @ViewChild('MatMenuTrigger') trigger: MatMenuTrigger | null | undefined;

  constructor(private store: Store<IState>,
              private sidebarService: SidebarService,
              private dateFilter: DateFilterService,
              private customerFilter: CustomerFilterService) {

    this.ordersArr = new MatTableDataSource<IOrder>();
    this.ordersState = null;
    this.expandedElement = null;
    this.paginator = null;
    this.customerInput = null;
    this.customersArr = [];

    this.rangePickerGroup = new FormGroup({
      start: new FormControl(''),
      end: new FormControl(''),
    });


    this.filteredCustomers$ = this.customerCtrl.valueChanges.pipe(
      startWith(null),
      map((client: string | null) => client ? this._filterCustomers(client) : this.allCustomers.slice()));
  }

  ngOnInit(): void {

    this.store.select(getOrdersState)
      .pipe(
        takeUntil(this.ngUnsubscribe$))
      .subscribe(dataObj => {
        this.ordersArr.data = Object.values(dataObj);

        this.ordersArr.data.map(elem => {
          this.allCustomers.push(elem.customer);
        });
        this.ordersState = { ...dataObj };
      });

    this.store.select(getCustomersData)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(customers => {
        this.allCustomers = Object.keys(customers).map(customerKey => customers[customerKey].name);
      });

    console.log(this.selectedCustomers);
  }

  ngAfterViewInit(): void {
    this.ordersArr.paginator = this.paginator;
  }

  moveSidebar(): void {
    this.sidebarService.changeSideBarStatus();
  }

  checkDates(): void {
    const filteredOrdersState = this.dateFilter.getDates(this.rangePickerGroup.value, this.ordersState);
    this.store.dispatch(new SetFilteredOrdersAction({ newState: filteredOrdersState }));
  }

  confirmOrder(productCode: string): void {
    this.store.dispatch(new ConfirmOrdersAction({ code: productCode }));
  }

  //// MATCHIPS

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedCustomers.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();

    this.customerCtrl.setValue(null);
    this.ordersArr.filteredData = this.ordersArr.data.filter(order => this.selectedCustomers.indexOf(order.customer) !== -1);
  }

  remove(client: string): void {
    const index = this.selectedCustomers.indexOf(client);

    if (index >= 0) {
      this.selectedCustomers.splice(index, 1);
      this.customerFilter.setSelectedCustomers(this.selectedCustomers);
    }

    // this.allCustomers.filter(customer => customer.toLowerCase().includes(filterValue);
    const filteredCustomers = this.customerFilter.setSelectedCustomers(this.selectedCustomers);
    this.store.dispatch(new SetFilteredOrdersAction({ newState: filteredCustomers }));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.customersArr.push(event.option.viewValue);
    this.selectedCustomers.push(event.option.viewValue);
    if (this.customerInput) {
      this.customerInput.nativeElement.value = '';
    }
    this.customerCtrl.setValue(null);
    const filteredCustomers = this.customerFilter.setSelectedCustomers(this.selectedCustomers);
    this.store.dispatch(new SetFilteredOrdersAction({ newState: filteredCustomers }));
  }

  private _filterCustomers(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCustomers.filter(customer => customer.toLowerCase().includes(filterValue));
  }
}
