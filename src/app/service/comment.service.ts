import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { query } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
ref = firebase.database().ref('Comments');

commentsRef: AngularFireList<any>;      // Reference to users list, Its an Observable
commentRef: AngularFireObject<any>;      // Reference to users list, Its an Observable
constructor(private db: AngularFireDatabase) { }
  
postComment(data): Observable<any> {
  return new Observable((observer) => {
    this.ref.push(data).then((doc) => {
         console.log(doc.key);
         data.id=doc.key;
         this.updateComment(data).subscribe();
    });
  });
}

updateComment(data): Observable<any> {
  return new Observable((observer) => {
    this.db.object("Comments/"+data.id).set(data).then(() => {
      observer.next();
    });
  });
}

getComments(): Observable<any>{
  return new Observable((observer) => {
    this.db
    .list("Comments")
    .valueChanges().subscribe
    (snapshot=>{
      let comments = [];
      snapshot.forEach( function(element:any){
        let d = {
          id : element.id,
          user : element.user,
          body : element.body,
          date : element.date
        }
        comments.push(d);
      })
      observer.next(comments);
    });
  });    
}

deleteComment(id: string): Observable<{}> {
  return new Observable((observer) => {
    this.db.object("Comments/"+id).remove().then(() => {
      observer.next();
    });
  });
}

}

