import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'


@Entity('students')
export class Student {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    firstName!: string;

    @Column({ length: 100 })
    lastName!: string;

    @Column()
    age!: number;

    @CreateDateColumn()
    createAt: Date
   
}