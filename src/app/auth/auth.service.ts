import { Injectable } from "@angular/core";
//import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { EquipmentService } from '../service/equipment.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class AuthService {
  ref = firebase.database().ref('Utilisateurs');

  constructor(
  private db: AngularFireDatabase,
   public afAuth: AngularFireAuth,
   public equipService: EquipmentService
 ){}

  verifUserExist(email):Observable<boolean>{
    return new Observable((observer) => {

      this.equipService.getuserData().subscribe(list=>{
        let exist = false;
        list.forEach(element => {
            if(element.email == email){
              exist = true;
            }
        });
        observer.next(exist);
      });

    });
  }

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doTwitterLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
          let email = res.user.email;
          console.log(email);
          this.verifUserExist(email).subscribe(exist=> {
            if(!exist){
              let data={
                email : email,
                privilege: 3
              }
              this.db.object("Utilisateurs/"+  res.user.uid).set(data).then((doc) => {});
            }else
              console.log("user already existed");
          })
        
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
v          let email = value.email;
        this.verifUserExist(email).subscribe(exist=> {
          console.log("exist ... "+exist)
          if(!exist){
            console.log("create ... "+email)
            let data={
              email : email,
              privilege: 3
            }
            this.db.object("Utilisateurs/"+  res.user.uid).set(data).then((doc) => {});
            this.ref.push(data).then((doc) => {});
          }else
            console.log("user already existed");
        });
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }


}
