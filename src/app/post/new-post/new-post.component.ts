import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostInterface } from 'src/app/PostInterface/PostInterface';
import { FireStoreService } from 'src/app/service/fire-store.service';
import { ImagePostService } from 'src/app/service/image-post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permaLink: string;
  imgSrc: any = './assets/20231008_004219.jpg';
  selectedImg: any;
  selectedCatergories: any = [];
  loadEdit: any = [];
  postEditing: string = 'Add New';
  postSaving: string = 'Save Post';
  smallEditing: string = ' new post';
  docId: string;

  constructor(
    private firestore: FireStoreService,
    private fireStorage: ImagePostService,
    private router: Router,
    private activeRout: ActivatedRoute
  ) {
   
      this.activeRout.queryParams.subscribe((post) => {
        this.docId = post['id'];

        if (this.docId ){
          this.fireStorage.EditDataQuery(post['id']).subscribe((results) => {
            this.loadEdit = results;
  
            this.imgSrc = this.loadEdit.image;
            this.postEditing = 'Edit';
            this.postSaving = 'Save Edit';
            this.smallEditing = 'edit';
          });
        }
      
      });
 
  }

  ngOnInit(): void {
    this.firestore.loadData().subscribe({
      next: (response) => {
        this.selectedCatergories = response;
        console.log(response);
      },
    });
  }

  onKeyUp($event) {
    let title = $event.target.value;
    this.permaLink = title.replace(/\s/g, '-');
  }

  ImageChange($event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit(form: NgForm) {
    let sp = form.value.category.split('-');

    const formData: PostInterface = {
      title: form.value.title,
      parmanentLink: form.value.parmanentLink,
      excerpt: form.value.excerpt,
      categorys: {
        categoryId: sp[0],
        category: sp[1],
      },
      image: '',
      content: form.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };

    form.reset();
    this.imgSrc = './assets/20231008_004219.jpg';
    console.log(formData);

    this.fireStorage.uploadImage(this.selectedImg, formData, this.postEditing, this.docId);
    this.router.navigateByUrl('/posts');
  }
}
