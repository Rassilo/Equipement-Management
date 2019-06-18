import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { FirebaseUserModel } from '../../auth/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Location } from '@angular/common';
import { EquipmentService } from '../../service/equipment.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy ,OnInit{
 
  public navItemsOld = navItems;
  //public navItems = navItems;
  
  public navItems = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Equipement',
      url: '/dashboard/equipments',
      icon: 'icon-drop'
    },
    {
      name: 'Ajout équipement',
      url: '/dashboard/equipment-create',
      icon: 'icon-pencil'
  }];

  public navItemsUser = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Equipement',
      url: '/dashboard/equipments',
      icon: 'icon-drop'
    }];

  

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  user: FirebaseUserModel = new FirebaseUserModel();
  constructor(private es : EquipmentService, private route: ActivatedRoute,private location : Location  ,private authService : AuthService,@Inject(DOCUMENT) _document?: any  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
    
  }

  
  currentUser;
  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.currentUser =data;
      }
    });
    this.es.getEquip("eee").subscribe(e=>{
      this.verifyMenu();
    });   
  }
  verifyMenu(){
  //  console.log(this.currentUser.privilege);
    console.log(this.currentUser.privilege);
   if(this.currentUser.privilege != 1){
     this.navItems = this.navItemsUser;
   }
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}
