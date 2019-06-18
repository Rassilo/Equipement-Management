import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from './user.service';
import { FirebaseUserModel } from './user.model';
import { EquipmentService } from '../service/equipment.service';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {

  constructor(public equipService:EquipmentService, public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        this.equipService.getuserData().subscribe(list=>{
          list.forEach(element => {
            
              if(element.email == user.email){
                 user.privilege = element.privilege;
              }
          });
        });

        if(res.providerData[0].providerId == 'password'){
          user.image = 'https://via.placeholder.com/400x300';
          user.name = res.displayName;
          user.email = res.email;
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        }
        else{
          user.image = res.photoURL;
          user.name = res.displayName;
          user.provider = res.providerData[0].providerId;
          user.email = res.email;
          return resolve(user);
        }
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
