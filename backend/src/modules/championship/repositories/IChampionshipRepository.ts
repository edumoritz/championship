import Championship from '@modules/championship/infra/typeorm/entities/Championship';
import ICreateChampionshipDTO from '../dtos/ICreateChampionshipDTO';

export default interface IChampionshipRepository {
  create(data: ICreateChampionshipDTO): Promise<Championship>;
}
