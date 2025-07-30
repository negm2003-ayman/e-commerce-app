import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly wishlistService=inject(WishlistService)
  private readonly cartService=inject(CartService)
  private readonly toastrService=inject(ToastrService)

  // wishlistDetails: Iwishlist = {} as Iwishlist ;
  wishlistDetails: Iwishlist[] = [];

  ngOnInit(): void {
    this.getWishlistProduct()
  }


  getWishlistProduct(){
        this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistDetails = res.data
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  deleteProduct(id:string):void{
    this.wishlistService.deleteProductFromWishlist(id).subscribe({
        next:(res)=>{
        console.log(res);   
        this.getWishlistProduct()
        // this.wishlistDetails = res.data
        this.toastrService.success(res.message , 'Fresh Cart' , {progressBar:true , newestOnTop:false , titleClass:'text-center'})
        this.wishlistService.favNum.next(res.data.length)
        this.wishlistService.wishlistProductId.next(res.data);

      
      },error:(err)=>{
        console.log(err);
        this.toastrService.error(err.message , 'Fresh Cart' , {progressBar:true , newestOnTop:false, titleClass:'text-center'})
        
      }
    })
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



}
