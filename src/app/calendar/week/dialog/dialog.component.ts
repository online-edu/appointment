import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Appointment } from "../shared/appointment";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  appointment: FormGroup;

  constructor(
    @Inject(MD_DIALOG_DATA) public currentEvent: Appointment,
    public dialogRef: MdDialogRef<DialogComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(this.currentEvent);
    this.appointment = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      mobile: '',
      // startTime: ['', Validators.required],
      // endTime: ['', Validators.required]
    })
  }

  onSubmit({ value, valid }: { value, valid: boolean }) {
    if (valid) {
      this.currentEvent.name = this.appointment.get('name').value;
      this.currentEvent.email = this.appointment.get('email').value;
      this.currentEvent.phone = this.appointment.get('mobile').value;
      this.currentEvent.available = false;
      this.dialogRef.close();
    }

  }

}
