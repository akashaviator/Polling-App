import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import bcrypt from "bcrypt";

import { User } from "../entity";
import {
  getUsers,
  createUser,
  IUserPayload,
  // getUserByID,
  getUserByEmail,
} from "../repositories/user";

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return getUsers();
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    //console.log(body);
    body.password = await bcrypt.hash(body.password, 10);
    return createUser(body);
  }
  /*
  @Get("/:id")
  public async getUserByID(@Path() id: string): Promise<User | null> {
    return getUserByID(Number(id));
  }
*/
  @Get("/:email")
  public async getUserByEmail(@Path() email: string): Promise<User | null> {
    return getUserByEmail(String(email));
  }
}
