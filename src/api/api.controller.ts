import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  async get() {
    return 'works';
  }

  @Post()
  async post(@Body() body: string) {
    console.log(body);
  }
}
