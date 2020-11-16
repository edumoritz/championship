import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import { injectable } from 'tsyringe';
import IGamesRepository from '../repositories/IGamesRepository';
import Game from '../infra/typeorm/entities/Games';
import ICreateGameDTO from '../dtos/ICreateGameDTO';
import IScoresRepository from '@modules/scores/repositories/IScoresRepository';

@injectable()
class CreateGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) { }

  public async execute(game: ICreateGameDTO): Promise<Game> {
    const { 
      player1, 
      player2, 
      goals_player1, 
      goals_player2, 
    } = game;
    

    const getScore1 = await this.scoresRepository.findByPlayerId(String(player1))
    const getScore2 = await this.scoresRepository.findByPlayerId(String(player2))

    

    if(getScore1 && getScore2) {

      getScore1.games = getScore1.games + 1;
      getScore2.games = getScore2.games + 1;

      if (goals_player1 > goals_player2) {
        getScore1.points = getScore1.points + 3;
        getScore1.wins = getScore1.wins + 1;
        getScore2.loss = getScore2.loss + 1;
      } else if (goals_player1 === goals_player2) {
        getScore1.ties = getScore1.ties + 1;
        getScore2.ties = getScore2.ties + 1;
      }
      else {
        getScore2.points = getScore2.points + 3;
        getScore2.wins = getScore2.wins + 1;
        getScore1.loss = getScore1.loss + 1;
      }      
      
      getScore1.goal_pro = getScore1.goal_pro + goals_player1;
      getScore2.goal_pro = getScore2.goal_pro + goals_player2;
      getScore1.goal_against = getScore1.goal_against + goals_player2 ? goals_player2 : 0;
      getScore2.goal_against = getScore2.goal_against + goals_player1 ? goals_player1 : 0;
      
      getScore1.goal_difference = getScore1.goal_pro - getScore1.goal_against;
      getScore2.goal_difference = getScore2.goal_pro - getScore2.goal_against;
    
      if (getScore1.points > 0 && getScore2.points > 0) {
        getScore1.utilization = (getScore1.points / (getScore1.games * 3)) * 100;
        getScore2.utilization = (getScore2.points / (getScore2.games * 3)) * 100;
      }      

      try {
        this.scoresRepository.save(getScore1);
        this.scoresRepository.save(getScore2); 
      } catch {
        throw new AppError('Save Score Error.');
      }          
      
    } else {
      throw new AppError('Scores not found.');
    }

    const gameRepo = await this.gamesRepository.create({ ...game });

    console.log('3') 
    return gameRepo;
  }
}

export default CreateGameService;