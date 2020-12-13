import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IScoresRepository from '@modules/scores/repositories/IScoresRepository';
import ICreateScoreDTO from '@modules/scores/dtos/ICreateScoreDTO';
import IGamesRepository from '../repositories/IGamesRepository';
import Game from '../infra/typeorm/entities/Games';
import ICreateGameDTO from '../dtos/ICreateGameDTO';

@injectable()
class CreateGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) {}

  public async execute(game: ICreateGameDTO): Promise<Game> {
    const { player1, player2, goals_player1, goals_player2 } = game;

    const goalsPlayer1 = Number(goals_player1);
    const goalsPlayer2 = Number(goals_player2);

    const getScore1 = await this.scoresRepository.findByPlayerId(
      String(player1),
    );
    const getScore2 = await this.scoresRepository.findByPlayerId(
      String(player2),
    );

    if (getScore1 && getScore2) {
      getScore1.games += 1;
      getScore2.games += 1;

      if (goalsPlayer1 > goalsPlayer2) {
        getScore1.points += 3;
        getScore1.wins += 1;
        getScore2.loss += 1;
      } else if (goalsPlayer1 === goalsPlayer2) {
        getScore1.ties += 1;
        getScore2.ties += 1;
      } else {
        getScore2.points += 3;
        getScore2.wins += 1;
        getScore1.loss += 1;
      }

      getScore1.goal_pro += goalsPlayer1;
      getScore2.goal_pro += goalsPlayer2;
      getScore1.goal_against =
        getScore1.goal_against + goalsPlayer2 ? goalsPlayer2 : 0;
      getScore2.goal_against =
        getScore2.goal_against + goalsPlayer1 ? goalsPlayer1 : 0;

      getScore1.goal_difference = getScore1.goal_pro - getScore1.goal_against;
      getScore2.goal_difference = getScore2.goal_pro - getScore2.goal_against;

      if (getScore1.points > 0 && getScore2.points > 0) {
        getScore1.utilization =
          (getScore1.points / (getScore1.games * 3)) * 100;
        getScore2.utilization =
          (getScore2.points / (getScore2.games * 3)) * 100;
      } else if (getScore1.points > 0 && getScore2.points <= 0) {
        getScore1.utilization = 100;
      } else if (getScore2.points > 0 && getScore1.points <= 0) {
        getScore2.utilization = 100;
      }

      getScore1.updated_at = new Date();
      getScore2.updated_at = new Date();

      if (getScore1.points > 60 || getScore2.points > 60) {
        const scores = await this.scoresRepository.findAll();

        try {
          if (scores && scores.length > 0) {
            scores.map(async score => {
              const findScore = await this.scoresRepository.findById(score.id);
              if (findScore) {
                findScore.closed_at = new Date();
                this.scoresRepository.save(findScore);

                const newScore: ICreateScoreDTO = {
                  games: 0,
                  goal_against: 0,
                  goal_difference: 0,
                  goal_pro: 0,
                  loss: 0,
                  points: 0,
                  ties: 0,
                  utilization: 0,
                  wins: 0,
                  created_at: new Date(),
                  updated_at: new Date(),
                  player: score.player,
                };
                this.scoresRepository.create(newScore);
              }
            });
          }
        } catch {
          throw new AppError('Close Scores Error.');
        }
      } else {
        try {
          this.scoresRepository.save(getScore1);
          this.scoresRepository.save(getScore2);
        } catch {
          throw new AppError('Save Score Error.');
        }
      }
    } else {
      throw new AppError('Scores not found.');
    }

    const gameRepo = await this.gamesRepository.create({ ...game });

    return gameRepo;
  }
}

export default CreateGameService;
