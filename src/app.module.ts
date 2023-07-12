import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { ValidationSchema } from './config/configuration';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `env/.env.${process.env.NODE_ENV || 'development'}`,
        'env/.env',
        '.env',
      ],
      validationSchema: ValidationSchema,
      expandVariables: true,
    }),
    DatabaseModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
