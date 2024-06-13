import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AgendamentoSchema } from './schema/agendamento.js'
import { AnamneseSchema } from './schema/anamnese.js'
import { PacienteSchema } from './schema/paciente.js'
import { PodologoSchema } from './schema/podologo.js'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    metadataTableName: 'meta_data_custom',
    relationLoadStrategy: 'join',
    logging: true,
    entities: [AgendamentoSchema, AnamneseSchema, PacienteSchema, PodologoSchema],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
    ssl: { rejectUnauthorized: false }
  })