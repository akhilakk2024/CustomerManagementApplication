import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerDetails } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
  customerForm: FormGroup=new FormGroup({});
  response:string="";
  customerData:CustomerDetails=new CustomerDetails();
  constructor(private customerService: CustomerService,private fb: FormBuilder,private router: Router) 
  { 
    this.customerForm = this.fb.group({
      
      Name: ['', Validators.required],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      MobileNo: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],     
      GeoLocation: [{value: '', disabled: true}, Validators.required]
    });

    
  }
  ngOnInit(): void {
    this.setCurrentLocation();
    
}
setCurrentLocation(): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.customerForm.patchValue({
        GeoLocation: `${latitude},${longitude}`
      });
    }, (error) => {
      console.error('Geolocation error:', error);
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}
onSubmit() {
  
  if (this.customerForm.valid) {
    

    this.customerData.Name=this.customerForm.get('Name')?.value
      this.customerData.Address=this.customerForm.get('Address')?.value
      this.customerData.Email=this.customerForm.get('Email')?.value
      this.customerData.MobileNo=this.customerForm.get('MobileNo')?.value
      this.customerData.GeoLocation=this.customerForm.get('GeoLocation')?.value
      this.customerService.addCustomer(this.customerData).subscribe(data => {
        this.response=data;       
        this.router.navigate(['/customer']);
        
      })
  }
  else{
    Object.keys(this.customerForm.controls).forEach((customerForm) => {
      this.customerForm.get(customerForm)?.markAsTouched();
    });
  }
}
}
