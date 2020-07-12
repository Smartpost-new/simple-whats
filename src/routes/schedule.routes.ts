import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Schedule from '../models/Schedule';
import CreateScheduleService from '../services/CreateScheduleService';
import Customer from '../models/Customer';
import SendMessageService from '../services/SendMessageService';

const scheduleRouter = Router();

scheduleRouter.get('/', async (request: Request, response: Response) => {
  const schedulesRepository = getRepository(Schedule);

  const schedules = await schedulesRepository.find();

  return response.json(schedules);
});

scheduleRouter.post('/', async (request: Request, response: Response) => {
  const { message, type, customers } = request.body;

  const createScheduleService = new CreateScheduleService();

  const schedule = await createScheduleService.execute({
    message,
    customers,
    type,
  });

  return response.json({ schedule });
});

scheduleRouter.post('/send', async (request: Request, response: Response) => {
  const { body, customers } = request.body;

  const customersRepository = getRepository(Customer);

  const fullCustomers = await customersRepository.find(customers);

  const sendMessageService = new SendMessageService();

  const [customersContacts] = fullCustomers.map(customer =>
    customer.contacts.map(contact => contact.phone),
  );

  customersContacts.forEach(phone => {
    sendMessageService.execute({
      phone,
      body,
    });
  });

  return response.json({ message: 'Running messaging' });
});

export default scheduleRouter;
