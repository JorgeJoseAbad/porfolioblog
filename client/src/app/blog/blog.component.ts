import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { BlogService} from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts:Observable<Array<Object>>;

  constructor(
            private activatedroute: ActivatedRoute,
            private blogservice: BlogService) { }

  ngOnInit() {
    
  }

  getBlog(){
    this.blogservice.getBlog()
      .subscribe((posts)=>{
        this.posts=posts;
        console.log(this.posts);

      })
    }


}
