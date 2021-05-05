import { IsAlpha, IsEmail, IsMobilePhone, Length } from 'class-validator';

export class TestReservation {
  constructor(
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    SPZ: string,
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.SPZ = SPZ;
  }

  @Length(2, 256)
  @IsAlpha()
  name: string;

  @Length(2, 256)
  @IsAlpha()
  surname: string;

  @Length(2, 10)
  SPZ: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phoneNumber: string;
}
