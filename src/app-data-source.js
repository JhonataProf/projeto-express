import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AgendamentoSchema } from './schema/agendamento.js'
import { AnamneseSchema } from './schema/anamnese.js'
import { PacienteSchema } from './schema/paciente.js'
import { PodologoSchema } from './schema/podologo.js'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'pi-senac-db.mysql.database.azure.com',
    port: 3306,
    username: 'professor',
    password: 'Senac123',
    database: 'sistema_podologia',
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