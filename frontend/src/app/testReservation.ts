import {IsAlpha, IsEmail, IsMobilePhone} from "class-validator"

export class TestReservation{

  constructor(fullName: string, email: string, phoneNumber: string ) {
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  @IsAlpha()
  fullName: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phoneNumber: string;

}
