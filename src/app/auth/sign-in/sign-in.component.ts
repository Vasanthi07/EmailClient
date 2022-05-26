import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
  })
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.signin(this.authForm.value).subscribe((res) => {
      this.route.navigateByUrl('/inbox');
    }, (err) => {
      console.log(err);
      if (err.error.username || err.error.password) {
        this.authForm.setErrors({ credentials: true });
      }
    })
  }

}
