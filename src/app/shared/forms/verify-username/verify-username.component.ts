import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-username',
  templateUrl: './verify-username.component.html',
  styleUrls: ['./verify-username.component.css']
})
export class VerifyUsernameComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, ) { }

  /**
   * requires the username in order to reset password
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])]
    });
  }

  /**
   * with the queryParams, user link will not change
   */
  GetUsername() {
    const username = this.form.controls['username'].value;

    this.http.get(`/api/session/verify/users/${username}`).subscribe(res => {
      if (res) {
        this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username},
        skipLocationChange: true
      });
      }
    }, err => {
      this.error = 'Invalid Username';
      console.log(err);
    })
  }

}
