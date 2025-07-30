import { environment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor( private httpClient:HttpClient) { }

    myToken = localStorage.getItem('myToken')!



  checkoutSession(id:string , shippingData:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}` , 
      {
      "shippingAddress": shippingData
      },
    )
  }

  cashOrder(id:string , shippingData:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}` , 
      {
        "shippingAddress": shippingData
        },
      )
  }

  getAllOrders():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/`)
  }

  getUserOrders(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }
    
  }

