import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { BlogService} from '../services/blog.service';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts:Observable<Array<Object>>;
  user:any;

  constructor(
            private activatedroute: ActivatedRoute,
            private blogservice: BlogService,
            private session:SessionsService) { }

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


}
