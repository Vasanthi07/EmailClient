import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
// import { MatchPassword } from 'src/app/auth/match-password';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/)], [this.uniqueUsername.validate]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  },
    { validators: [this.matchPassword.validate] }
  )
  constructor(private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signUp(this.authForm.value).subscribe(res => {
      console.log(res.username);
      this.route.navigateByUrl('/inbox')
    }, (err) => {
      if (!err.status) {
        this.authForm.setErrors({ noConnection: true })
      }
    })
  }

}
