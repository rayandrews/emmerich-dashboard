import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { I18nModule, QueryResolver, HeaderResolver } from 'nestjs-i18n';
import { RouterModule } from 'nest-router';

import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import * as path from 'path';

import { routes } from '@/routes';
import { SharedModule } from '@/shared/shared.module';
import { UsersModule } from '@/users/users.module';
import { AccountingModule } from '@/accounting/accounting.module';

initializeTransactionalContext(); // Initialize cls-hooked
patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        path: path.resolve(__dirname, 'locales'),
        fallbackLanguage: config.get('locale.fallbackLanguage'),
        filePattern: config.get('locale.filePattern'),
        resolvers: [
          new QueryResolver(['lang', 'locale', 'l']),
          new HeaderResolver(),
        ],
      }),
      inject: [ConfigService],
    }),
    RouterModule.forRoutes(routes), // setup the routes
    SharedModule,
    UsersModule,
    AccountingModule,
  ],
})
export class BootstrapModule {}
