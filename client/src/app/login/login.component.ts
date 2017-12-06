import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionsService} from '../services/sessions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string;
  username: string;
  password: string;

  constructor(private session: SessionsService, private router: Router) { }

  ngOnInit() {
  }

  login() {
      console.log(this.username);
      this.session.login(this.username,this.password)
        .subscribe(
        (user) => {
          console.log(user.username)
          this.router.navigate(['/'])
        },
        (err) => this.error = err
        );
    }
}
