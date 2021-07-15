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

import { CatalogComponent } from './catalog/catalog.component';
import { CustomersComponent } from './customers/customers.component';
import { MainComponent } from './main/main.component';
import { OrdersComponent } from './orders/orders.component';
import { AddModalComponent } from './catalog/add-modal/add-modal.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { SidebarService } from '../services/sidebar/sidebar.service';

@NgModule({
  declarations: [
    CatalogComponent,
    CustomersComponent,
    MainComponent,
    OrdersComponent,
    AddModalComponent,
    AddCustomerComponent,
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
  ],
  exports: [
    MainComponent,
  ],
  providers: [
    SidebarService,
  ]
})

export class ComponentsModule {
}
