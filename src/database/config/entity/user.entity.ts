import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id!: number
    //email
    @Column({ type: 'varchar', unique: true, nullable: false })
    email!: string
    //password
    @Column({ type: 'varchar', nullable: false })
    password!: string
    //name
    @Column({ type: 'varchar', nullable: false })
    name!: string
    //탈퇴유무
    @Column({ nullable: false })
    del_yn!: boolean
    //생성일
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
    //수정일
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
    //탈퇴일
    @Column({ type: 'timestamp' })
    deleteAt!: Date;
}