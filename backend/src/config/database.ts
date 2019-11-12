import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {join} from 'path';

const withCache: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: 5432,
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '..', '/migration/**/*{.ts,.js}')],
  migrationsTableName: 'orm_migrations',
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  synchronize: true,
  cache: {
    type: 'redis',
    options: {
      host: 'db_cache',
      port: 6379,
    },
  },
};

export default withCache;
