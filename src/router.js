import jwt from 'jsonwebtoken'
import { AtualizarAnamnese } from "./controllers/atualiza-anamnese.js"
import { AtualizarPaciente } from "./controllers/atualiza-paciente.js"
import { AtualizarAgendamento } from "./controllers/atualizar-agendamento.js"
import { AtualizarPodologo } from "./controllers/atualizar-podologo.js"
import { CadastroAgendamento } from "./controllers/cadastra-agendamento.js"
import { CadastroAnamnese } from "./controllers/cadastra-anamnese.js"
import { CadastroPaciente } from "./controllers/cadastra-paciente.js"
import { CadastroPodologo } from "./controllers/cadastro-podologo.js"
import { ListaAgendamento } from "./controllers/lista-agendamento.js"
import { ListaAnamnese } from "./controllers/lista-anamnese.js"
import { ListaPaciente } from "./controllers/lista-paciente.js"
import { ListaPodologo } from "./controllers/lista-podologo.js"
import {Router} from 'express'
import { LoginPodologoController } from "./controllers/login-podologo.js"
import { adaptRoute } from './adapter/express-router.js'

export const router = () => {
    const router = Router()
    router.post('/login', adaptRoute(new LoginPodologoController()))
    const auth = (req, res, next) => {
        try {
            if (!req.headers['authorization']) {
                res.status(401).json({message: 'usuário não possui token'})
                return res
            }
            const token = req.headers['authorization'];
            const rawToken = token.replace("Bearer ", "")
            const result = jwt.verify(rawToken, 'secret')
            next()
        } catch (error) {
            res.status(401).json({message: error.message})
            return res
        }
    }

    router.post('/podologo', auth, (req, res) => {
        const cadastroPodologo = new CadastroPodologo()
        return cadastroPodologo.store(req, res)
    })

    router.get('/podologo', auth, (req, res) => {
        const listaPodologo = new ListaPodologo()
        return listaPodologo.list(req, res)
    })

    router.put('/podologo/:id?', auth, (req, res) => {
        const atualizar = new AtualizarPodologo()
        return atualizar.update(req, res)
    })

    router.post('/paciente', auth, (req, res) => {
        const cadastroPaciente = new CadastroPaciente()
        return cadastroPaciente.store(req, res)
    })

    router.get('/paciente', auth, (req, res) => {
        const listaPaciente = new ListaPaciente()
        return listaPaciente.list(req, res)
    })

    router.put('/paciente/:id?', auth, (req, res) => {
        const atualizar = new AtualizarPaciente()
        return atualizar.update(req, res)
    })

    router.post('/anamnese', auth, (req, res) => {
        const cadastroAnamnese = new CadastroAnamnese()
        return cadastroAnamnese.store(req, res)
    })

    router.get('/anamnese', auth, (req, res) => {
        const listaAnamnese = new ListaAnamnese()
        return listaAnamnese.list(req, res)
    })

    router.put('/anamnese/:id?', auth, (req, res) => {
        const atualizar = new AtualizarAnamnese()
        return atualizar.update(req, res)
    })

    router.post('/agendamento', auth, (req, res) => {
        const cadastroAgendamento = new CadastroAgendamento()
        return cadastroAgendamento.store(req, res)
    })

    router.get('/agendamento', auth, (req, res) => {
        const listaAgendamento = new ListaAgendamento()
        return listaAgendamento.list(req, res)
    })

    router.put('/agendamento/:id?', auth, (req, res) => {
        const atualizar = new AtualizarAgendamento()
        return atualizar.update(req, res)
    })
    
    return router
}