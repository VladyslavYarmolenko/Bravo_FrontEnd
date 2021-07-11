import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../../reducers/interfaces';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { getCatalogState, IState } from '../../reducers';
import { takeUntil } from 'rxjs/operators';
import { SidebarService } from '../../services/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from './add-modal/add-modal.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit, AfterViewInit {
  public productsArr: MatTableDataSource<IProduct>;
  public ngUnsubscribe$ = new Subject<void>();


  columnsToDisplay = ['productCode', 'name', 'unit', 'price', 'availability', 'actions'];
  expandedElement: IProduct| null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null;

  constructor(private store: Store<IState>, private sidebarService: SidebarService, public dialog: MatDialog) {
    this.productsArr = new MatTableDataSource<IProduct>();
    this.expandedElement = null;
    this.paginator = null;
  }

  ngOnInit(): void {
    this.store.select(getCatalogState)
      .pipe(
        takeUntil(this.ngUnsubscribe$))
      .subscribe(dataObj => this.productsArr.data = Object.values(dataObj));
  }

  ngAfterViewInit(): void {
    this.productsArr.paginator = this.paginator;
  }

  moveSidebar(): void {
    this.sidebarService.changeSideBarStatus();
  }

  openAddModal(): void {
    this.dialog.open(AddModalComponent, {
      data: {}
    });
  }
}
