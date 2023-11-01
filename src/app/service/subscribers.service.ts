import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private firestore:AngularFirestore) { }

  loadSubscribers(){
    return  this.firestore.collection('Subscription').snapshotChanges().pipe(
      map(data =>{
        return data.map (response =>{
          const data  =  response.payload.doc.data();
          const id = response.payload.doc.id;
          return { id, data}
        })
      })
    )
  }

  deletEmail(id){
    this.firestore.collection('Subscription').doc(id).delete().then(()=>{
      
    })
  }

}
