import { getRepository } from 'typeorm';

import Contact from '../models/Contact';
import Customer from '../models/Customer';

interface Request {
  name: string;
  contacts: Array<Contact>[];
}

class CreateCustomerService {
  public async execute({ name, contacts }: Request): Promise<Customer> {
    const customersRepository = getRepository(Customer);
    const contactsRepository = getRepository(Contact);

    const customer = customersRepository.create({
      name,
      debt: true,
    });

    await customersRepository.save(customer);

    const contactsAddCustomerId = contacts.map(contact => ({
      ...contact,
      customer_id: customer.id,
    }));

    const customerContacts = contactsRepository.create(contactsAddCustomerId);

    await contactsRepository.save(customerContacts);

    customer.contacts = customerContacts;

    return customer;
  }
}

export default CreateCustomerService;
