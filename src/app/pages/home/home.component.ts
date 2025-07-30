import { Spinner } from './../../../../node_modules/ngx-spinner/lib/ngx-spinner.enum.d';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Iproduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { WishlistComponent } from '../wishlist/wishlist.component';

@Component({
  selector: 'app-home',
  imports: [CarouselModule , RouterLink , CurrencyPipe , SearchPipe , FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {




  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)

  searchItem:string = '';

  wishlistProductList : string[] = []

    customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1200,
    autoplay:true,
    smartSpeed:750,
    autoplayTimeout:1000,
    autoplaySpeed:2000,
    autoplayHoverPause:false,
    navText: ['<i class="fa-solid fa-caret-left"></i>', '<i class="fa-solid fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

    mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    smartSpeed:8000,
    autoplay:true,
    autoplayTimeout:5000,
    autoplaySpeed:2500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    
    nav: true
  }



  myCatagories: Icategory[]=[]

  myProduct: Iproduct[]=[]

  addFav:boolean = true

    ngOnInit(): void {
    this.callCaregories()
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

  callCaregories(){
    this.categoriesService.getCategories().subscribe({
      next: (res)=> {
        console.log(res.data);
        this.myCatagories = res.data
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }

  addProductToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success(res.message , 'Fresh Cart' , {progressBar:true , newestOnTop:false, titleClass:'text-center'})

        this.cartService.cartNum.next(res.numOfCartItems)

        
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
        this.addFav = true
        
        this.toastrService.success(res.message , 'Fresh Cart' , {progressBar:true , newestOnTop:false, titleClass:'text-center'})
        this.wishlistService.favNum.next(res.data.length)
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
