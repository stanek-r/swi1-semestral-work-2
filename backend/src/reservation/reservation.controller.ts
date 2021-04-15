import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {ReservationService} from "./reservation.service";
import {Reservation} from "./reservation";

@Controller()
export class ReservationController {

    constructor(readonly reservationService: ReservationService) {}

    @Get("/reservations")
    async getReservations(): Promise<Reservation[]> {
        return this.reservationService.getReservations();
    }

    @Get("/reservations/get-time/:date")
    async getTimes(@Param("date") date: string): Promise<string[]>{
        return this.reservationService.getTimes(date);
    }

    @Get("/reservations/:id")
    async getReservation(@Param("id") RC_IC: string): Promise<Reservation>{
        return this.reservationService.getReservation(RC_IC);
    }

    @Post("/reservations")
    async insertReservation(@Body() newReservation: Reservation): Promise<Reservation>{
        return this.reservationService.insertReservation(newReservation);
    }



}
