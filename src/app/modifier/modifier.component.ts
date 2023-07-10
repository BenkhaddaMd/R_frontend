import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../all-services.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {

  allCategories : Category[] = [];

  constructor(private myServ:AllServicesService) { }

  ngOnInit() {
    this.myServ.getCategories().subscribe(
      (data:Category[]) =>  {this.allCategories = data;
      },
      error => console.error(error)
      );
      
  }

  update(){
    for(let i=0;i<this.allCategories.length;i++)
    {
         this.myServ.updateCategories(this.allCategories[i]).subscribe(
          data => console.log(data),
          error => console.error(error)  
        );
    }
  }

  delete(id){
        this.myServ.deleteCategory(this.allCategories[id].id).subscribe(
          data => console.log(data)
          ,
          error => console.error(error)
          );   
          this.ngOnInit();
      }
  }


class Category{
    id:null;
    name: null; 
    description: null;
}

