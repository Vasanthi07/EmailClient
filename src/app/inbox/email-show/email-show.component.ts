import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  email: Email;
  constructor(private routeParams: ActivatedRoute, private emailService: EmailService) {
    this.routeParams.data.subscribe(({ email }) => {
      console.log(email);
      this.email = email;
    })
  }

  ngOnInit() {
    // this.routeParams.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).pipe().subscribe(email => {
    //     console.log(email);

    //   })
    // })
    // console.log(this.routeParams.snapshot.params.id);
    // this.routeParams.params.pipe(
    //   switchMap(({ id }) => {
    //     return this.emailService.getEmail(id);
    //   })
    // ).subscribe(res => {
    //   this.email = res;
    // })
  }

}
