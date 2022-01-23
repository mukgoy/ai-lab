import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ObjectIdColumn, ObjectID} from 'typeorm';
import { CommonProperty } from './common.property';
import { UserEntity } from './user.entity';

@Entity({name: 'uploads'})
export class UploadEntity extends CommonProperty{
    @PrimaryGeneratedColumn()
    uploadId: number;

    @Column({ nullable: true })
    originalname : string;

    @Column({ nullable: true })
    filename : string;

    @Column({ nullable: true })
    path : string;

    @Column({ nullable: true })
    size : number;

    @ManyToOne(() => UserEntity, owner => owner.uploads)
    owner: UserEntity;
}
