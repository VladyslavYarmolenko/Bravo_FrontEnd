import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MainComponent } from './main/main.component';
import { AppGuard } from '../guard/app-guard';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full'},
      { path: 'orders', component: OrdersComponent, pathMatch: 'full' },
      { path: 'customers', component: CustomersComponent, pathMatch: 'full' },
      { path: 'catalog', component: CatalogComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppGuard],
})

export class ComponentsRoutingModule {
}
