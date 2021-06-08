import "reflect-metadata";
import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import logger from './utils/logger';// import the post controller
import { getDbConnection } from "./db"
import { StudentController } from './controllers/student.controller';


export class Server {
  private app: express.Application;

  constructor(){
    this.app = express(); // init the application
    this.configuration();
    this.customizeError();
    this.routes();
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment 
   * variables it takes the default port 3000
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json());
    //this.app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))
    this.app.use(morgan("tiny"));
  }

  /**
   * error customization, for invalid request
   */
  public customizeError(){
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status).json({
        error: {
          type: 'request_validation',
          message: err.message,
          errors: err.errors
        }
      })
    })
  }

  /**
   * Method to configure the routes
   */
  public async routes(){
    await getDbConnection();

    this.app.get( "/", (req: Request, res: Response ) => {
      res.send( "ok!" );
    });

    this.app.use('/api/v1/students', (new StudentController()).router);

  }

  /**
   * Used to start the server
   */
  public start(){
    this.app.listen(this.app.get('port'), () => {
      logger.info(`Server listening on port ${this.app.get('port')}!`);
    });
  }

  public get App(){
      return this.app
  }
}

