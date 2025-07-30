import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent  implements OnInit{

  private readonly formBuilder = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly paymentService = inject(PaymentService)
  paymentForm ! : FormGroup

  cartId :string =''


  ngOnInit(): void {

    this.paymentForm = this.formBuilder.group({
      details : [null , [Validators.required]],
      phone : [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city : [null , [Validators.required]]
    })

    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.cartId = res.get('id')!
        console.log(this.cartId);
        
        
      }
    })

    
  }


  // paymentForm : FormGroup = new FormGroup({
  //   details : new FormControl (null , [Validators.required]),
  //   phone : new FormControl (null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  //   city : new FormControl (null , [Validators.required]),
  // })

  submitForm():void{
    console.log(this.paymentForm.value);
    this.paymentService.checkoutSession(this.cartId , this.paymentForm.value).subscribe({
      next:(res)=>{
        console.log(res);

        if (res.status === "success") {
          window.open(res.session.url , '_self')
        }
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
    
  }
}
