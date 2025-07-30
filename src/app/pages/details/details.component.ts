import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

private readonly activatedRoute = inject(ActivatedRoute)
private readonly productsService = inject(ProductsService)
private readonly cartService = inject(CartService)
private readonly toastrService = inject(ToastrService)

prodId:any;
prodData:Iproduct | null = null;

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe({
        next:(res)=>{
          this.prodId = res.get('id')
          
          this.productsService.getSpecificProducts(this.prodId).subscribe({
            next:(res)=>{
              console.log(res);

              this.prodData = res.data
              console.log(this.prodData);
              
              
            },error:(err)=>{
              console.log(err);
              
            }
          })

        }
      })
    }

      addProductToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success(res.message , 'Fresh Cart' , {progressBar:true , newestOnTop:false})
        
      },
      error:(err)=>{
        console.log(err);
                this.toastrService.error(err.message , 'Fresh Cart' , {progressBar:true , newestOnTop:false})
        
      }
    })
  }
}
