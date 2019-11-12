import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from 'nestjs-config';

import * as session from 'express-session';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

import { AppModule } from './app.module';
import { TransformInterceptor } from '@/shared/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.use(helmet());
  // app.use(
  //   session({
  //     secret: configService.get('jwt.secret'),
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: { secure: true },
  //   }),
  // );
  // app.use(csurf());
  app.useGlobalInterceptors(new TransformInterceptor());

  const apiPrefix = `${configService.get('site.apiPath')}/${configService.get(
    'site.apiPrefix',
  )}`;
  app.setGlobalPrefix(apiPrefix);

  const options = new DocumentBuilder()
    .setTitle(configService.get('site.title'))
    .setDescription(configService.get('site.description'))
    .setVersion(configService.get('site.version'))
    .addTag('emmerich')
    .setBasePath(apiPrefix)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(apiPrefix, app, document);

  await app.listen(3000);
}

bootstrap();
