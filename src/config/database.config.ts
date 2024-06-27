import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  const dbOptions = {
    synchronize: false,
    entities: ['dist/**/**/*.entity{.ts,.js}'],
  };
  console.log(process.env.NODE_ENV);

  switch (process.env.NODE_ENV) {
    case 'development':
      console.log(process.env.DB_HOST);

      Object.assign(dbOptions, {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      });
      break;

    case 'production':
      Object.assign(dbOptions, {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      });
      break;

    default:
      throw new Error('unknown environment');
  }

  return dbOptions;
};
