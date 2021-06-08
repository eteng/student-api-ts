import { Router, Response, Request, NextFunction } from "express";
import { inject } from "inversify"; // import service
import { Repository } from "typeorm";
import { Student } from "../entity/student";
import { TYPES } from "../types";
import container from "../container"
import { checkSchema, body, validationResult} from 'express-validator'
import { IQuery, IStudentService } from "../interfaces/istudent.service";


export class StudentController {
  public router: Router;
  ///@inject(TYPES.StudentRepository) private studentRepository: Repository<Student>

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const student = req['body'] as Student;
    const studentService = container.get<IStudentService>(TYPES.StudentService)
    const newStudent = await studentService.save(student);
    res.send(newStudent);
  }

  public async list(req: Request, res: Response) {

    const limit_ = 5;
    
    // pagination
    let limit = Number(req.query.limit) || limit_;
    let page = Number(req.query.page) || 1;

    const options:IQuery = {
      pagination: {page, limit}
    };

    if (req.query.q){
      options.search = req.query.q as string;
    }

    const studentService = container.get<IStudentService>(TYPES.StudentService);

    const pagedData =  await studentService.find(options);

    const lastPage=Math.ceil(pagedData.count/limit);
    const nextPage=page+1 >lastPage ? null :page+1;
    const prevPage=page-1 < 1 ? null :page-1;
    return res.json({
      statusCode: 'success',
      data: [...pagedData.data],
      count: pagedData.count,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    });
  }

  /**
   * Configure the routes of controller
   */
   public routes(){
    this.router.get('/', this.list);
    this.router.post('/', checkSchema({
      age: {
        isInt: true,
        toInt: true,
      },
      firstName: {
        isUppercase: {
          negated: true,
        },
      },
      lastName: {
        isUppercase: {
          negated: true,
        },
      },
    }), this.create);
  }

}