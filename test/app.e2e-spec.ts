import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UniversitiesService } from '../src/universities/universities.service';
import { University } from '../src/universities/entities/university.entity';
import { of } from 'rxjs';
import { HttpService } from '@nestjs/axios';

const data: University[] = [
  {
    name: 'University of Lalaland',
    alpha_two_code: 'LU',
    'state-province': null,
    domains: ['uni.ll'],
    country: 'Lalaland',
    web_pages: ['http://www.uni.ll/']
  },
  {
    name: 'International Institute of Advanced Misanthropolgy',
    alpha_two_code: 'LL',
    'state-province': null,
    domains: ['iiam.ll'],
    country: 'Lalaland',
    web_pages: ['http://www.iiam.ll/']
  },
];

describe('AppController (e2e)', () => {
  let app: INestApplication;
  // const httpService: HttpService = {
  //   get: jest.fn().mockImplementation(() => of({
  //     data,
  //     headers: {},
  //     config: {
  //       url: 'http//mock.url',
  //       headers: undefined,
  //     },
  //     status: 200,
  //     statusText: 'OK',
  //   })),
  // };

  const universitiesService = {
    findAll: jest.fn().mockImplementation(() => of(data)),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(UniversitiesService)
      // .useValue(universitiesService)
      .overrideProvider(HttpService)
      .useValue({
        get: jest.fn().mockImplementation(() => of({
          data,
          headers: {},
          config: {
            url: 'http//mock.url',
            headers: undefined,
          },
          status: 200,
          statusText: 'OK',
        })),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/universities')
      .expect(200)
      .expect(data);
  });
});
