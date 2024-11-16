import { Router } from "express"

const routes = Router();

routes.use('/', (req, res) => {
  res.send('Users API');
})

export default routes;