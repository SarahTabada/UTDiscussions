import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { 
  Container, 
  Card, 
  Button, 
  Input, 
  FormGroup, 
  Label, 
  ErrorText, 
  Heading, 
  Text, 
  Flex,
  LoadingSpinner 
} from '../styles/components';
import { theme } from '../styles/theme';

const AuthContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding-top: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.xl};
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: ${theme.spacing['2xl']};
`;

const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const AuthToggle = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing.xl};
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xs};
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.fontWeights.medium};
  background-color: ${props => props.$isActive ? theme.colors.surface : 'transparent'};
  color: ${props => props.$isActive ? theme.colors.primary : theme.colors.textSecondary};
  box-shadow: ${props => props.$isActive ? theme.shadows.sm : 'none'};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const InputContainer = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: ${theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.textMuted};
    width: 16px;
    height: 16px;
  }

  input {
    padding-left: 2.5rem;
  }
`;

const PasswordContainer = styled(InputContainer)`
  .toggle-password {
    position: absolute;
    right: ${theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: ${theme.colors.textMuted};
    cursor: pointer;
    padding: 0;
    width: 16px;
    height: 16px;

    &:hover {
      color: ${theme.colors.textSecondary};
    }
  }
`;

const ForgotPassword = styled(Link)`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.primary};
    text-decoration: underline;
  }
`;

const AuthFooter = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
`;

interface AuthProps {
  initialMode?: 'login' | 'register';
}

const Auth: React.FC<AuthProps> = ({ initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    username: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.username) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          username: formData.username
        });
      }
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({ submit: (error as Error).message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModeSwitch = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      fullName: '',
      username: ''
    });
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <Heading level={2} align="center">
            {mode === 'login' ? 'Welcome Back' : 'Join UTDiscussions'}
          </Heading>
          <Text align="center" color={theme.colors.textSecondary} style={{ marginTop: theme.spacing.sm }}>
            {mode === 'login' 
              ? 'Sign in to your account to continue'
              : 'Create an account to start participating in discussions'
            }
          </Text>
        </AuthHeader>

        <AuthToggle>
          <ToggleButton 
            type="button"
            $isActive={mode === 'login'}
            onClick={() => handleModeSwitch('login')}
          >
            <FiUser style={{ display: 'inline', marginRight: '8px' }} />
            Sign In
          </ToggleButton>
          <ToggleButton 
            type="button"
            $isActive={mode === 'register'}
            onClick={() => handleModeSwitch('register')}
          >
            <FiUserPlus style={{ display: 'inline', marginRight: '8px' }} />
            Sign Up
          </ToggleButton>
        </AuthToggle>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <FormGroup>
                <Label>Full Name</Label>
                <InputContainer>
                  <FiUser />
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={!!errors.fullName}
                  />
                </InputContainer>
                {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>Username</Label>
                <InputContainer>
                  <FiUser />
                  <Input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleInputChange}
                    error={!!errors.username}
                  />
                </InputContainer>
                {errors.username && <ErrorText>{errors.username}</ErrorText>}
              </FormGroup>
            </>
          )}

          <FormGroup>
            <Label>Email</Label>
            <InputContainer>
              <FiMail />
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
              />
            </InputContainer>
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Flex justify="space-between" align="center">
              <Label>Password</Label>
              {mode === 'login' && (
                <ForgotPassword to="/forgot-password">
                  Forgot password?
                </ForgotPassword>
              )}
            </Flex>
            <PasswordContainer>
              <FiLock />
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </PasswordContainer>
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </FormGroup>

          {errors.submit && (
            <ErrorText style={{ marginBottom: theme.spacing.md }}>
              {errors.submit}
            </ErrorText>
          )}

          <Button 
            type="submit" 
            fullWidth 
            size="lg" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Flex align="center" gap="sm">
                <LoadingSpinner />
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </Flex>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>

        <AuthFooter>
          <Text size="sm" color={theme.colors.textSecondary} align="center">
            By continuing, you agree to our{' '}
            <Link to="/terms" style={{ color: theme.colors.primary }}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" style={{ color: theme.colors.primary }}>
              Privacy Policy
            </Link>
          </Text>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};

export default Auth;