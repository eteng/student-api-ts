# Problem Statement
Write a simple NodeJS Express application with TypeScript, making use of classes, interfaces, generics, and Inversion of Control as follows: 
- This application will maintain a single entity (and database table), namely, Student. You can decide what fields your student entity should have 
- Provide two endpoints, one to create a book, and one to search students (support filtering by at least one of the entity properties, for instance, age; also support pagination, sorting and ordering, on the server side). 
- Use any ORM of choice to implement data schema and migrations 
- A simple working piece of software may not be enough; apply design concepts, architectural principles and best practices to the best of your understanding to boost your chances. 
- Write and run positive and negative unit tests for your repository and service methods.  
- Write end-to-end tests to automate API calls, covering positive and negative scenarios 

Your application should be able to run and accept (Postman) HTTP requests, and provide centralized error handling. Implement a simple dependency tree, and only inject interfaces into dependent layers.

## Get started

```
docker-compose up --build
curl -H 'Content-Type: application/json'  -d '{"firstName":"sam", "lastName":"wise", "age":7 }' http://localhost:3000/api/v1/students
```