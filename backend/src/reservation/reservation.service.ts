import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Reservation} from "./reservation";
import {Repository} from "typeorm";
import {IsEmail, IsMobilePhone, validate, validateOrReject} from "class-validator";
import {TestReservation} from "./testReservation";

@Injectable()
export class ReservationService{
    @InjectRepository(Reservation)
    private readonly  reservationRepository: Repository<Reservation>;

    async getReservations(): Promise<Reservation[]> {
        const reservations = await this.reservationRepository.find();
        return reservations;
    }

    async getReservation(RC_IC: string): Promise<Reservation>{
        return this.reservationRepository.findOne({where: {RC_IC: RC_IC}})
    }

    async insertReservation(newReservation: Reservation): Promise<Reservation>{
        const testReservation = new TestReservation(newReservation.name + newReservation.surname, newReservation.email, newReservation.phoneNumber);

        return validate(testReservation).then(async errors => {
            if(errors.length > 0){
                console.log('validation failed. errors: ', errors);

                return null;
            }else{
                console.log('validation succeed');

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
            }
        });
    }
}
