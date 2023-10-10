import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions = {
  methods: ['DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT'],
  origin: '*',
};
