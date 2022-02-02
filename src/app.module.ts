import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BirdsModule } from './birds/birds.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [BirdsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // middleware
  configure(consumer: MiddlewareConsumer) {
    // loggerMiddleware binding
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
