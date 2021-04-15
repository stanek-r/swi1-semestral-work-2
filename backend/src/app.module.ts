import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Reservation} from "./reservation/reservation";
import {ReservationModule} from "./reservation/reservation.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test_user',
      password: '123456789',
      database: 'test_database',
      entities: [
        Reservation
      ],
      synchronize: true,
    }),
      ReservationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
