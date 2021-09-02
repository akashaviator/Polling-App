import { getRepository } from "typeorm";
import { Option, Poll } from "../entity";

export const castVote = async (id: number) => {
  const optionRepository = getRepository(Option);
  const pollRepository = getRepository(Poll);
  const option = await optionRepository.findOne({
    where: { id: id },
    //relations: ["poll"],
  });
  //const poll = await pollRepository.findOne({ id: option.poll.id });
  option.votes++;

  await optionRepository.save(option);
};
