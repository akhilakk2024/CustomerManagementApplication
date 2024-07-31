import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerListComponent } from './customer-list/customer-list/customer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddcustomerComponent } from './add-customer/addcustomer/addcustomer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer/edit-customer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog/confirm-dialog.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    AddcustomerComponent,
    EditCustomerComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
