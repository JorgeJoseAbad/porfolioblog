import { Component, OnInit } from '@angular/core';
import { SessionsService} from '../services/sessions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
error: String;
  constructor(private session: SessionsService, private router: Router) { }

  ngOnInit() {
  }
  signup(form) {
      console.log(form.value);
      this.session.signup(form.value)
        .subscribe(
        (user) => {
          console.log(user)
          this.router.navigate([''])  //changed 'private' to ''
        },
        (err) => this.error = err
        );
    }
}
