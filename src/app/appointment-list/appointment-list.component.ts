import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  // property
  appointments: Appointment[] = [];
  newAppointmentTitle: string = '';
  newAppointmentDate: Date;

  ngOnInit(): void {
    let savedApts = localStorage.getItem('appointment');
    // if items exist
    this.appointments = savedApts ? JSON.parse(savedApts) : [];
  }

  addAppointment() {
    if (this.newAppointmentTitle.trim() && this.newAppointmentDate) {
      let newApt: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };
      this.appointments.push(newApt);

      this.newAppointmentDate = new Date();
      this.newAppointmentTitle = '';

      localStorage.setItem('appointment', JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem('appointment', JSON.stringify(this.appointments));
  }
}
