import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppDataSource } from "../app-data-source.js"
import { PodologoSchema } from "../schema/podologo.js"
import { ok, serverError, unauthorizer } from '../helper/index.js'

export class LoginPodologoController {

    async handle(req) {
        try {
            const body = req.body
            const podologoRepository = AppDataSource.getRepository(PodologoSchema)
            const podologo = await podologoRepository.findOne({
                where: {
                    email: body.email
                }
            })
            const senhaCompare = await bcrypt.compare(body.senha, podologo.senha)

            if(senhaCompare) {
                const bearer = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: {nome: podologo.nomeCompleto, email: podologo.email}
                  }, 'secret')
                return ok({message: 'usuário logado', token: bearer})
            } else {
                return unauthorizer({message: 'não foi possivel realizar login'})
            }
        } catch (error) {
            return serverError(error.message)
        }
    }
}