

// export const bindings = new AsyncContainerModule(async (bind) => {
//     await getDbConnection();
//     await require("./controllers/student.controller");
//     bind<Repository<Student>>(TYPES.StudentRepository).toDynamicValue(() => {
//         return getRepository();
//     }).inRequestScope();
// });

=== test..spyon
// describe("StudentController", () => {
//     describe("list", () => {
//         test("should return empty array", async () => {
//             const spy = jest.spyOn(SudentSvc, "find").mockResolvedValue([]);
//             const controller = new StudentController();
//             const students = await controller.list();
//             expect(students).toEqual([]);
//             expect(spy).toHaveBeenCalledWith();
//             expect(spy).toHaveBeenCalledTimes(1);
//             spy.mockRestore();
//         });
//     })
// })
