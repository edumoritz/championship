import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SigninFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  return <div>SignIn</div>;
};

export default SignIn;
