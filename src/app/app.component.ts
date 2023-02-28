import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from '../app/auth.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.auth.autoAuthUser();
    });
  }
  clientError400(): void {
    lastValueFrom(this.http.get('https://httpbin.org/status/400'));
  }

  serverError500(): void {
    lastValueFrom(this.http.get('https://httpbin.org/status/500'));
  }

  success(): void {
    lastValueFrom(this.http.get('https://httpstat.us/200'));
  }
}