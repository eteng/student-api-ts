import * as SudentSvc from './student.service';
import {getDbConnection} from '../db'


beforeAll(async () => {
    // @todo: set-up test db
    await getDbConnection()
})

describe('Stiudent service unit tests', () => {
    describe('find', () => {
      test('Should find student records', async () => {
       

        const userInput= {
        fullname: 'User Unit Test',
        email: 'test@example.com',
        };

        const studentService = new SudentSvc.StudentService();
        const paginatedResult = await studentService.find({'pagination':{
            page:1,
            limit: 5
        }})


        expect(paginatedResult.count).toBeDefined();
        expect(paginatedResult.data).toBeDefined();

       });
    })

})


