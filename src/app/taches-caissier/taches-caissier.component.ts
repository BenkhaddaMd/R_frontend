import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../all-services.service';
import {  Plat, Commande, lineOfcommand } from '../taches/taches.component';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
 class command{
  id:number;
  numero_table:string;
  total:number;
  status:string;
  commente:string;
  lineOfcommands:lineOfcommand[];
}
@Component({
  selector: 'app-taches-caissier',
  templateUrl: './taches-caissier.component.html',
  styleUrls: ['./taches-caissier.component.css']
})
export class TachesCaissierComponent implements OnInit {

  public allCommands : command[] = [];
  public plats : Plat[] = [];

  public test = false;
  visible:boolean[]=[];

constructor(private myServ:AllServicesService){
}
  ngOnInit(): void {
    
    //this.commandsLog();
    this.myServ.getPlats().subscribe((data:Plat[]) => this.plats = data);
    this.getAllCommands();
    setInterval(()=>{
      this.getAllCommands();
    }, 10000);

  }

  getAllCommands(){
    this.myServ.getCommands().subscribe(
      (data:Commande[]) =>{
        let i = 0;
        for(let onCom of data){
          if(onCom.status=="prêt" || onCom.status=="payé")
          {            
            this.visible[i]=false;
            let com:command = {id:onCom.id, numero_table:onCom.numero_table+'',total:onCom.total,status:onCom.status,commente:onCom.commente,lineOfcommands:null};
            this.myServ.getLineCommands(onCom.id).subscribe(
              (data1:lineOfcommand[])=>{
                com.lineOfcommands=data1;
                let test = true;
                for(let one of this.allCommands){
                  if(one.id == com.id){
                    one.status = com.status; one.numero_table = com.numero_table; test = false;
                  }
                }
                if(test)
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
          if(com.status == "prêt"){
            this.myServ.changeStatusCaissier({id:oneCommand.id, status: "payé", numero_table: '!'+com.numero_table}).subscribe(
              data=>{
                com.status="payé";
                com.numero_table= '!'+com.numero_table;
              }
            );
          }
        }
    }
  }

  facture(com:command){
    let total = 0;
    let doc = new jsPDF()
    let factures : Array<string>[] = [];
    for(let line of com.lineOfcommands){
      total += line.Prix*line.quantity;
      factures.push([line.quantity+'',this.platName(line.idPlat)+' '+this.descPlat(line.idPlat),line.Prix+' DH',line.Prix*line.quantity+' DH'])
    }
    factures.push(['Total',,,total+' DH'])
  var finalY = doc.previousAutoTable.finalY || 10
  doc.text('Facture de Pyament', 14, finalY + 15)
  doc.autoTable({
    startY: finalY + 20,
    head: [['QTE', 'DESIGNATION', 'PRIX UNIT', 'MONTANT']],
    body: factures,
  })

    doc.save('facture.pdf');

     doc = new jsPDF()

  }

  commandsLog(){
    setInterval(()=>{
      let myDate = new Date();
      let h = 0,day = 0,day_bd=0;
      
      h = +myDate[Symbol.toPrimitive]('string').split(' ')[4].split(':')[0];  
      day = +myDate[Symbol.toPrimitive]('string').split(' ')[2];  
      if(h>=8 && h<=9){
        this.myServ.getLastDay().subscribe(
          (data:string)=>{
            day_bd  = (Number)(data.split('-')[2][0]+data.split('-')[2][1]);  
            if(day != day_bd){
               this.saveCommands();           
             }
          }
        )      
      }
      
    }, 60000);
  }

  saveCommands(){
    this.myServ.saveCommands().subscribe();
  }

}
