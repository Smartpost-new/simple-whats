import { Router } from 'express';

import customersRouter from './customer.routes';
import scheduleRouter from './schedule.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/schedules', scheduleRouter);

export default routes;
