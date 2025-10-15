import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiMessageSquare, FiPlus, FiUser, FiSearch, FiLogOut, FiSettings } from 'react-icons/fi';
import { Container, Flex, Button } from '../styles/components';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

const Nav = styled.nav`
  background-color: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: ${theme.colors.secondary};
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.fontWeights.medium};
  color: ${props => props.$isActive ? theme.colors.primary : theme.colors.textSecondary};
  background-color: ${props => props.$isActive ? `${theme.colors.primary}10` : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
    background-color: ${`${theme.colors.primary}10`};
    text-decoration: none;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 400px;
  flex: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  padding-left: 2.5rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  background-color: ${theme.colors.background};
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: ${theme.spacing.sm};
  width: 16px;
  height: 16px;
  color: ${theme.colors.textMuted};
  pointer-events: none;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const NavLinks = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: ${theme.colors.surface};
    border-bottom: 1px solid ${theme.colors.border};
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.xs};
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserAvatar = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  border: 2px solid ${theme.colors.border};
  background: ${theme.colors.primary};
  color: white;
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius.full};
    object-fit: cover;
  }
`;

const UserDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${theme.spacing.sm};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  min-width: 200px;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.$isOpen ? '0' : '-10px'});
  transition: all 0.2s ease;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.textPrimary};
  text-decoration: none;
  border-bottom: 1px solid ${theme.colors.borderLight};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${theme.colors.background};
    color: ${theme.colors.primary};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: none;
  border: none;
  color: ${theme.colors.textPrimary};
  text-align: left;
  cursor: pointer;
  border-bottom: 1px solid ${theme.colors.borderLight};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${theme.colors.background};
    color: ${theme.colors.primary};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    width: 100%;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Nav>
      <Container>
        <Flex justify="space-between" align="center" style={{ minHeight: '64px' }}>
          <Logo to="/">UTDiscussions</Logo>
          
          <SearchContainer>
            <SearchIcon />
            <SearchInput 
              type="text" 
              placeholder="Search discussions, topics, or questions..."
            />
          </SearchContainer>

          <NavLinks $isOpen={isMobileMenuOpen}>
            <NavLink to="/" $isActive={isActive('/')}>
              <FiHome />
              <span>Home</span>
            </NavLink>
            <NavLink to="/threads" $isActive={isActive('/threads')}>
              <FiMessageSquare />
              <span>Discussions</span>
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/submit" $isActive={isActive('/submit')}>
                <FiPlus />
                <span>Ask Question</span>
              </NavLink>
            )}
          </NavLinks>

          {isAuthenticated ? (
            <UserMenu>
              <UserAvatar 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.fullName} />
                ) : (
                  getUserInitials(user?.fullName || 'U')
                )}
              </UserAvatar>
              <UserDropdown $isOpen={isUserMenuOpen}>
                <DropdownItem 
                  to="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <FiUser />
                  Profile
                </DropdownItem>
                <DropdownItem 
                  to="/settings"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <FiSettings />
                  Settings
                </DropdownItem>
                <DropdownButton onClick={handleLogout}>
                  <FiLogOut />
                  Logout
                </DropdownButton>
              </UserDropdown>
            </UserMenu>
          ) : (
            <AuthButtons>
              <Button 
                as={Link} 
                to="/login" 
                variant="ghost" 
                size="sm"
              >
                Sign In
              </Button>
              <Button 
                as={Link} 
                to="/register" 
                size="sm"
              >
                Sign Up
              </Button>
            </AuthButtons>
          )}

          <MobileMenuButton 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </MobileMenuButton>
        </Flex>
      </Container>
    </Nav>
  );
};

export default Navbar;
