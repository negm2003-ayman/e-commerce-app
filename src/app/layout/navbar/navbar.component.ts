import { Component, input } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    constructor(private flowbiteService: FlowbiteService , public authService:AuthService , private cartService:CartService , private wishlistService:WishlistService) {}

    numberOfCart:number = 0
    numberOfFav:number = 0

    isLoggedIn = input<boolean>(true)

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    // this.numberOfCart = this.cartService.cartNum
    // this.numberOfFav = this.wishlistService.favNum
    this.cartService.cartNum.subscribe({
      next:(value)=>{
        this.numberOfCart = value
      }
    })

    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartService.cartNum.next(res.numOfCartItems)
        
      },error:(err)=>{
        console.log(err);
        
      }
    })

    this.wishlistService.favNum.subscribe({
      next:(value)=>{
        this.numberOfFav = value
      }
    })

    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistService.favNum.next(res.data.length)
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }



}
