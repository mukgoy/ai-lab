import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(),
    ],
    providers: [],
    exports: [TypeOrmModule],
  })
export class GlobalsModule {}
