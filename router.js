import { AtualizarPodologo } from "./controllers/atualizar-podologo.js"
import { CadastroPodologo } from "./controllers/cadastro-podologo.js"
import { ListaPodologo } from "./controllers/lista-podologo.js"

export const router = (express) => {
    const router = express.Router()

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })

    router.post('/podologo', (req, res) => {
        const cadastroPodologo = new CadastroPodologo()
        return cadastroPodologo.store(req, res)
    })

    router.get('/podologo', (req, res) => {
        const listaPodologo = new ListaPodologo()
        return listaPodologo.list(req, res)
    })

    router.put('/podologo/:id?', (req, res) => {
        const atualizar = new AtualizarPodologo()
        return atualizar.update(req, res)
    })
    return router
}