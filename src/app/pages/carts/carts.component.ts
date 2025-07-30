import { ToastrService } from 'ngx-toastr';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-carts',
  imports: [RouterLink , FormsModule , CommonModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.scss'
})
export class CartsComponent implements OnInit {

  private readonly CartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)

  cartDetails:Icart ={} as Icart

  selected:string = ''

  ngOnInit(): void {
    this.CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  deleteItem(id:string):void{
    this.CartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails =res.data
        this.toastrService.success('Product Deleted successfully' , 'Fresh Cart' , {progressBar:true , newestOnTop:false, titleClass:'text-center'})

        this.CartService.cartNum.next(res.numOfCartItems)

        
      },error:(err)=>{
        console.log(err);
        this.toastrService.error('Please try Again' , 'Fresh Cart' , {progressBar:true , newestOnTop:false, titleClass:'text-center'})

        
      }
    })

  }

  updateQuantity(quantity:any , id:string){
    this.CartService.updateCartProductQuantiy(quantity , id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data

        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  deleteCart():void{
    this.CartService.clearUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = {} as Icart        
        this.CartService.cartNum.next(0)
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
