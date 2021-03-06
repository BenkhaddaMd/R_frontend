import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../all-services.service';

export class command{
  id:number;
  numero_table:number;
  total:number;
  status:string;
  commente:string;
  lineOfcommands:lineOfcommand[];
}
export class lineOfcommand{
  id: number; 
  idPlat: number; 
  idCommande: number; 
  quantity: number; 
  Prix: number
}
export class Plat{
  id:number;
  name: string;
  description: string;
  categorie: string;
  prix: number;
  image: string;
}
export class Commande{
  id:number;
  numero_table:number;
  total:number;
  status:string;
  commente:string;
}
@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {

  public allCommands : command[] = [];
  public plats : Plat[] = [];

  public test = false;
  visible:boolean[]=[];

constructor(private myServ:AllServicesService){
}
  ngOnInit(): void {
    this.myServ.getPlats().subscribe((data:Plat[]) => this.plats = data);
    this.myServ.getCommands().subscribe(
      (data:Commande[]) =>{
        let i = 0;
        for(let onCom of data){
          if(onCom.status=='en attente' || onCom.status=='en preparation')
          {
            this.visible[i]=false;
            let com:command = {id:onCom.id, numero_table:onCom.numero_table,total:onCom.total,status:onCom.status,commente:onCom.commente,lineOfcommands:null};
            this.myServ.getLineCommands(onCom.id).subscribe(
              (data1:lineOfcommand[])=>{
                com.lineOfcommands=data1;
                this.allCommands.push(com);
                if(data[data.length-1] == onCom) this.test = true;
              }
            );
          }
          i++;
        }
        }        
    );
  }

  visibility(i){
    if(this.visible[i])
    this.visible[i]=false;
    else
    this.visible[i]=true;    
  }
  platName(id){
    for(let plat of this.plats){
      if(id == plat.id)
      return plat.name;
    }
  }
  descPlat(id){
    for(let plat of this.plats){
      if(id == plat.id)
      return plat.description;
    }
  }
  valider(oneCommand){
    for(let com of this.allCommands){
      if(com.id == oneCommand.id)
        {
          if(com.status == "en attente")
            com.status="en preparation";
          else if(com.status == "en preparation") 
            com.status="prêt";
          this.myServ.changeStatus({id:oneCommand.id, status: com.status}).subscribe();


        }
    }

  }

}
