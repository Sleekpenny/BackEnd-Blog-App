import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagePostService } from 'src/app/service/image-post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})

export class AllPostComponent implements OnInit{

  PostData: any = []
  constructor(private postService: ImagePostService, private activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.postService.loadData().subscribe({
      next: (results)=>{
        this.PostData = results
        console.log(results)
      }
    })     

  }

  deleteMethod(postImage, id){
    this.postService.deleteImage(postImage, id)
  }

  featured(id, value){
    const featuredData = {
      isFeatured: value
    }
    this.postService.markFeatured(id, featuredData)
  }


  }

  


  


