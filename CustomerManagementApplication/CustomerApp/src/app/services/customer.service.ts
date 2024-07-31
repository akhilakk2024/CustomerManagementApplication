import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { customer, CustomerDetails } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  apiUrl: string ="https://localhost:7022/api/"
  

  constructor(private http: HttpClient) { }
   
  getCustomers(): Observable<customer> {
    debugger
    const labelUrl = `${this.apiUrl}Customer/GetCustomerData`;
    return this.http.get<customer>(labelUrl);
  }
  GetCustomerDataById(customerid:number): Observable<CustomerDetails> {
    const labelUrl = `${this.apiUrl}customer/GetCustomerDataById/`+customerid;
    return this.http.get<CustomerDetails>(labelUrl);
  }
  addCustomer(customerData:CustomerDetails):Observable<string>{
    const url = `${this.apiUrl}customer/addCustomer`;
    return this.http.post<string>(url,customerData);
  }
  updateCustomer(customerDetails:CustomerDetails): Observable<any> {
    debugger
    const url = `${this.apiUrl}customer/updateCustomer`;
    return this.http.put(url, customerDetails);
  }
  deleteCustomer(customerCode: number): Observable<any> {
    debugger
    const url = `${this.apiUrl}customer/deleteCustomer/${customerCode}`;
    return this.http.delete(url);
  }
}
