import styled, { createGlobalStyle, css } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
  }

  body {
    font-family: ${theme.fonts.primary};
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${theme.colors.secondary};
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease;
  }

  input, textarea {
    font-family: inherit;
    outline: none;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.borderLight};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.textMuted};
  }
`;

// Common styled components
export const Container = styled.div<{ maxWidth?: string; padding?: string }>`
  width: 100%;
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${props => props.padding || `0 ${theme.spacing.md}`};

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: ${props => props.padding || `0 ${theme.spacing.lg}`};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${props => props.padding || `0 ${theme.spacing.xl}`};
  }
`;

export const Card = styled.div<{ padding?: string; shadow?: keyof typeof theme.shadows }>`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${props => props.padding || theme.spacing.lg};
  box-shadow: ${props => theme.shadows[props.shadow || 'base']};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${props => theme.shadows[props.shadow === 'base' ? 'md' : 'lg']};
  }
`;

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-weight: ${theme.fontWeights.medium};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;

  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.sm};
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.fontSizes.lg};
        `;
      default:
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.base};
        `;
    }
  }}

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: white;
          &:hover {
            background-color: #008a44;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary};
            color: white;
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.textSecondary};
          &:hover {
            background-color: ${theme.colors.borderLight};
            color: ${theme.colors.textPrimary};
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: white;
          &:hover {
            background-color: #a64a0e;
          }
        `;
    }
  }}

  ${props => props.fullWidth && css`width: 100%;`}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      background-color: ${theme.colors.primary};
    }
  }
`;

export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${props => props.error ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  background-color: ${theme.colors.surface};
  color: ${theme.colors.textPrimary};
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${props => props.error ? theme.colors.error : theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const TextArea = styled.textarea<{ error?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${props => props.error ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  background-color: ${theme.colors.surface};
  color: ${theme.colors.textPrimary};
  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: 120px;

  &:focus {
    border-color: ${props => props.error ? theme.colors.error : theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

export const Label = styled.label`
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.textPrimary};
  font-size: ${theme.fontSizes.sm};
`;

export const ErrorText = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.fontSizes.sm};
`;

export const Badge = styled.span<{ variant?: 'primary' | 'secondary' | 'success' | 'warning' }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary}20;
          color: ${theme.colors.secondary};
        `;
      case 'success':
        return css`
          background-color: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case 'warning':
        return css`
          background-color: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      default:
        return css`
          background-color: ${theme.colors.primary}20;
          color: ${theme.colors.primary};
        `;
    }
  }}
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.borderLight};
  border-top: 2px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  gap?: keyof typeof theme.spacing;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap ? theme.spacing[props.gap] : '0'};
  ${props => props.wrap && css`flex-wrap: wrap;`}
`;

export const Text = styled.p<{
  size?: keyof typeof theme.fontSizes;
  weight?: keyof typeof theme.fontWeights;
  color?: string;
  align?: 'left' | 'center' | 'right';
}>`
  font-size: ${props => props.size ? theme.fontSizes[props.size] : theme.fontSizes.base};
  font-weight: ${props => props.weight ? theme.fontWeights[props.weight] : theme.fontWeights.normal};
  color: ${props => props.color || theme.colors.textPrimary};
  text-align: ${props => props.align || 'left'};
  margin: 0;
`;

export const Heading = styled.h1<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: string;
  align?: 'left' | 'center' | 'right';
}>`
  font-weight: ${theme.fontWeights.bold};
  color: ${props => props.color || theme.colors.textPrimary};
  text-align: ${props => props.align || 'left'};
  margin: 0;
  line-height: 1.2;

  ${props => {
    switch (props.level) {
      case 1:
        return css`font-size: ${theme.fontSizes['5xl']};`;
      case 2:
        return css`font-size: ${theme.fontSizes['4xl']};`;
      case 3:
        return css`font-size: ${theme.fontSizes['3xl']};`;
      case 4:
        return css`font-size: ${theme.fontSizes['2xl']};`;
      case 5:
        return css`font-size: ${theme.fontSizes.xl};`;
      case 6:
        return css`font-size: ${theme.fontSizes.lg};`;
      default:
        return css`font-size: ${theme.fontSizes['4xl']};`;
    }
  }}
`;