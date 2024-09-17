import { Router } from 'express';
import {UpdateTask, createTask, getAllTask, removeTask} from '../controllers/todoController'
export const mainRouter = Router();

mainRouter.post('/todo',createTask)
mainRouter.get('/todo',getAllTask)
mainRouter.put('/todo',UpdateTask)
mainRouter.delete('/todo/:id',removeTask)