import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list/customer-list.component';
import { AddcustomerComponent } from './add-customer/addcustomer/addcustomer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer/edit-customer.component';



const routes: Routes = [
  {path: '',redirectTo:'/customer',pathMatch:'full'},
  { path: 'customer', component: CustomerListComponent }, 
  { path: 'add', component: AddcustomerComponent } ,
  { path: 'edit/:id', component: EditCustomerComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
