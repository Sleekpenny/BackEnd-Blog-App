import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FireStoreService } from '../service/fire-store.service';
import { CategoryInter } from '../interfaces/category-inter';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  dataResult:any = [];
  formEdit:string ;
  formStatusHeader:string = 'New';
  formStatusSubmit:string = 'Push';
  categoryId:string 

  constructor( private fireService:FireStoreService){}
  ngOnInit(){
    this.fireService.loadData().subscribe({
      next: (response)=>{
        console.log (response)
        this.dataResult =  response
      }
    })

    
  }

  onSubmit(form:NgForm){   
    let categoryData:CategoryInter = {
      category: form.value.category,          
    }
   

    if(this.formStatusHeader == 'New' || this.formStatusSubmit == 'Push'){
      this.fireService.saveData(categoryData)
      form.reset()
    } else if (this.formStatusHeader == 'Edit' || this.formStatusSubmit == 'Save'){
      this.fireService.update(this.categoryId, categoryData)
      form.reset()
      this.formStatusHeader = 'New';
      this.formStatusSubmit = 'Push'
    }
   
  }

  onEdit(category, id){
    this.formEdit = category,
    this.formStatusHeader = 'Edit',
    this.formStatusSubmit = 'Save'
    this.categoryId = id
  }

  onDetele(id){
    this.fireService.deteteData(id)
  }

  }
