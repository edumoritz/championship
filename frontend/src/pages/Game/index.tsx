import React, { useCallback, useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
// import { FiUserPlus } from 'react-icons/fi';
import { FaFutbol } from 'react-icons/fa';
// import Loading from '../../components/Loading';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { Container, Content, FormContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { IPlayerDTOs } from '../../dto/IPlayersDTO';

interface CreateGameFormData {
  player1: string;
  player2: string;
  goals_player1: number;
  goals_player2: number;
}

const Game: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [players, setPlayers] = useState<IPlayerDTOs[]>([]);
  const [getPlayer1, setPlayer1] = useState<any>({});
  const [getPlayer2, setPlayer2] = useState<any>({});

  useEffect(() => {
    api.get(`/players`).then(response => {
      setPlayers(response.data);
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: CreateGameFormData) => {
      const newData = {
        ...data,
        player1: getPlayer1.id,
        player2: getPlayer2.id,
      };
      try {
        formRef.current?.setErrors({});
        // console.log(data);
        // console.log(player1);

        const schema = Yup.object().shape({
          player1: Yup.string().required('Player 1 is required'),
          player2: Yup.string().required('Player 2 is required'),
          goals_player1: Yup.string().required(
            'Goals from player1 is required',
          ),
          goals_player2: Yup.string().required(
            'Goals from player2 is required',
          ),
        });
        await schema.validate(newData, {
          abortEarly: false,
        });
        console.log(newData);
        // await api.post('/games', data);

        addToast({
          type: 'success',
          title: 'Saved game!',
          description: 'You can see the updated score.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Saved game error',
          description: 'An error occurred while saving the game.',
        });
      }
    },
    [addToast, getPlayer1, getPlayer2],
  );

  return (
    <Container>
      <Content>
        <div className="title">Create Game</div>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Autocomplete
              freeSolo
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
                />
              )}
            />

            <Autocomplete
              freeSolo
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
                />
              )}
            />

            <br />

            <Input
              icon={FaFutbol}
              name="goals_player1"
              type="number"
              placeholder="Goals player 1"
            />
            <Input
              icon={FaFutbol}
              name="goals_player2"
              type="number"
              placeholder="Goals player 2"
            />

            <Button type="submit">Save</Button>
          </Form>
        </FormContainer>

        {/* <Loading /> */}
      </Content>
    </Container>
  );
};

export default Game;
