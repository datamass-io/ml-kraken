import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth, Hub } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { Router } from '@angular/router';

const NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED';

export interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
    id: string | null;
    email: string | null;
}

const initialAuthState = {
    isLoggedIn: false,
    username: null,
    id: null,
    email: null
};

@Injectable({providedIn: 'root'})
export class AuthService {
    private readonly authState = new BehaviorSubject<AuthState>(initialAuthState);

    readonly auth$ = this.authState.asObservable();

    readonly isLoggedIn$ = this.auth$.pipe(map(state => state.isLoggedIn));

    constructor(private router: Router) {
        Auth.currentAuthenticatedUser().then(
            (user: any) => this.setUser(user),
            err => this.authState.next(initialAuthState)
        );

        Hub.listen('auth', ({ payload: { event, data, message } }) => {
            if (event === 'signIn') {
                this.setUser(data);
            } else {
                this.authState.next(initialAuthState);
            }
        });
    }

    private setUser(user: any) {
        if (!user) {
            return;
        }

        if (user.attributes === undefined || user.attributes === null) {
            this.authState.next(initialAuthState);
        } else {
            const {
                attributes: { sub: id, email },
                username
            } = user;

            this.authState.next({ isLoggedIn: true, id, username, email });
        }
    }

    signIn(username, password): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            Auth.signIn(username, password)
                .then((user: CognitoUser) => {
                    switch ((user as any).challengeName) {
                        case NEW_PASSWORD_REQUIRED:
                            Auth.completeNewPassword(user, password, (user as any).challengeParam.requiredAttributes)
                                .then((confirmedUser: CognitoUser) => {
                                    Auth.signIn(confirmedUser.getUsername(), password)
                                        .then(_ => {
                                            resolve(true);
                                        }).catch(err => {
                                            reject(err);
                                        });
                                }).catch(err => {
                                    reject(err);
                                });
                            break;
                        default:
                            resolve(true);
                    }
                }).catch(err => {
                    reject(err);
            });
        });
        return promise;
    }

    signOut() {
        Auth.signOut()
            .then(_ => this.router.navigate(['/login']))
            .catch(err => {
                console.log(err);
                this.router.navigate(['/login']);
            });
    }
}
