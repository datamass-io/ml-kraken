import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isLoggedIn$.pipe(
            map(e => {
                if (e) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            }),
            catchError((err) => {
                console.log(err);
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }
}
