import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { customer,CustomerDetails } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {


  public customer:customer=new customer();
  searchControl = new FormControl('');
  customerForm: FormGroup= new FormGroup({});;
  filteredCustomers:CustomerDetails[] = [];
  customerIdToDelete: number=0;
  showDialog: boolean = false;
  constructor(private customerService: CustomerService,private fb: FormBuilder,private router: Router) 
  { 
    
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      searchCustomer: ['']
    });
   
    this.getCustomerData();
    
  }
  navigateToAddCustomer() 
  {
    this.router.navigate(['/add']);
  }
    getCustomerData()
    {
      
      this.customerService.getCustomers().subscribe(data_ => {     
      this.customer=data_;
      this.filteredCustomers=this.customer.Details;
      
     })
    }

   

    searchCustomerById() {
      const searchValue = this.customerForm.get('searchCustomer')?.value;
      if (searchValue !== null && searchValue !== undefined && searchValue !== '') {
        this.filteredCustomers = this.customer.Details.filter(customer => 
          customer.CustomerCode === +searchValue);
      } else {
        this.filteredCustomers = this.customer.Details;    
      }
    }

    openDeleteDialog(customerId: number): void {
      this.customerIdToDelete = customerId;
      this.showDialog = true;
    }
  
    handleConfirmation(result: boolean): void {
      if (result && this.customerIdToDelete !== null) {
        this.customerService.deleteCustomer(this.customerIdToDelete).subscribe({
          next: (response) => {
            this.router.navigate(['/customer']).then(() => {
              window.location.reload();
            });
          },
          error: (error) => {
            console.error('Error deleting customer:', error);
          }
        });
      }
      this.showDialog = false;
      this.customerIdToDelete = 0;
    }
  
    
   
    print(): void {
      window.print();
    }
    }
  


