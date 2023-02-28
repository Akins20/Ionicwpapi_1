import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  isAuthenticated = false;
  token!: string;
  authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  onLogin(authData: any) {
    this.http.post('jwt-auth/v1/token', authData).subscribe(response => {
      const user: any = response;
      this.token = user.token;
      if (this.token) {
        localStorage.setItem('token', JSON.stringify(this.token));
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/posts']);
      }
    },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  autoAuthUser() {
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    if (this.token) {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigateByUrl('login');
  }

  private clearAuthData() {
    localStorage.removeItem('token');
  }
}