import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    const email = authForm.value.email;
    const password = authForm.value.password;
    if (!this.isLoginMode) {
      authObs = this.auth.signUp(email, password);
    } else {
      authObs = this.auth.login(email, password);
    }
    authObs.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['recipes']);
      },
      (err) => {
        this.isLoading = false;
        // this.toastr.error('An error occurred!', err, {
        //   closeButton: true,
        // });
        this.error = err;
      }
    );
    authForm.reset();
  }

  closeAlert() {
    this.error = null;
  }
}
