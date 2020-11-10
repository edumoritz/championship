import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, FormContainer, Background } from './styles';

interface SigninFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SigninFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
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
              <h1>Faça seu logon</h1>

              <Input name="email" icon={FiMail} placeholder="E-mail" />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
                <Button type="submit">Entrar</Button>
              </motion.div>

              <Link to="/forgot-password">Esqueci minha senha</Link>
            </Form>

            <Link to="signup">
              <FiLogIn />
              Criar conta
            </Link>
          </FormContainer>
        </motion.div>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
