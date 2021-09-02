import { Get, Post, Body, Path, Route, Tags } from "tsoa";
import { castVote } from "../repositories/option";

@Route("option")
@Tags("Option")
export default class OptionController {
  @Get("/:id")
  public async castVote(@Path() id: string) {
    return castVote(Number(id));
  }
}
