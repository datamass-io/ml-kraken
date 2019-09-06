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
  error = '';
  isLoading = false;

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
    this.isLoading = true;
    this.authService.signIn(this.credentials.username, this.credentials.password)
                    .then(res => {
                      this.isLoading = false;
                      console.log(res);
                    })
                    .catch(err => {
                      this.isLoading = false;
                      this.credentials.username = '';
                      this.credentials.password = '';
                      console.log(err);
                      if (err === 'Username cannot be empty') {
                        this.error = 'EMPTY';
                      } else if (err.code !== undefined) {
                        if (err.code === 'UnexpectedLambdaException' || err.code === 'NotAuthorizedException') {
                          this.error = 'INCORRECT';
                        }
                      }

                      if (err !== '') {
                        setTimeout(() => {
                          this.error = '';
                        }, 3000);
                      }
                    });
  }

  @HostListener('document:keypress', ['$event'])
  onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }
}
