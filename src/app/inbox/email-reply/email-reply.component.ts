import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnInit {

  @Input() email: Email;
  showModal = false;
  constructor(private emailService: EmailService) { }

  ngOnInit() {

  }
  ngOnChanges() {
    const text = this.email.text.replace(/\n/gi, '\n>');
    this.email = {
      ...this.email,
      to: this.email.from,
      from: this.email.to,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n----------${this.email.from} wrote:\n> ${text}`
    }
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    })
  }

}
