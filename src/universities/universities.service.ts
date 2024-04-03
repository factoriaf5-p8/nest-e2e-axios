import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { University } from './entities/university.entity';
import {Observable, map} from 'rxjs';

@Injectable()
export class UniversitiesService {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  findAll():Observable<University[]> {
    return this.httpService.get<University[]>(process.env.UNIVERSITIES_BASE_URL).pipe(
      map(response=>response.data));
  }

}
