import {IsAlpha, IsDateString, IsEmail, IsMobilePhone, Length, Matches} from 'class-validator';

export class TestReservation {
  constructor(
    name: string,
    surname: string,
    rc_ic: string,
    email: string,
    phoneNumber: string,
    SPZ: string,
  ) {
    this.name = name;
    this.surname = surname;
    this.rc_ic = rc_ic;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.SPZ = SPZ;
    this.birthDate = this.createBirthDate();
  }

  @Length(2, 256)
  @IsAlpha()
  name: string;

  @Length(2, 256)
  @IsAlpha()
  surname: string;

  @Matches(/^\d{6}[/]?\d{3,4}$/)
  rc_ic: string;

  @Length(2, 10)
  SPZ: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phoneNumber: string;

  @IsDateString()
  birthDate: string;

  createBirthDate(): string {
    const rc_ic = this.rc_ic.replace("/","");
    let year = parseInt(rc_ic.substr(0,2));
    let month = parseInt(rc_ic.substr(2,2));
    let day = parseInt(rc_ic.substr(4,2));
    let c = null;
    if(rc_ic.length == 10){
      console.log("Délka je 10 " + rc_ic);
      c = parseInt(rc_ic.substr(9,1));
    }
    console.log(rc_ic);
    console.log(year+","+month+","+day);
    if(c == null){
      year += year < 54 ? 1900 : 1800;
    } else {
      let mod = parseInt(rc_ic.substring(0,9)) % 11;
      if(mod == 10){
        mod = 0;
      }
      if(mod != c){
        return "";
      }
      year += year < 54 ? 2000 : 1900;
    }

    if (month > 70 && year > 2003){
      month -= 70;
    } else if(month > 50){
      month -= 50;
    } else if(month > 20 && year > 2003){
      month -= 20;
    }
    console.log(year+"-"+month+"-"+day);

    if(month < 10){
      return year+"-0"+month+"-"+day;
    } else {
      return year+"-"+month+"-"+day;
    }
  }
}
