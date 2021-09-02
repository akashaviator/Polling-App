import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Poll } from "../entity";
import {
  getPolls,
  createPoll,
  IPollPayload,
  getpollByID,
} from "../repositories/poll";

@Route("polls")
@Tags("Poll")
export default class PollController {
  @Get("/")
  public async getPolls(): Promise<Array<Poll>> {
    return getPolls();
  }

  @Post("/")
  public async createPoll(@Body() body: IPollPayload): Promise<Poll> {
    return createPoll(body);
  }

  @Get("/:id")
  public async getPoll(@Path() id: string): Promise<Poll | null> {
    return getpollByID(Number(id));
  }
}
