import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Select } from 'unform-material-ui';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Chip from '@material-ui/core/Chip';
import * as Yup from 'yup';
import Button from '../Button';
import { Container, Content } from './styles';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';
import { IPlayerDTO } from '../../dto/IPlayersDTO';
import { IChampionshipResponse } from '../../dto/IChamponshipDTO';

const ChampionshipCreate: React.FC = () => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [players, setPlayers] = useState<IPlayerDTO[]>([]);
  const [playerName, setPlayerName] = React.useState<string[]>([]);

  const handleSubmit = useCallback(
    async (data: IChampionshipResponse) => {
      try {
        const body = {
          ...data,
          chips: data.chips.map(chip => chip[0]),
        };
        console.log(body);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
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
    [addToast],
  );

  useEffect(() => {
    api.get(`/players`).then(response => {
      setPlayers(response.data);
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPlayerName(event.target.value as string[]);
  };

  return (
    <Container>
      <Content>
        <div className="title">
          <strong>Create Championship</strong>
        </div>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            className="text-field"
            name="name"
            label="Name"
            variant="outlined"
            type="text"
          />
          <FormControl className="form-control">
            <Select
              multiple
              label="Players"
              name="chips"
              onChange={handleChange}
              input={<Input />}
              renderValue={selected => (
                <div className="chips">
                  {(selected as string[]).map(value => (
                    <Chip
                      key={value}
                      label={value}
                      className="chip"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </div>
              )}
            >
              {players.map(player => (
                <MenuItem
                  key={player.id}
                  value={player.name}
                  style={{
                    fontWeight:
                      playerName.indexOf(player.name) === -1
                        ? 'inherit'
                        : 'bold',
                  }}
                >
                  {player.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.5 }}>
            <Button type="submit">Save</Button>
          </motion.div>
        </Form>
      </Content>
    </Container>
  );
};

export default ChampionshipCreate;
