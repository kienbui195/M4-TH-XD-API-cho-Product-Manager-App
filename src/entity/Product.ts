import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

@Entity()

export class Product {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column({type: "varchar"})
    public name: string;

    @Column()
    public price: number;

    @Column({type: "varchar"})
    public author: string;

    @Column({type: "varchar"})
    public avatar: string;

}