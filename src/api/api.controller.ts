import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiService } from './api.service';
import { Request, Response } from 'express';
import * as fs from 'fs';

interface BodyType {
  log: string;
}

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  async get() {
    return 'works';
  }

  @Post()
  async post(
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: BodyType,
  ) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );

    const timestamp = new Date().toLocaleTimeString('ru-RU', { hour12: false });
    const logEntry = `${timestamp} - ${body.log}\n`;

    console.log(logEntry);
    fs.appendFile('log.txt', logEntry, (err) => {
      if (err) console.error('Ошибка записи в файл:', err);
    });
  }
}

// ngrok http --host-header=rewrite 3000
