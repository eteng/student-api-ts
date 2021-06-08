import { injectable } from 'inversify';
import { getConnection, Like } from 'typeorm';
import { print } from 'util';
import { Student } from '../entity/student';
import { IStudent } from '../interfaces/istudent';
import { IQuery, IStudentService, } from '../interfaces/istudent.service';
import { IPaginated } from '../interfaces/results';
import { StudentRepository } from '../repository/student.repository';
import logger from '../utils/logger';


@injectable()
export class StudentService implements IStudentService {
  private studentRepository: StudentRepository;

  private searchFields = ['firstName','lastName'];
  private orderFields = ['create_at'];
  private sortFields =  ['age'];
  

  constructor(){
    this.studentRepository = getConnection("api").getCustomRepository(StudentRepository);
  }

  public async find(options: IQuery): Promise<IPaginated<IStudent>>{
    let params = {};

    if (options.search){
      params['where'] = this.searchFields.map(element => {
        let obj = {}
        obj[element] = Like("%"+ options.search+"%");
        return obj 
      });
    }

    params['take'] = options.pagination.limit
    params['skip'] = (options.pagination.page-1) * options.pagination.limit;

    const [students, count] = await this.studentRepository.findAndCount(params)
    return {data: students, count: count };
  } 

  public async save(student: IStudent){
    const newstudent = await this.studentRepository.save(student);
    return newstudent;
  } 

}