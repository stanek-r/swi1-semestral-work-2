import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reservation} from './reservation';
import {validate} from 'class-validator';
import {TestReservation} from './testReservation';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogService} from "./dialog.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  text = 'Rodné číslo';
  selectTime = '';
  times: string[] = [];
  disableTimes = true;

  @ViewChild('rc_ic') rc_ic!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('surname') surname!: ElementRef;
  @ViewChild('date') date!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('phoneNumber') phoneNumber!: ElementRef;
  @ViewChild('spz') spz!: ElementRef;
  @ViewChild('description') description!: ElementRef;

  rc_ic2 = new FormControl('', [Validators.required]);
  name2 = new FormControl('', [Validators.required, Validators.minLength(2)]);
  surname2 = new FormControl('', [Validators.required, Validators.minLength(2)]);
  date2 = new FormControl('', [Validators.required]);
  email2 = new FormControl('', [Validators.required, Validators.email]);
  phoneNumber2 = new FormControl('', [Validators.required]);
  spz2 = new FormControl('', [Validators.required]);
  description2 = new FormControl('', [Validators.required]);
  radioValue = true;

  constructor(
    private readonly httpClient: HttpClient,
    public dialog: MatDialog,
    private dialogService: DialogService,
  ) {}

  updateText(s: string, value: boolean): void{
      this.text = s;
      this.radioValue = value;
  }

  getErrorMessage(): string{
    return 'Špatná hodnota';
  }

  sendForm(): void{
    const testReservation = new TestReservation(
      this.name.nativeElement.value,
      this.surname.nativeElement.value,
      this.rc_ic.nativeElement.value,
      this.email.nativeElement.value,
      this.phoneNumber.nativeElement.value,
      this.spz.nativeElement.value,
    );

    validate(testReservation).then(errors => {
      if (errors.length > 0) {
        console.log('Validation failed: ' + errors);

        if(errors.toString().includes('rc_ic')) {
          this.openDialog('Zadali jste neplatné rodné číslo');
        } else if(errors.toString().includes('phoneNumber')) {
          this.openDialog('Zadali jste neplatné telefonní číslo');
        } else {
          this.openDialog('Ve formuláři jste zadali neplatné informace');
        }
      } else {
        const tmp: Reservation = {
          RC_IC: ((this.radioValue) ? 'RC_' : 'IC_') + this.rc_ic.nativeElement.value,
          name: this.name.nativeElement.value,
          surname: this.surname.nativeElement.value,
          date: this.date.nativeElement.value,
          time: this.selectTime,
          email: this.email.nativeElement.value,
          phoneNumber: this.phoneNumber.nativeElement.value,
          SPZ: this.spz.nativeElement.value,
          description: this.description.nativeElement.value
        };
        this.httpClient.post<Reservation>('http://localhost:3000/reservations', tmp).subscribe(idk => {
          console.log('Nenastal error: ' + idk);
          window.location.reload();
        }, error => {
          console.log('Nastal error: ' + error);
          this.openDialog('Čas který jste zadali je již obsazený');
        });
      }
    });
  }

  loadTimes(): void{
    this.httpClient.get<string[]>('http://localhost:3000/reservations/get-time/' + this.date.nativeElement.value).subscribe(idk => {
      this.times = idk;
      this.disableTimes = false;
    }, error => {
      console.log('WTF: ' + error);
    });
  }

  openDialog(msg: string): void {
    this.dialogService.message = msg;

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-test',
  templateUrl: 'dialog-test.html',
  styleUrls: ['./app.component.scss']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    public dialogService: DialogService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
