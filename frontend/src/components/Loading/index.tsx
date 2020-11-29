import React from 'react';
import { motion } from 'framer-motion';

import { Container } from './styles';

const Loading: React.FC = () => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const loadingCircleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };
  const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'circInOut',
    // 'circInOut' | 'easeInOut' | 'easeOut' | linear
  };
  return (
    <Container>
      <motion.div
        className="construct-container"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="construct-circle"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          className="construct-circle"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          className="construct-circle"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
    </Container>
  );
};

export default Loading;
