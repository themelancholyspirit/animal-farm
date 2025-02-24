import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { PigStatusModule } from './pig-status/pig-status.module';
import { MusicModule } from './music/music.module';
import { Animal } from './entities/animal.entity';
import { PigStatusEntity } from './entities/pig-status.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || '/app/data/db.sqlite',
      entities: [Animal, PigStatusEntity],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Animal]),
    AnimalsModule,
    PigStatusModule,
    MusicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
