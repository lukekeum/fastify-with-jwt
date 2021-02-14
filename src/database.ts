import { ConnectionOptions } from 'typeorm';
import entities from "./entity";

const connectionOptions: ConnectionOptions = {
  entities,
  type: 'postgres',
  port: 5432,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  dropSchema: false,
  synchronize: true,
  logging: false
}

export default connectionOptions