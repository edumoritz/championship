import React, { useRef, useCallback, useState } from 'react';
import { FiMail, FiLogIn } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, FormContainer, Background } from './styles';

interface ForgotPasswordData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: ForgotPasswordData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
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
              <h1>Recuperar senha</h1>

              <Input name="email" icon={FiMail} placeholder="E-mail" />

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
                <Button loading={loading} type="submit">
                  Recuperar
                </Button>
              </motion.div>
            </Form>

            <Link to="/">
              <FiLogIn />
              Voltar ao login
            </Link>
          </FormContainer>
        </motion.div>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
