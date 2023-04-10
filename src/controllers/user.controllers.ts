import 'reflect-metadata';
import {Container, Service} from "typedi";
import {UserRepository} from "../repositories/UserRepo";
import {Get, Hidden, Query, Route, SuccessResponse} from "tsoa";

@Route("users")
export class UserControllers {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = Container.get(UserRepository);
  }

  @Get("/")
  @SuccessResponse("200", "Created")
  public async index(@Query() normalParam: string,
                     @Query() @Hidden() defaultSecret = true,
                     @Query() @Hidden() optionalSecret?: string) {
    const users = this.userRepository.getUsers();
    return users;
  }
}