import { AppDataSource } from "../app-data-source.js"
import { PodologoSchema } from "../schema/podologo.js"

export class AtualizarPodologo{
    async update(req, res) {
        try {
            const id = req.params?.id
            const body = req.body
            const podologoRepository = AppDataSource.getRepository(PodologoSchema)
            const result = await podologoRepository.update( id,{...body})
            if(result?.affected === 1) {
                const podologo = await podologoRepository.find(id)
                return res.status(201).json(podologo)
            }else {
                res.status(400).json({message: "Houve um erro ao atualizar"})
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}