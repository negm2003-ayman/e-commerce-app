import { Component, inject } from '@angular/core';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from '../../core/services/product/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe , SearchPipe , RouterLink , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)

    myProduct: Iproduct[]=[]

      searchItem:string = '';
      wishlistProductList : string[] = []


  
      ngOnInit(): void {
  
      this.callProduct()
      this.wishlistService.wishlistProductId.subscribe((idsList) =>{this.wishlistProductList = idsList})

    }
  
    callProduct(){
          this.productsService.getProducts().subscribe( {
        next: (res)=> {
          console.log(res.data);
          this.myProduct = res.data
        },
        error: (err)=>{
          console.log(err);
          
        }
      } )
    }

      addProductToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success(res.message , 'Fresh Cart' , {progressBar:true , newestOnTop:false, titleClass:'text-center'})
        
      },
      error:(err)=>{
        console.log(err);
                this.toastrService.error(err.message , 'Fresh Cart' , {progressBar:true , newestOnTop:false, titleClass:'text-center'})
        
      }
    })
  }

  addProductToWishlist(id:string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success(res.message , 'Fresh Cart' , {progressBar:true , newestOnTop:false, titleClass:'text-center'})
        this.wishlistService.wishlistProductId.next(res.data);


        
      },error:(err)=>{
        console.log(err);
        this.toastrService.error(err.message , 'Fresh Cart' , {progressBar:true , newestOnTop:false, titleClass:'text-center'})

      }
    })
  }

    isWishlistProduct(id:string){
    return this.wishlistProductList.includes(id)
  }

}
