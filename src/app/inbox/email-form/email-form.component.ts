import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter();
  emailForm: FormGroup;

  constructor() { }

  ngOnInit() {
    const { subject, from, to, text } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    })
  }

  onSubmit(){
    if(this.emailForm.invalid){
      return;
    }
    console.log(this.emailForm.getRawValue());
    this.emailSubmit.emit(this.emailForm.getRawValue());
    
  }

}
