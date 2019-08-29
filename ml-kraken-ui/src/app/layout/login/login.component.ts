import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/models/list'], { relativeTo: this.route });
        }
      }
    );
  }

  onLogin() {
    this.authService.signIn(this.credentials.username, this.credentials.password)
                    .then(res => console.log(res))
                    .catch(err => {
                      this.credentials.username = '';
                      this.credentials.password = '';
                      console.log(err);
                    });
  }

  @HostListener('document:keypress', ['$event'])
  onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }
}
