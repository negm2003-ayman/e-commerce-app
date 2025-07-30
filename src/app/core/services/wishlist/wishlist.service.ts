import { Iproduct } from './../../../shared/interfaces/iproduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistProductId = new BehaviorSubject<string[]>([])

  constructor(private httpClient:HttpClient) { 

      this.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistProductId.next((res.data as Iproduct[]).map((product)=>product._id))
        

        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
    // favNum :number = 0

    favNum : BehaviorSubject<number> = new BehaviorSubject(0)
    

    myToken = localStorage.getItem('myToken')!



  addProductToWishlist(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist` , 
      {
        "productId": id
      },
    )
  }

  getLoggedUserWishlist():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }

  deleteProductFromWishlist(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}` )
  }
}


