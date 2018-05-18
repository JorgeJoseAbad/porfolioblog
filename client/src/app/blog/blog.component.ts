import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { BlogService} from '../services/blog.service';
import { SessionsService } from '../services/sessions.service';
import {MyBiographyService} from '../services/my-biography.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts:Observable<Array<Object>>;
  user:any;
  BASE_BIO_URL: string=`http://localhost:3000/api/biographies/`;

  constructor(
            private activatedroute: ActivatedRoute,
            private blogservice: BlogService,
            public session:SessionsService,
            public biography:MyBiographyService) { }

  ngOnInit() {
    this.user=this.session.user; //no used
  }

  getBlog(){
    this.blogservice.getBlog()
      .subscribe((posts)=>{
        this.posts=posts;
        console.log(this.posts);

      })
    }

    rendermyAuthorBio(authorName){
      console.log("rendermyPage");
      let responseUrl=this.BASE_BIO_URL+authorName;
      //window.location.href=responseCode; //this load the url
      window.open(
          responseUrl,
         '_blank' // <- This is what makes it open in a new window.
        );
    };


}
