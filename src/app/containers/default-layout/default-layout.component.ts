import {Component} from '@angular/core';
import { AuthService } from '../../auth.service';
import { TokenService } from '../../token.service';
import { Router } from '@angular/router';
import { profile } from '../../profile/profile.component';
import { AllServicesService } from '../../all-services.service';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  public sidebarMinimized = false;
  public urlImage = '';
  public profile : profile = {name:'',email:'',fonction:'',image:''};
  constructor(private auth:AuthService,
              private token:TokenService,
              private router:Router,
              private myServ:AllServicesService,){}
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout(){
    this.auth.changeAuthStatus(false);
    this.token.logout();
    this.router.navigateByUrl("/login")
  }
  ngOnInit(): void {
    this.commandsLog();
    let email = atob(localStorage.getItem('email'));
    this.myServ.profile(email).subscribe(
      (data:profile)=> {
        this.profile = data;
        this.urlImage = `assets/img/avatars/`+this.profile.image;  
       if(data.fonction == "Admin") {
         this.navItems_0[7].attributes = {hidden : true};
         this.navItems_0[8].attributes = {hidden : true};
         this.navItems_0[9].attributes = {hidden : true};

        }

         if(data.fonction == "Caissier") {

           this.navItems_0[1].attributes = {hidden : true};
           this.navItems_0[2].attributes = {hidden : true};
           this.navItems_0[3].attributes = {hidden : true};
           this.navItems_0[4].attributes = {hidden : true};
           this.navItems_0[5].attributes = {hidden : true};
           this.navItems_0[6].attributes = {hidden : true};
           this.navItems_0[7].attributes = {hidden : true};
           this.navItems_0[8].attributes = {hidden : true};

          }

         if(data.fonction == "Comptoiriste")  {

          this.navItems_0[1].attributes = {hidden : true};
          this.navItems_0[2].attributes = {hidden : true};
          this.navItems_0[3].attributes = {hidden : true};
          this.navItems_0[4].attributes = {hidden : true};
          this.navItems_0[5].attributes = {hidden : true};
          this.navItems_0[6].attributes = {hidden : true};
          this.navItems_0[7].attributes = {hidden : true};
          this.navItems_0[9].attributes = {hidden : true};

         }

         if(data.fonction == "Serveur")  {
          this.navItems_0[1].attributes = {hidden : true};
          this.navItems_0[2].attributes = {hidden : true};
          this.navItems_0[3].attributes = {hidden : true};
          this.navItems_0[4].attributes = {hidden : true};
          this.navItems_0[5].attributes = {hidden : true};
          this.navItems_0[6].attributes = {hidden : true};
          this.navItems_0[8].attributes = {hidden : true};
          this.navItems_0[9].attributes = {hidden : true};

         }

         this.navItems=this.navItems_0   
      }
    )

  }

  
  commandsLog(){
     var myInterval = setInterval(()=>{
      let myDate = new Date();
      let h = 0,day = 0,day_bd=0;
      
      h = +myDate[Symbol.toPrimitive]('string').split(' ')[4].split(':')[0];  
      day = +myDate[Symbol.toPrimitive]('string').split(' ')[2];  
      if(h>=22 && h<=23){
        this.myServ.getLastDay().subscribe(
          (data:string)=>{
            day_bd  = (Number)(data.split('-')[2][0]+data.split('-')[2][1]);  
            if(day != day_bd)
              this.saveCommands();          
            clearInterval(myInterval);
          }
        )      
      }      
    }, 5000);
  }

  saveCommands(){
    this.myServ.saveCommands().subscribe();
  }
  
  public menu:boolean;
  public navItems: INavData[] = []
  public navItems_0: INavData[] = [
  // admin
   {
     name: 'Accueil',
     url: '/home',
     icon: 'icon-home',
   },
   {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-pie-chart',
  },
  {
    name: 'Gestion Menu',
    url: '/menugestion',
    icon: 'icon-equalizer',
  },
  {
   name: 'Modifier Categories',
   url: '/modifier',
   icon: 'icon-wrench',
   },
   {
     name: 'Menu Admin',
     url: '/menu',
     icon: 'icon-list',
   },
   {
    name: 'Ajouter Employée',
    url: '/register',
    icon: 'icon-plus'
  },
   {
    name: 'Employees',
    url: '/employees',
    icon: 'icon-people',
  },

// serveur
   {
    name: 'Menu Serveur',
    url: '/menuServeur',
    icon: 'icon-menu',
  },
// Comptoiriste
   {
     name: 'Taches Comptoiriste',
     url: '/taches',
     icon: 'icon-note',
   },
  // Caissier
  {
    name: 'Taches Caissier',
    url: '/tachesCaissier',
    icon: 'icon-note',
  },
  {
    name: 'Profile',
    url: '/profile',
    icon: 'icon-user',
  },
 ];
}
