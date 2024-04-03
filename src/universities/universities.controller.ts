import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniversitiesService } from './universities.service';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}


  @Get()
  findAll() {
    return this.universitiesService.findAll();
  }

}
