import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Customer from '../models/Customer';
import CreateCustomerService from '../services/CreateCustomerService';

const customersRouter = Router();

customersRouter.get('/', async (request: Request, response: Response) => {
  const customersRepository = getRepository(Customer);

  const customers = await customersRepository.find();

  return response.json({ customers });
});

customersRouter.post('/', async (request: Request, response: Response) => {
  const { name, contacts } = request.body;
  const createCustomerService = new CreateCustomerService();

  const customer = await createCustomerService.execute({ name, contacts });

  return response.json({ customer });
});

export default customersRouter;
