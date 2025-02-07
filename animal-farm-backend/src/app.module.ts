import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsModule } from './animals/animals.module';
import { PigStatusModule } from './pig-status/pig-status.module';
import { MusicModule } from './music/music.module';
import { Animal } from './entities/animal.entity';
import { PigStatusEntity } from './entities/pig-status.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Animal, PigStatusEntity],
      synchronize: true,
    }),
    AnimalsModule,
    PigStatusModule,
    MusicModule,
  ],
})
export class AppModule {}
