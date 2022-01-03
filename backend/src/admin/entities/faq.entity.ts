import { UserEntity } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { BotEntity } from './bot.entity';
import { CommonProperty } from './common.property';

@Entity({name: 'faqs'})
export class FaqEntity extends CommonProperty{
    @PrimaryGeneratedColumn()
    faqId: number;

    @Column({ nullable: true, type: "text" })
    question : string;

    @Column({ nullable: true, type: "text" })
    answer: string;

    @ManyToOne(() => BotEntity, bots => bots.faqs)
    bot: BotEntity;

    @ManyToOne(() => UserEntity, owner => owner.faqs)
    owner: UserEntity;
}
