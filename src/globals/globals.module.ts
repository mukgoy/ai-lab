import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import repositories from './repository';
@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([...repositories]),
    ],
    providers: [],
    exports: [TypeOrmModule],
  })
export class GlobalsModule {}
