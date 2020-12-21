import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewModule } from './overview/overview.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'overview', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule) },
  { path: 'products', loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule) },
  { path: 'products/:pid', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'register', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
