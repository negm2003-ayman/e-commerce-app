import { headersInterceptor } from './../../core/interceptors/headers/headers.interceptor';
import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Allorder } from '../../shared/interfaces/allorder';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [FormsModule , CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly paymentService = inject(PaymentService)
  private readonly authService = inject(AuthService)


  userId: string = '';

  allOrders: Allorder[] = [];




  ngOnInit(): void {
    this.authService.getUserData()
    this.userId = this.authService.userData.id

        this.paymentService.getUserOrders(this.userId).subscribe({
      next:(res)=>{
        console.log(res);
        this.allOrders = res

        
      },error:(err)=>{
        console.log(err);
      
        
      }
    })
    
  }

  // getUserOrder(id:string){
  //   this.paymentService.getUserOrders(id).subscribe({
  //     next:(res)=>{
  //       console.log(res);
        
  //     },error:(err)=>{
  //       console.log(err);
        
  //     }
  //   })
  // }

}
