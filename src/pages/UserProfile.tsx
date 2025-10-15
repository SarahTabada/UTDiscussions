import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiUser, FiMail, FiCalendar, FiAward, FiMessageSquare, FiThumbsUp, FiEdit3, FiCamera, FiSettings } from 'react-icons/fi';
import { formatDistanceToNow, format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { 
  Container, 
  Card, 
  Button, 
  Input, 
  FormGroup, 
  Label, 
  Badge, 
  Flex, 
  Heading, 
  Text,
  LoadingSpinner 
} from '../styles/components';
import { theme } from '../styles/theme';

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const ProfileHeader = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: ${theme.spacing.lg};
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  border: 4px solid ${theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius.full};
    object-fit: cover;
  }
`;

const AvatarUpload = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary};
  color: white;
  border: 2px solid ${theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.secondary};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserStats = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};

  svg {
    width: 16px;
    height: 16px;
    color: ${theme.colors.primary};
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border};

  @media (max-width: ${theme.breakpoints.sm}) {
    overflow-x: auto;
    padding-bottom: ${theme.spacing.sm};
  }
`;

const Tab = styled.button<{ $isActive: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: ${props => props.$isActive ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  border-bottom-color: ${props => props.$isActive ? theme.colors.primary : 'transparent'};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ContentSection = styled.div`
  min-height: 300px;
`;

const ActivityItem = styled(Card)`
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
`;

const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};

  svg {
    width: 14px;
    height: 14px;
  }
`;

const QuestionTitle = styled(Link)`
  color: ${theme.colors.textPrimary};
  font-weight: ${theme.fontWeights.medium};
  text-decoration: none;
  display: block;
  margin-bottom: ${theme.spacing.sm};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const EditForm = styled(Card)`
  padding: ${theme.spacing.xl};
`;

const mockUserActivity = [
  {
    id: 1,
    type: 'question',
    title: 'Need help with Calculus I - Integration by Parts',
    date: new Date('2024-10-14T10:30:00'),
    replies: 12,
    likes: 8,
    tags: ['Mathematics', 'Calculus']
  },
  {
    id: 2,
    type: 'reply',
    title: 'CS 2336 - Programming Assignment 2 Discussion',
    date: new Date('2024-10-13T15:20:00'),
    likes: 5,
    tags: ['Computer Science', 'Java']
  },
  {
    id: 3,
    type: 'question',
    title: 'Physics 2325 - Understanding Wave Motion',
    date: new Date('2024-10-12T09:45:00'),
    replies: 3,
    likes: 2,
    tags: ['Physics', 'Waves']
  }
];

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'activity' | 'edit' | 'settings'>('activity');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || ''
  });

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(true);
    try {
      await updateProfile(editData);
      setActiveTab('activity');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <Container>
        <Text>Please log in to view your profile.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileContainer>
        <ProfileHeader>
          <AvatarContainer>
            <Avatar>
              {user.avatar ? (
                <img src={user.avatar} alt={user.fullName} />
              ) : (
                getUserInitials(user.fullName)
              )}
            </Avatar>
            <AvatarUpload>
              <FiCamera />
            </AvatarUpload>
          </AvatarContainer>

          <UserInfo>
            <Flex align="center" gap="md" style={{ marginBottom: theme.spacing.sm }}>
              <Heading level={2}>{user.fullName}</Heading>
              {user.isVerified && (
                <Badge variant="success">Verified</Badge>
              )}
            </Flex>
            
            <Text color={theme.colors.textSecondary} size="lg" style={{ marginBottom: theme.spacing.sm }}>
              @{user.username}
            </Text>

            <UserStats>
              <StatItem>
                <FiAward />
                <span>{user.reputation} reputation</span>
              </StatItem>
              <StatItem>
                <FiCalendar />
                <span>Joined {format(user.joinedAt, 'MMMM yyyy')}</span>
              </StatItem>
              <StatItem>
                <FiMessageSquare />
                <span>15 questions</span>
              </StatItem>
              <StatItem>
                <FiThumbsUp />
                <span>42 helpful answers</span>
              </StatItem>
            </UserStats>
          </UserInfo>

          <Button onClick={() => setActiveTab('edit')}>
            <FiEdit3 />
            Edit Profile
          </Button>
        </ProfileHeader>

        <TabContainer>
          <Tab 
            $isActive={activeTab === 'activity'}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </Tab>
          <Tab 
            $isActive={activeTab === 'edit'}
            onClick={() => setActiveTab('edit')}
          >
            Edit Profile
          </Tab>
          <Tab 
            $isActive={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </Tab>
        </TabContainer>

        <ContentSection>
          {activeTab === 'activity' && (
            <div>
              <Heading level={4} style={{ marginBottom: theme.spacing.lg }}>
                Recent Activity
              </Heading>
              {mockUserActivity.map(activity => (
                <ActivityItem key={activity.id}>
                  <ActivityHeader>
                    {activity.type === 'question' ? (
                      <>
                        <FiMessageSquare />
                        <span>Asked a question</span>
                      </>
                    ) : (
                      <>
                        <FiUser />
                        <span>Replied to</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{formatDistanceToNow(activity.date, { addSuffix: true })}</span>
                  </ActivityHeader>
                  
                  <QuestionTitle to={`/threads/${activity.id}`}>
                    {activity.title}
                  </QuestionTitle>
                  
                  <Flex gap="sm" wrap style={{ marginBottom: theme.spacing.sm }}>
                    {activity.tags.map(tag => (
                      <Badge key={tag} variant="primary">
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                  
                  <Flex gap="md">
                    {activity.replies !== undefined && (
                      <Text size="sm" color={theme.colors.textSecondary}>
                        {activity.replies} replies
                      </Text>
                    )}
                    <Text size="sm" color={theme.colors.textSecondary}>
                      {activity.likes} likes
                    </Text>
                  </Flex>
                </ActivityItem>
              ))}
            </div>
          )}

          {activeTab === 'edit' && (
            <div>
              <Heading level={4} style={{ marginBottom: theme.spacing.lg }}>
                Edit Profile
              </Heading>
              <EditForm>
                <form onSubmit={handleEditSubmit}>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      value={editData.fullName}
                      onChange={(e) => setEditData(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      value={editData.username}
                      onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </FormGroup>

                  <Flex justify="flex-end" gap="md">
                    <Button 
                      type="button" 
                      variant="ghost"
                      onClick={() => setActiveTab('activity')}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isEditing}>
                      {isEditing ? (
                        <Flex align="center" gap="sm">
                          <LoadingSpinner />
                          Updating...
                        </Flex>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </Flex>
                </form>
              </EditForm>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <Heading level={4} style={{ marginBottom: theme.spacing.lg }}>
                Account Settings
              </Heading>
              <Card style={{ padding: theme.spacing.xl }}>
                <Text color={theme.colors.textSecondary}>
                  Settings functionality will be implemented in a future update.
                </Text>
              </Card>
            </div>
          )}
        </ContentSection>
      </ProfileContainer>
    </Container>
  );
};

export default UserProfile;
