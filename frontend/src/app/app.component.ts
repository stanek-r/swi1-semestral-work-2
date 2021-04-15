import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Reservation} from "./reservation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  text: string="Rodné číslo";
  selectTime: string="";
  times: string[]=[];
  disableTimes = true;

  @ViewChild('rc_ic') rc_ic!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('surname') surname!: ElementRef;
  @ViewChild('date') date!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('phoneNumber') phoneNumber!: ElementRef;
  @ViewChild('spz') spz!: ElementRef;
  @ViewChild('description') description!: ElementRef;

  constructor(private readonly httpClient: HttpClient) {}

  updateText(s: string){
      this.text = s;
  }

  sendForm(){
    const tmp : Reservation={
      RC_IC: this.rc_ic.nativeElement.value,
      name: this.name.nativeElement.value,
      surname: this.surname.nativeElement.value,
      date: this.date.nativeElement.value,
      time: this.selectTime,
      email: this.email.nativeElement.value,
      phoneNumber: this.phoneNumber.nativeElement.value,
      SPZ: this.spz.nativeElement.value,
      description: this.description.nativeElement.value
    }
    this.httpClient.post<Reservation>("http://localhost:3000/reservations",tmp).subscribe(idk => {
      console.log('Nenastal error: ' + idk);
      window.location.reload();
    }, error => {
      console.log('Nastal error: ' + error);
    });
  }

  loadTimes(){
    this.httpClient.get<string[]>("http://localhost:3000/reservations/get-time/" + this.date.nativeElement.value).subscribe(idk => {
      this.times = idk;
      this.disableTimes = false;
    }, error => {
      console.log('WTF: ' + error);
    });
  }

}
