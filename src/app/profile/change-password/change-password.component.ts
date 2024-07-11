import { Component, Inject } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  old_password: string = '';
  new_password: string = '';
  confirm_password: string = '';
  showPassword: boolean = false;

  private apiUrl: string;

  constructor(private cookieService: CookieService, private router: Router, @Inject('apiUrl') apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  onChangePassword() {
    if (this.new_password !== this.confirm_password) {
      Swal.fire('Error', 'New Password and Confirm Password do not match', 'error');
      return;
    }

    const token = this.cookieService.get('userToken');

    axios.put(`${this.apiUrl}/auth/change/password`, {
      old_password: this.old_password,
      new_password: this.new_password
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data.message);
      Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success'
      });
    })
    .catch((error) => {
      if(error.response.status === 400) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        })
      } else if(error.response.status === 401) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      } else if(error.response.status === 422) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
   
  }
  

  onCancel() {
    this.router.navigateByUrl('/main/dashboard');
  }
}