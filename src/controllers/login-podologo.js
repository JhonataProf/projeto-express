import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppDataSource } from "../app-data-source.js"
import { PodologoSchema } from "../schema/podologo.js"

export class LoginPodologoController {

    async login(req, res) {
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
                return res.status(200).json({message: 'usuário logado', token: bearer})
            } else {
                return res.status(401).json({message: 'não foi possivel realizar login'})
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}