import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // signedIn = false;
  signedIn$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedIn$ = authService.signedIn$;
   }

  ngOnInit() {
    // this.authService.signedIn$.subscribe((signedIn) => {
    //   this.signedIn = signedIn;
    // })
    this.authService.checkAuth().subscribe(res=>{
      console.log(res);
      
    });
  }
}
