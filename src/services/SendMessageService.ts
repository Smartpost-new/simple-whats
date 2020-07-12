import axios from 'axios';

interface Request {
  phone: string;
  body: string;
}

class SendMessageService {
  public async execute({ phone, body }: Request): Promise<void> {
    const message = { phone, body };

    const api_url = process.env.API_URL || '';

    await axios.post(api_url, message);
  }
}

export default SendMessageService;
