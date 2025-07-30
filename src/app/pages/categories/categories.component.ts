import { Icategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService)

    myCatagories: Icategory[] = []
    mySubCatagories: Icategory[] = []
    isClicked : boolean = false
    SelectedCategory : string = ''
    
  

  ngOnInit(): void {
    this.getAllCategory()
  }

  getAllCategory(){
    this.categoriesService.getCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.myCatagories = res.data

        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getSubCategory(id:string , cateName : string):void{
    this.SelectedCategory = cateName
    this.categoriesService.getAllSubCategories(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.mySubCatagories = res.data
        this.isClicked = true

        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
