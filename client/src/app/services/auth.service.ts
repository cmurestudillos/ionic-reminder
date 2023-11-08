import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'access_token';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	url = environment.url;
	user = null;
	authenticationState = new BehaviorSubject(false);

	constructor(
		private http: HttpClient,
		private helper: JwtHelperService,
		private plt: Platform,
		private alertController: AlertController
	) {
		this.plt.ready().then(() => {
			this.checkToken();
		});
	}

	checkToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const decoded = this.helper.decodeToken(token);
      const isExpired = this.helper.isTokenExpired(token);

      if (!isExpired) {
        this.user = decoded;
        this.authenticationState.next(true);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
	}

	register(credentials:any) {
		return this.http.post(`${this.url}/usuarios`, credentials).pipe(
			catchError((e) => {
				this.showAlert(e.error.msg);
				throw new Error(e);
			})
		);
	}

login(credentials:any) {
  return this.http.post<{ token: string }>(`${this.url}/auth`, credentials).pipe(
    tap((res) => {
      localStorage.setItem(TOKEN_KEY, res.token);
      this.user = this.helper.decodeToken(res.token);
      this.authenticationState.next(true);
    }),
    catchError((e) => {
      this.showAlert(e.error.msg);
      throw new Error(e);
    })
  );
}

	logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authenticationState.next(false);
	}

	getSpecialData() {
		return this.http.get(`${this.url}/api/special`).pipe(
			catchError((e) => {
				let status = e.status;
				if (status === 401) {
					this.showAlert('You are not authorized for this!');
					this.logout();
				}
				throw new Error(e);
			})
		);
	}

	isAuthenticated() {
		return this.authenticationState.value;
	}

	showAlert(msg:any) {
		let alert = this.alertController.create({
			message: msg,
			header: 'Error',
			buttons: ['OK']
		});
		alert.then((alert) => alert.present());
	}
}
