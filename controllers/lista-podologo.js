import { AppDataSource } from "../app-data-source.js"
import { PodologoSchema } from "../schema/podologo.js"

export class ListaPodologo{
    async list(req, res) {
        const podologoRepository = AppDataSource.getRepository(PodologoSchema)
        const podologos = await podologoRepository.find()
        return res.json(podologos)
    }
}