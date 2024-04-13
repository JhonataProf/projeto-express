import { AppDataSource } from '../app-data-source.js'
import { AgendamentoSchema } from '../schema/agendamento.js'
export class CadastroAgendamento {
    async store(req, res) {
        try {
            const body = req.body
            const agendamentoDto ={
                dataHora: req.body.data_hora,
                descricao: req.body.descricao,
                situacao: req.body.situacao,
                paciente: req.body.pacienteId,
                podologo: req.body.podologoId
            }
            const agendamentoRepository = AppDataSource.getRepository(AgendamentoSchema)
            const result = await agendamentoRepository.save(agendamentoDto)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}