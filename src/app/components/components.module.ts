import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { DateFilterService } from '../services/date-filter/date-filter.service';

import { CatalogComponent } from './catalog/catalog.component';
import { CustomersComponent } from './customers/customers.component';
import { MainComponent } from './main/main.component';
import { OrdersComponent } from './orders/orders.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from '../services/sidebar/sidebar.service';
import { AddProductComponent } from './catalog/add-product/add-product.component';
import { DeleteProductComponent } from './catalog/delete-product/delete-product.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { ReplaceCatalogComponent } from './catalog/replace-catalog/replace-catalog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    CatalogComponent,
    CustomersComponent,
    MainComponent,
    OrdersComponent,
    AddCustomerComponent,
    SidebarComponent,
    AddProductComponent,
    DeleteProductComponent,
    EditCustomerComponent,
    ReplaceCatalogComponent,
  ],
    imports: [
        CommonModule,
        ComponentsRoutingModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatChipsModule,
        MatMenuModule,
    ],
  exports: [
    MainComponent,
  ],
  providers: [
    SidebarService,
    MatDatepickerModule,
    DateFilterService,
  ]
})

export class ComponentsModule {}
