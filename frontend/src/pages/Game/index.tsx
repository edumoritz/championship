import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { motion } from 'framer-motion';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { TextField } from 'unform-material-ui';
import * as Yup from 'yup';
import { FiX } from 'react-icons/fi';
// import Loading from '../../components/Loading';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { Content, PlayersContainer, GoalsContainer } from './styles';
import Button from '../../components/Button';
import { IPlayerDTO } from '../../dto/IPlayersDTO';

interface CreateGameFormData {
  player1: string;
  player2: string;
  goals_player1: number;
  goals_player2: number;
}

const Game: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [players, setPlayers] = useState<IPlayerDTO[]>([]);
  const [getPlayer1, setPlayer1] = useState('');
  const [getPlayer2, setPlayer2] = useState('');

  const handleSubmit = useCallback(
    async (data: CreateGameFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          player1: Yup.string().required('player1 is required'),
          player2: Yup.string().required('player2 is required'),
          goals_player1: Yup.string().required('goals player1 is required'),
          goals_player2: Yup.string().required('goals player2 is required'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const body = {
          ...data,
          player1: getPlayer1,
          player2: getPlayer2,
        };
        // console.log(body);
        await api.post('/games', body);

        addToast({
          type: 'success',
          title: 'Game Registered!',
          description: 'The game was successfully registred!',
        });
        formRef.current?.reset();
        // formRef.current?.clearField('player1');
        // formRef.current?.clearField('player2');
        setPlayer1('');
        setPlayer2('');
        history.push('/scores');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        const { message } = err.response.data;

        addToast({
          type: 'error',
          title: 'Error',
          description:
            message || 'An error occurred while registering the game',
        });
      }
    },
    [history, addToast, getPlayer1, getPlayer2],
  );

  useEffect(() => {
    api.get(`/players`).then(response => {
      setPlayers(response.data);
    });
  }, []);

  const handleChange = useCallback((data: IPlayerDTO, player: number) => {
    if (player === 1) setPlayer1(data.id);
    else setPlayer2(data.id);
  }, []);

  return (
    <Content>
      <div className="title">
        <strong>Create Game</strong>
      </div>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <PlayersContainer>
          <Autocomplete
            freeSolo
            fullWidth
            id="player1"
            disableClearable
            options={players}
            renderOption={option => <>{option.name}</>}
            getOptionLabel={option => option.name}
            onChange={(event, value) => handleChange(value as IPlayerDTO, 1)}
            renderInput={params => (
              <TextField
                {...params}
                label="Player 1"
                margin="normal"
                variant="outlined"
                name="player1"
                InputProps={{ ...params.InputProps, type: 'search' }}
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
            onChange={(event, value) => handleChange(value as IPlayerDTO, 2)}
            renderInput={params => (
              <TextField
                {...params}
                label="Player 2"
                margin="normal"
                variant="outlined"
                name="player2"
                InputProps={{ ...params.InputProps, type: 'search' }}
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
            InputProps={{ inputProps: { min: 0 } }}
          />
          <FiX size={60} />
          <TextField
            fullWidth
            className="text-field"
            name="goals_player2"
            label="Goals player 2"
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
        </GoalsContainer>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.5 }}>
          <Button type="submit">Save</Button>
        </motion.div>
      </Form>
    </Content>
  );
};

export default Game;
