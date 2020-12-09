import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { motion } from 'framer-motion';
// import { Button } from '@material-ui/core';
// import { Form } from '@unform/web';
// import { FormHandles } from '@unform/core';
// import * as Yup from 'yup';
import { FiX } from 'react-icons/fi';
// import { FaFutbol } from 'react-icons/fa';
// import Loading from '../../components/Loading';
// import getValidationErrors from '../../utils/getValidationErrors';
// import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { Content, PlayersContainer, GoalsContainer } from './styles';
// import Input from '../../components/Input';
import Button from '../../components/Button';
import { IPlayerDTOs } from '../../dto/IPlayersDTO';

interface CreateGameFormData {
  player1: string;
  player2: string;
  goals_player1: number;
  goals_player2: number;
}

const Game: React.FC = () => {
  // const formRef = useRef<FormHandles>(null);
  // const { addToast } = useToast();
  const [players, setPlayers] = useState<IPlayerDTOs[]>([]);
  const [getPlayer1, setPlayer1] = useState<any>({});
  const [getPlayer2, setPlayer2] = useState<any>({});
  const [goalPlayer1, setGoalPlayer1] = useState(0);
  const [goalPlayer2, setGoalPlayer2] = useState(0);

  useEffect(() => {
    api.get(`/players`).then(response => {
      setPlayers(response.data);
    });
  }, []);

  const handleSubmit = useCallback(() => {
    console.log(getPlayer1);
    console.log(getPlayer2);
    console.log(goalPlayer1);
    console.log(goalPlayer2);
  }, [getPlayer1, getPlayer2, goalPlayer1, goalPlayer2]);

  return (
    <Content>
      <div className="title">Create Game</div>
      <PlayersContainer>
        <Autocomplete
          freeSolo
          fullWidth
          id="player1"
          disableClearable
          options={players}
          renderOption={option => <>{option.name}</>}
          getOptionLabel={option => option.name}
          onChange={(event, newValue) => setPlayer1(newValue)}
          renderInput={params => (
            <TextField
              {...params}
              label="Player 1"
              margin="normal"
              variant="outlined"
              name="player1"
              InputProps={{ ...params.InputProps, type: 'search' }}
              required
            />
          )}
        />
        <FiX size={60} />
        <Autocomplete
          freeSolo
          fullWidth
          id="player2"
          disableClearable
          options={players}
          renderOption={option => <>{option.name}</>}
          getOptionLabel={option => option.name}
          onChange={(event, newValue) => setPlayer2(newValue)}
          renderInput={params => (
            <TextField
              {...params}
              label="Player 2"
              margin="normal"
              variant="outlined"
              name="player2"
              InputProps={{ ...params.InputProps, type: 'search' }}
              required
            />
          )}
        />
      </PlayersContainer>
      <GoalsContainer>
        <TextField
          fullWidth
          className="text-field"
          name="goals_player1"
          label="Goals player 1"
          variant="outlined"
          type="number"
          onChange={event => setGoalPlayer1(Number(event.target.value))}
        />
        <FiX size={60} />
        <TextField
          fullWidth
          className="text-field"
          name="goals_player2"
          label="Goals player 2"
          variant="outlined"
          type="number"
          onChange={event => setGoalPlayer2(Number(event.target.value))}
        />
      </GoalsContainer>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
        <Button onClick={handleSubmit}>Save</Button>
      </motion.div>
    </Content>
  );
};

export default Game;
