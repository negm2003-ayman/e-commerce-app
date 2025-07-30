import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService)

  myBrands :Ibrands [] = []

  selectedBrand: any = null;
isModalOpen: boolean = false;
isAnimating: boolean = false;

  ngOnInit(): void {
    this.callBrands()
  }

openModal(brand: any) {
  this.selectedBrand = brand;
  this.isModalOpen = true;
  //  document.body.classList.add('overflow-hidden');

  setTimeout(() => {
    this.isAnimating = true;
  }, 10);
}

closeModal() {
  this.isAnimating = false;

  setTimeout(() => {
    this.isModalOpen = false;
    // document.body.classList.remove('overflow-hidden');
  }, 300);
}


  callBrands(){
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data);

        this.myBrands = res.data
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
