import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, FormContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('E-mail is required')
            .email('Enter a valid email address'),
          password: Yup.string().min(6, 'At least 6 digits'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/players', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Successful registration!',
          description: 'You can now log in',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        const { message } = err.response.data;
        addToast({
          type: 'error',
          title: 'Registration error',
          description:
            message || 'An error occurred while registering, please try again',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <motion.div
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            duration: 1,
          }}
          animate={{ scale: 1.2, rotate: 360 }}
        >
          <FormContainer>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                loop: Infinity,
                ease: 'linear',
              }}
            >
              <FaTrophy className="icon" />
            </motion.div>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro</h1>

              <Input name="name" icon={FiUser} placeholder="Name" />
              <Input name="email" icon={FiMail} placeholder="E-mail" />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Password"
              />

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
                <Button type="submit">Register</Button>
              </motion.div>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Back to login
            </Link>
          </FormContainer>
        </motion.div>
      </Content>
    </Container>
  );
};

export default SignUp;
