import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
  selector: 'app-cash',
  imports: [ReactiveFormsModule],
  templateUrl: './cash.component.html',
  styleUrl: './cash.component.scss'
})
export class CashComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly paymentService = inject(PaymentService)
  private readonly router = inject(Router)
  cashForm !: FormGroup ;
    cartId :string =''



  ngOnInit(): void {
    this.cashForm = this.formBuilder.group({
      details : [null , [Validators.required] ],
      phone : [null , [Validators.required] ],
      city : [null , [Validators.required] ]
    })


    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.cartId  = res.get('id')!
        console.log(this.cartId);
                
      }
    })
  }



  submitForm():void{
    console.log(this.cashForm.value);
    this.paymentService.cashOrder(this.cartId , this.cashForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        
        if (this.cashForm.valid) {
          this.router.navigate(["/allorders"])
        }else{
          this.router.navigate(["/carts"])
        }
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
    
  }

}
