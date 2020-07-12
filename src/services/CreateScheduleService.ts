import { getRepository } from 'typeorm';

import Schedule from '../models/Schedule';

interface Request {
  message: string;
  type: 'daily' | 'weekly';
  customers: string[];
}

class CreateScheduleService {
  public async execute({
    message,
    type,
    customers,
  }: Request): Promise<Schedule> {
    const schedulesRepository = getRepository(Schedule);

    const customersId = customers.map(customer => ({ id: customer }));

    const schedule = schedulesRepository.create({
      message,
      type,
      customers: customersId,
    });

    await schedulesRepository.save(schedule);

    return schedule;
  }
}

export default CreateScheduleService;
