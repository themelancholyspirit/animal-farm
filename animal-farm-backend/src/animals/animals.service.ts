import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../entities/animal.entity';
import { animalSeedData } from '../database/seeds/animal.seed';

@Injectable()
export class AnimalsService implements OnModuleInit {
    
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
  ) {}

  async onModuleInit() {
    await this.seedAnimals();
  }

  private async seedAnimals() {
    const count = await this.animalsRepository.count();
    if (count === 0) {
      await this.animalsRepository.save(animalSeedData);
    }
  }

  findAll(): Promise<Animal[]> {
    return this.animalsRepository.find();
  }

  async findSingle(id: number): Promise<Animal | { error: string }> {
    const animal = await this.animalsRepository.findOne({ where: {id} })


    if (!animal){
      return {
        error: 'Animal not found'
      }
    }

    return animal
  }

  async incrementCount(id: number, isThanks: boolean): Promise<Animal | { error: string }> {

    const animal = await this.animalsRepository.findOne({ where: { id } });

    if (!animal) {
      return {
        error: 'Animal not found'
      }
    }

    if (isThanks){
      animal.thanksCount += 1;
    } else {
      animal.disgustCount += 1;
    }

    return this.animalsRepository.save(animal);
  }
}