import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerDetails } from 'src/app/models/customer';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  editCustomerForm: FormGroup;
  customerId: number=0;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.editCustomerForm = this.fb.group({
      CustomerCode: [{ value: '', disabled: true }, Validators.required],
      Name: ['', Validators.required],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      MobileNo: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      GeoLocation: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     
      this.customerId = Number(params.get('id') as string);
      this.loadCustomer();
    });
  }

  loadCustomer(): void {
    debugger
    this.customerService.GetCustomerDataById(this.customerId).subscribe(CustomerDetails => {
      
      if (CustomerDetails) {
        this.editCustomerForm.patchValue({
          CustomerCode:CustomerDetails.CustomerCode,
          Name: CustomerDetails.Name,
          Address: CustomerDetails.Address,
          Email: CustomerDetails.Email,
          MobileNo: CustomerDetails.MobileNo,
          GeoLocation: CustomerDetails.GeoLocation
        });
       
      } else {
        this.router.navigate(['/customer']); // Handle customer not found
      }
    });
  }

  onSubmit(): void {
    debugger
    if (this.editCustomerForm.valid) {
      
      this.customerService.updateCustomer(this.editCustomerForm.getRawValue()).subscribe({
        next: (response) => {
          this.router.navigate(['/customer']).then(() => {
            window.location.reload();
          });
        }
      });
     
    }
    else{
      Object.keys(this.editCustomerForm.controls).forEach((editCustomerForm) => {
        this.editCustomerForm.get(editCustomerForm)?.markAsTouched();
      });
    }
  }
}