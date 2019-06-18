import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { query } from '@angular/core/src/render3';
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  ref = firebase.database().ref('Equipements');
  refUser = firebase.database().ref('Utilisateurs');
  equipsRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  equipRef: AngularFireObject<any>;      // Reference to users list, Its an Observable
  usersref: AngularFireList<any>; 
  ids=[];
  constructor(private db: AngularFireDatabase) { }   // Inject AngularFireDatabase dependency in constructor

  

  getCustomData(): Observable<any> {
    this.equipsRef =  this.db.list("Equipements");
    return new Observable((observer) => {
      let equips = [];
      this.ref
      .once("value")
      .then(snapshot=>{
        let datas = snapshot.val();
        for(let key in datas){
          let data = datas[key];
          equips.push({
            key: data.id,
            title: data.nom,
            description: data.descriptionpanne,
            status: data.etat,
            panne: data.panne
          });
        };
        observer.next(equips);
      });
    });    
  }

  getuserData(): Observable<any> {

    return new Observable((observer) => {
      let users = [];
      this.usersref = this.db.list("Utilisateurs");
      this.usersref.valueChanges().subscribe(datas=>{
        datas.forEach(data => {
          users.push({
            email: data.email,
            privilege: data.privilege
          });
        });
        observer.next(users);
      });
    });   
  }

  getEqupments(): Observable<any> {
    return new Observable((observer) => {
      this.ref.once("value").then((querySnapshot) => {
        let equips = [];
        let datas = querySnapshot.val();
        datas.forEach((doc) => {
          equips.push({
            key: doc.nom,
            title: doc.nom,
            description: doc.descriptionpanne,
            status: doc.etat,
            panne: doc.panne
          });
        });
        observer.next(equips);
      });
    });
  }

  getEquip(id: string){
      return this.db.object("Equipements/"+id).valueChanges();
  }
  getEquipment(id: string): Observable<any> {
  
    return new Observable((observer) => {
       firebase.database().ref('equipements/'+id).once("value").then((doc) => {
        let data = doc.val();
        observer.next({
          key: data.nom,
          title: data.nom,
          description: data.descriptionpanne,
          status: data.etat,
          panne: data.panne
        });
      });
    });
  }

    
  createEquipment(data): Observable<any> {
    return new Observable((observer) => {
      this.db.object("Equipements/"+data.nom).set(data).then((doc) => {
        observer.next({
        });
      });
    });
  }

  updateEquipment(data): Observable<any> {
    return new Observable((observer) => {
      this.db.object("Equipements/"+data.nom).set(data).then(() => {
        observer.next();
      });
    });
  }

  deleteEquipment(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.db.object("Equipements/"+id).remove().then(() => {
        observer.next();
      });
    });
  }



}