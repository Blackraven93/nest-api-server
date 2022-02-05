import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BirdsModule } from './birds/birds.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    //dotenv를 사용하기 위해서 ConfigModule을 적용해야 한다.
    ConfigModule.forRoot(),
    BirdsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  // middleware
  configure(consumer: MiddlewareConsumer) {
    // loggerMiddleware binding
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // mongoose query
    mongoose.set('debug', this.isDev);
  }
}
