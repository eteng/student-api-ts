import { Container } from 'inversify';
import { TYPES } from './types';
import { IStudentService } from './interfaces/istudent.service';
import { StudentService } from './services/student.service';


const container = new Container();
container.bind<IStudentService>(TYPES.StudentService).to(StudentService);
export default container;