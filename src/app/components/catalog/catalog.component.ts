import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { getCatalogState, IState } from 'src/app/reducers';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { IProduct } from 'src/app/reducers/interfaces';
import { columnsToDisplayCatalog } from 'src/app/constants';

import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ReplaceCatalogComponent } from './replace-catalog/replace-catalog.component';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit, AfterViewInit {
  public productsArr: MatTableDataSource<IProduct>;
  public ngUnsubscribe$ = new Subject<void>();
  public expandedElement: IProduct | null;
  public columnsToDisplay = columnsToDisplayCatalog;

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
    this.dialog.open(AddProductComponent, {
      data: {}
    });
  }

  removeProduct(productCode: string, productName: string): void {
    this.dialog.open(DeleteProductComponent, {
      data: {
        code: productCode,
        name: productName,
      }
    });
    // this.store.dispatch(new DeleteCatalogAction({ code: productCode }));
  }

  openReplaceModal(): void {
    this.dialog.open(ReplaceCatalogComponent, {
      data: {}
    });
  }
}
