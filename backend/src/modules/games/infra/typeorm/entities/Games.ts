import Player from '@modules/players/infra/typeorm/entities/Player';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('games')
class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player1' })
  player1: Player;

  @OneToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player2' })
  player2: Player;

  @Column()
  goals_player1: number;

  @Column()
  goals_player2: number;

  @CreateDateColumn()
  created_at: Date;
}

export default Game;
