import {Entity, Column, BaseEntity, PrimaryColumn} from 'typeorm';

@Entity()
export class Reservation extends BaseEntity{

    @PrimaryColumn({type: "varchar", length: 50})
    RC_IC: string;

    @Column({type: "varchar", length: 30})
    name: string;

    @Column({type: "varchar", length: 30})
    surname: string;

    @Column({type: "date"})
    date: string;

    @Column({type: "time"})
    time: string;

    @Column({type: "varchar", length: 10})
    SPZ: string;

    @Column({type: "text"})
    description: string;

    @Column({type: "varchar", length: 256})
    email: string;

    @Column({type: "varchar", length: 20})
    phoneNumber: string;
}
