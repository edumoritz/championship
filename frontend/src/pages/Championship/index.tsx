import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Select } from 'unform-material-ui';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
// import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import * as Yup from 'yup';
import Button from '../../components/Button';
import { Container, Content } from './styles';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';
import { IPlayerDTO } from '../../dto/IPlayersDTO';
import { IChampionshipResponse } from '../../dto/IChamponshipDTO';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Championship: React.FC = () => {
  const { addToast } = useToast();
  // const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const [players, setPlayers] = useState<IPlayerDTO[]>([]);
  // const [getPlayer, setPlayer] = useState('');
  const [getPlayer, setPlayer] = React.useState<string[]>([]);

  const handleSubmit = useCallback(
    async (data: IChampionshipResponse) => {
      try {
        // formRef.current?.setErrors({});
        console.log(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // formRef.current?.setErrors(errors);
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

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setPlayer(event.target.value as string[]);
    },
    [],
  );

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
              value={getPlayer}
              onChange={handleChange}
              input={<Input />}
              renderValue={selected => (
                <div className="chips">
                  {(selected as string[]).map(value => (
                    <Chip key={value} label={value} className="chip" />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {players.map(player => (
                <MenuItem key={player.id} value={player.name}>
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

export default Championship;
