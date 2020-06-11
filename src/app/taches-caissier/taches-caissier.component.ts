import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../all-services.service';
import { command, Plat, Commande, lineOfcommand } from '../taches/taches.component';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    this.myServ.getPlats().subscribe((data:Plat[]) => this.plats = data);
    this.myServ.getCommands().subscribe(
      (data:Commande[]) =>{
        let i = 0;
        for(let onCom of data){
          if(onCom.status=="prêt" || onCom.status=="payé")
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
          if(com.status == "prêt")
            com.status="payé";
          this.myServ.changeStatus({id:oneCommand.id, status: com.status}).subscribe();


        }
    }

  }

  facture(com:command){
    let total = 0;
    let doc = new jsPDF()
    let factures : Array<string>[] = [];
    for(let line of com.lineOfcommands){
      total += line.Prix*line.quantity;
      factures.push([line.quantity+'',this.platName(line.idPlat)+' '+this.descPlat(line.idPlat),line.Prix+'',line.Prix*line.quantity+''])
    }
    factures.push(['Total',,,total+''])
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

}
