import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation';
import { Repository } from 'typeorm';
import {
  IsEmail,
  IsMobilePhone,
  validate,
  validateOrReject,
} from 'class-validator';
import { TestReservation } from './testReservation';

@Injectable()
export class ReservationService {
  @InjectRepository(Reservation)
  private readonly reservationRepository: Repository<Reservation>;

  async getReservations(): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.find();
    return reservations;
  }

  async getReservation(RC_IC: string): Promise<Reservation> {
    return this.reservationRepository.findOne({ where: { RC_IC: RC_IC } });
  }

  async updateReservation(newReservation: Reservation): Promise<Reservation> {
    const testReservation = new TestReservation(
      newReservation.name,
      newReservation.surname,
      newReservation.email,
      newReservation.phoneNumber,
      newReservation.SPZ,
    );

    return validate(testReservation).then(async (errors) => {
      if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);

        throw new HttpException('validation failed', HttpStatus.NOT_ACCEPTABLE);
      } else {
        console.log('validation succeed');

        return await this.reservationRepository.save(newReservation);
      }
    });
  }

  async insertReservation(newReservation: Reservation): Promise<Reservation> {
    const testReservation = new TestReservation(
      newReservation.name,
      newReservation.surname,
      newReservation.email,
      newReservation.phoneNumber,
      newReservation.SPZ,
    );

    return validate(testReservation).then(async (errors) => {
      if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);

        throw new HttpException('validation failed', HttpStatus.NOT_ACCEPTABLE);
      } else {
        console.log('validation succeed');

        const isFree = await this.reservationRepository.find({
          where: {
            date: newReservation.date,
            time: newReservation.time,
          },
        });

        if (!isFree) {
          const reservation = this.reservationRepository.create();

          reservation.RC_IC = newReservation.RC_IC;
          reservation.name = newReservation.name;
          reservation.surname = newReservation.surname;
          reservation.email = newReservation.email;
          reservation.phoneNumber = newReservation.phoneNumber;
          reservation.date = newReservation.date;
          reservation.time = newReservation.time;
          reservation.SPZ = newReservation.SPZ;
          reservation.description = newReservation.description;

          return await reservation.save();
        } else {
          throw new HttpException('already exists', HttpStatus.NOT_ACCEPTABLE);
        }
      }
    });
  }

  async removeReservation(RC_IC: string): Promise<void> {
    await this.reservationRepository.delete(RC_IC);
  }

  async getTimes(date: string): Promise<string[]> {
    const times = await this.reservationRepository.find({
      where: { date: date },
    });
    const times2 = [
      '07:00:00',
      '08:00:00',
      '09:00:00',
      '10:00:00',
      '11:00:00',
      '12:00:00',
      '13:00:00',
      '14:00:00',
      '15:00:00',
      '16:00:00',
    ];

    const tmp = times2.filter(function (objFromA) {
      return !times.find(function (objFromB) {
        return objFromA === objFromB.time;
      });
    });

    return tmp;
  }
}
