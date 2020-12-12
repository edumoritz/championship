import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { IPlayerDTOs } from '../../dto/IPlayersDTO';

interface CreateGameFormData {
  player1: string;
  player2: string;
  goals_player1: number;
  goals_player2: number;
}

const Game: React.FC = () => {
  const { addToast } = useToast();
  const [players, setPlayers] = useState<IPlayerDTOs[]>([]);
  const formRef = useRef<FormHandles>(null);

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
        console.log(data);
        const response = await api.post('/games', data);
        console.log(response);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Error',
          description: 'An error occurred while ...',
        });
      }
    },
    [addToast],
  );

  useEffect(() => {
    api.get(`/players`).then(response => {
      setPlayers(response.data);
    });
  }, []);

  return (
    <Content>
      <div className="title">Create Game</div>
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
          />
          <FiX size={60} />
          <TextField
            fullWidth
            className="text-field"
            name="goals_player2"
            label="Goals player 2"
            variant="outlined"
            type="number"
          />
        </GoalsContainer>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
          <Button type="submit">Save</Button>
        </motion.div>
      </Form>
    </Content>
  );
};

export default Game;
