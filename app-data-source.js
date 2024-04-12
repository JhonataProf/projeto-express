import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AgendamentoSchema } from './schema/agendamento.js'
import { AnamneseSchema } from './schema/anamnese.js'
import { PacienteSchema } from './schema/paciente.js'
import { PodologoSchema } from './schema/podologo.js'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '192.168.23.9',
    port: 3306,
    username: 'jhonatasobral',
    password: 'Jhon@t@87',
    database: 'sistema_podologia_v2',
    synchronize: true,
    metadataTableName: 'meta_data_custom',
    relationLoadStrategy: 'join',
    logging: true,
    entities: [AgendamentoSchema, AnamneseSchema, PacienteSchema, PodologoSchema],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy()
  })