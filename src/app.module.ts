import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './ormconfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TodoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
