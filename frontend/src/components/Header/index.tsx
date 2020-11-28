import React from 'react';

import { Link } from 'react-router-dom';
import { FaTrophy } from 'react-icons/fa';
import { FiPower } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Container, Header, HeaderContent, Profile } from './styles';

import { useAuth } from '../../hooks/auth';

const HeaderComponent: React.FC = () => {
  const { signOut, player } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <FaTrophy className="icon" />
            <div>
              <span>Bem-vindo, </span>
              <Link to="/">
                <strong className="">{player.name}</strong>
              </Link>
            </div>
          </Profile>
          <motion.div whileHover={{ scale: 1.2 }} animate={{ rotate: 360 }}>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </motion.div>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default HeaderComponent;
