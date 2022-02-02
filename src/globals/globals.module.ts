import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './modules/mail/mail.module';
import repositories from './repository';
@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([...repositories]),
        MailModule,
    ],
    providers: [],
    exports: [TypeOrmModule],
  })
export class GlobalsModule {}
