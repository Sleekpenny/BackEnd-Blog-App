import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagePostService {

  constructor(private fireStorage:AngularFireStorage,
             private toasterSer:ToastrService,
             private fireStoreData:AngularFirestore) { }

  uploadImage(selectedImage, formData, formStatus, id){
    const filePath = `postImg/${Date.now()}`

    this.fireStorage.upload(filePath, selectedImage).then((docPost)=>{
     
      this.fireStorage.ref(filePath).getDownloadURL().subscribe({
        next: (result)=>{
          console.log (result)
          formData.image = result   
          
          if (formStatus == 'Edit' ){
            this.updatePost(id, formData)
          } else if (formStatus == 'Add New' ){
            this.fireStoreData.collection('PostsForm').add(formData).then((docRef)=>{
              console.log(docRef)
            })  
          }         
                     
        }        
      }) 
    })   
  } 

 

  loadData(){
    return  this.fireStoreData.collection('PostsForm').snapshotChanges().pipe(
       map(data =>{
         return data.map (response =>{
           const data  =  response.payload.doc.data();
           const id = response.payload.doc.id;
           return { id, data}
         })
       })
     )
   }

   EditDataQuery(id){
   return this.fireStoreData.collection('PostsForm').doc(id).valueChanges();
   }

   updatePost(id, data){
    this.fireStoreData.collection('PostsForm').doc(id).update(data).then((docRef)=>{
      this.toasterSer.success('Post updated successfully!')
    })
   }

   deleteImage(postImage, id){
    this.fireStorage.storage.refFromURL(postImage).delete().then((docRef)=>{
      this.deleteData(id)
      this.toasterSer.warning('Post deleted successfully')
    })
   }

   deleteData( id){
    this.fireStoreData.collection('PostsForm').doc(id).delete().then((docRef)=>{

    })
   }

   markFeatured(id, featuredData){
    this.fireStoreData.collection('PostsForm').doc(id).update(featuredData).then((docRef)=>{
      
    })
   }

}
