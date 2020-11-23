import Championship from '@modules/championship/infra/typeorm/entities/Championship';
import { getRepository, Repository } from 'typeorm';

import IChampionshipRepository from '@modules/championship/repositories/IChampionshipRepository';
import ICreateChampionshipDTO from '@modules/championship/dtos/ICreateChampionshipDTO';

class ChampionshipRepository implements IChampionshipRepository {
  private ormRepository: Repository<Championship>;

  constructor() {
    this.ormRepository = getRepository(Championship);
  }

  public async create({ name }: ICreateChampionshipDTO): Promise<Championship> {
    const newChamp = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(newChamp);

    return newChamp;
  }
}
export default ChampionshipRepository;
