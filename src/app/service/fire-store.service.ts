import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  constructor(
    private fireStore:AngularFirestore,
    private toasterMsg: ToastrService) { }

  saveData(data) {
    this.fireStore.collection('categories').add(data).then(docRef =>{
      console.log(docRef);    
      this.toasterMsg.success('Category saved!')
     }).catch(err =>{console.log(err)})
  }

  loadData(){
   return  this.fireStore.collection('categories').snapshotChanges().pipe(
      map(data =>{
        return data.map (response =>{
          const data  =  response.payload.doc.data();
          const id = response.payload.doc.id;
          return { id, data}
        })
      })
    )
  }

  update(id, Editdata) {
    this.fireStore.collection('categories').doc(id).update(Editdata).then((dataResp) => {
      this.toasterMsg.success('Categories updated successfully')
    })
  }

  deteteData(id){
    this.fireStore.collection('categories').doc(id).delete().then((dataResp) => {
      this.toasterMsg.success('Category deleted successfully')
    })
  }
}
