import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService} from '../services/blog.service';
import { SessionsService} from '../services/sessions.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  error: string;

  newPost = {
      title: '',
      content: '',
    };

    feedback: string;

  constructor(
    private router:Router,
    private blog:BlogService,
    public session:SessionsService
    ) { }

  ngOnInit() {
  }

  submit(){
    console.log(this.newPost);
    this.blog.addPost(this.newPost)
    .subscribe(
      (post)=>{
        console.log(post)
        this.router.navigate(['blog'])
      },
      (err)=>this.error=err
    );
  }

}
