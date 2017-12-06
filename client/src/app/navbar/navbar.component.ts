import { Component, OnInit, DoCheck} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SessionsService} from '../services/sessions.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
  })

export class NavbarComponent implements OnInit, DoCheck{
public isCollapsed = false;

  error:any;
  user:any;


  constructor(private session:SessionsService) {

  }

  ngOnInit() {
  }

  ngDoCheck(){
    this.user=this.session.user;
    console.log(this.user);
  }

  logout(){
    this.session.logout()
       .subscribe(
         () => this.successCb(null),
         (err) => this.errorCb(err)
       )
       console.log("in logout login component ts");
       console.log(this.user);
  }

  errorCb(err) {
       this.error = err;
       this.user = null;
     }

     successCb(user) {
       this.user = user;
       this.error = null;
       console.log(this.user);
     }

}
