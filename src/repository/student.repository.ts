import { EntityRepository, Repository, getConnection } from "typeorm";
import { Student } from "../entity/student";

export function getRepository() {
    const conn = getConnection();
    const studentRepository = conn.getRepository(Student);
    return studentRepository;
}

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {

}