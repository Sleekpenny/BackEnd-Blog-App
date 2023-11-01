import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SubscribersService } from '../service/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit{
  subEmails: any =[]
  constructor(private subService: SubscribersService){}

  ngOnInit(): void {
    this.subService.loadSubscribers().subscribe({
      next: (response) => {
        this.subEmails = response;
        console.log  (response)
      },
    });
  }


  deleteMethod(postid){
    this.subService.deletEmail(postid)
  }
}
