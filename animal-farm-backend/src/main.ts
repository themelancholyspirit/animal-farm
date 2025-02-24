import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: '*',  // Allow all origins for now
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,  // Changed to false since we're using '*'
  });
  
  // Add global prefix
  app.setGlobalPrefix('api');
  
  // Listen on all network interfaces
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
