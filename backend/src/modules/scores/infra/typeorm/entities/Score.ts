import Player from '@modules/players/infra/typeorm/entities/Player';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('scores')
class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column()
  points: number;

  @Column()
  games: number;

  @Column()
  wins: number;

  @Column()
  loss: number;

  @Column()
  ties: number;

  @Column()
  goal_pro: number;

  @Column()
  goal_against: number;

  @Column()
  goal_difference: number;

  @Column('decimal', { precision: 12, scale: 2 })
  utilization: number;
}

export default Score;
