import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft, FiThumbsUp, FiThumbsDown, FiMessageCircle, FiShare2, FiFlag, FiUser, FiClock, FiCheck } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { 
  Container, 
  Card, 
  Button, 
  TextArea, 
  Badge, 
  Flex, 
  Heading, 
  Text,
  FormGroup,
  LoadingSpinner 
} from '../styles/components';
import { theme } from '../styles/theme';

const BackButton = styled(Button)`
  margin-bottom: ${theme.spacing.lg};
`;

const ThreadHeader = styled(Card)`
  margin-bottom: ${theme.spacing.xl};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeights.bold};

  img {
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius.full};
    object-fit: cover;
  }
`;

const AuthorDetails = styled.div`
  flex: 1;
`;

const ThreadContent = styled.div`
  margin: ${theme.spacing.lg} 0;
  font-size: ${theme.fontSizes.base};
  line-height: 1.6;
  color: ${theme.colors.textPrimary};
`;

const ThreadActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
  }
`;

const ActionButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: none;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${props => props.$isActive ? theme.colors.primary : theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background-color: ${`${theme.colors.primary}05`};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.md};
`;

const RepliesSection = styled.div`
  margin-top: ${theme.spacing.xl};
`;

const ReplyCard = styled(Card)`
  margin-bottom: ${theme.spacing.lg};
  position: relative;

  ${props => props.className?.includes('best-answer') && `
    border-color: ${theme.colors.success};
    background: ${`${theme.colors.success}08`};
  `}
`;

const BestAnswerBadge = styled.div`
  position: absolute;
  top: -10px;
  right: ${theme.spacing.md};
  background: ${theme.colors.success};
  color: white;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.semibold};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  svg {
    width: 12px;
    height: 12px;
  }
`;

const ReplyActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const ReplyForm = styled(Card)`
  margin-top: ${theme.spacing.xl};
`;

const mockThread = {
  id: 1,
  title: 'Need help with Calculus I - Integration by Parts',
  content: `I'm struggling with integration by parts problems. The formula is ∫u dv = uv - ∫v du, but I'm having trouble identifying which part should be 'u' and which should be 'dv'.

For example, with ∫x ln(x) dx, how do I decide what to assign to each variable? I've tried different combinations but keep getting stuck.

Any tips or strategies would be greatly appreciated!`,
  author: {
    id: 'sarah123',
    name: 'Sarah Chen',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=C75B12&color=fff',
    reputation: 245,
    isVerified: true
  },
  createdAt: new Date('2024-10-14T10:30:00'),
  tags: ['Mathematics', 'Calculus', 'Integration'],
  likes: 12,
  dislikes: 1,
  views: 156,
  isAnswered: true,
  category: 'Mathematics'
};

const mockReplies = [
  {
    id: 1,
    content: `Great question! The key is to use the LIATE rule for choosing 'u':

**L** - Logarithmic functions (ln x, log x)
**I** - Inverse trig functions (arcsin x, arctan x)
**A** - Algebraic functions (x², x³, polynomials)
**T** - Trigonometric functions (sin x, cos x)
**E** - Exponential functions (e^x, 2^x)

Choose 'u' as the function that appears first in this list. For ∫x ln(x) dx:
- x is algebraic (A)
- ln(x) is logarithmic (L)

Since L comes before A, choose u = ln(x) and dv = x dx.`,
    author: {
      id: 'prof_williams',
      name: 'Dr. Williams',
      avatar: 'https://ui-avatars.com/api/?name=Dr+Williams&background=00A651&color=fff',
      reputation: 892,
      isVerified: true
    },
    createdAt: new Date('2024-10-14T11:15:00'),
    likes: 18,
    dislikes: 0,
    isBestAnswer: true
  },
  {
    id: 2,
    content: `I had the same problem! The LIATE rule that Dr. Williams mentioned is a lifesaver. 

Also, practice with these steps:
1. Identify u and dv using LIATE
2. Find du by differentiating u
3. Find v by integrating dv
4. Apply the formula ∫u dv = uv - ∫v du
5. Solve the remaining integral

Want to practice together? I'm also in Calculus I.`,
    author: {
      id: 'mike_student',
      name: 'Mike Rodriguez',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Rodriguez&background=003366&color=fff',
      reputation: 67,
      isVerified: false
    },
    createdAt: new Date('2024-10-14T14:30:00'),
    likes: 5,
    dislikes: 0,
    isBestAnswer: false
  }
];

const ThreadDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [newReply, setNewReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVotes, setUserVotes] = useState<Record<number, 'up' | 'down' | null>>({});

  const handleVote = (replyId: number, type: 'up' | 'down') => {
    setUserVotes(prev => ({
      ...prev,
      [replyId]: prev[replyId] === type ? null : type
    }));
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !isAuthenticated) return;

    setIsSubmitting(true);
    try {
      // TODO: Submit to API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewReply('');
      // TODO: Refresh replies
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!mockThread) {
    return (
      <Container>
        <Text>Thread not found.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton 
        as={Link} 
        to="/threads" 
        variant="ghost" 
        size="sm"
      >
        <FiArrowLeft />
        Back to Discussions
      </BackButton>

      <ThreadHeader>
        <AuthorInfo>
          <Avatar>
            {mockThread.author.avatar ? (
              <img src={mockThread.author.avatar} alt={mockThread.author.name} />
            ) : (
              getUserInitials(mockThread.author.name)
            )}
          </Avatar>
          <AuthorDetails>
            <Flex align="center" gap="sm">
              <Text weight="semibold">{mockThread.author.name}</Text>
              {mockThread.author.isVerified && (
                <Badge variant="success">Verified</Badge>
              )}
              <Text size="sm" color={theme.colors.textMuted}>
                {mockThread.author.reputation} reputation
              </Text>
            </Flex>
            <Text size="sm" color={theme.colors.textSecondary}>
              <FiClock style={{ display: 'inline', marginRight: '4px' }} />
              {formatDistanceToNow(mockThread.createdAt, { addSuffix: true })}
            </Text>
          </AuthorDetails>
        </AuthorInfo>

        <Heading level={3} style={{ marginBottom: theme.spacing.md }}>
          {mockThread.title}
        </Heading>

        <ThreadContent>
          {mockThread.content}
        </ThreadContent>

        <TagsContainer>
          {mockThread.tags.map(tag => (
            <Badge key={tag} variant="primary">
              {tag}
            </Badge>
          ))}
        </TagsContainer>

        <ThreadActions>
          <ActionButton onClick={() => handleVote(0, 'up')}>
            <FiThumbsUp />
            {mockThread.likes}
          </ActionButton>
          <ActionButton>
            <FiThumbsDown />
            {mockThread.dislikes}
          </ActionButton>
          <ActionButton>
            <FiShare2 />
            Share
          </ActionButton>
          <ActionButton>
            <FiFlag />
            Report
          </ActionButton>
        </ThreadActions>
      </ThreadHeader>

      <RepliesSection>
        <Heading level={4} style={{ marginBottom: theme.spacing.lg }}>
          {mockReplies.length} Replies
        </Heading>

        {mockReplies.map(reply => (
          <ReplyCard 
            key={reply.id}
            className={reply.isBestAnswer ? 'best-answer' : ''}
          >
            {reply.isBestAnswer && (
              <BestAnswerBadge>
                <FiCheck />
                Best Answer
              </BestAnswerBadge>
            )}

            <AuthorInfo>
              <Avatar>
                {reply.author.avatar ? (
                  <img src={reply.author.avatar} alt={reply.author.name} />
                ) : (
                  getUserInitials(reply.author.name)
                )}
              </Avatar>
              <AuthorDetails>
                <Flex align="center" gap="sm">
                  <Text weight="semibold">{reply.author.name}</Text>
                  {reply.author.isVerified && (
                    <Badge variant="success">Verified</Badge>
                  )}
                  <Text size="sm" color={theme.colors.textMuted}>
                    {reply.author.reputation} reputation
                  </Text>
                </Flex>
                <Text size="sm" color={theme.colors.textSecondary}>
                  <FiClock style={{ display: 'inline', marginRight: '4px' }} />
                  {formatDistanceToNow(reply.createdAt, { addSuffix: true })}
                </Text>
              </AuthorDetails>
            </AuthorInfo>

            <ThreadContent style={{ whiteSpace: 'pre-line' }}>
              {reply.content}
            </ThreadContent>

            <ReplyActions>
              <ActionButton 
                $isActive={userVotes[reply.id] === 'up'}
                onClick={() => handleVote(reply.id, 'up')}
              >
                <FiThumbsUp />
                {reply.likes}
              </ActionButton>
              <ActionButton 
                $isActive={userVotes[reply.id] === 'down'}
                onClick={() => handleVote(reply.id, 'down')}
              >
                <FiThumbsDown />
                {reply.dislikes}
              </ActionButton>
              <ActionButton>
                <FiMessageCircle />
                Reply
              </ActionButton>
            </ReplyActions>
          </ReplyCard>
        ))}
      </RepliesSection>

      {isAuthenticated ? (
        <ReplyForm>
          <Heading level={5} style={{ marginBottom: theme.spacing.md }}>
            Add Your Reply
          </Heading>
          <form onSubmit={handleSubmitReply}>
            <FormGroup>
              <TextArea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Share your knowledge and help out a fellow student..."
                rows={6}
              />
            </FormGroup>
            <Flex justify="flex-end" gap="sm">
              <Button 
                type="button" 
                variant="ghost"
                onClick={() => setNewReply('')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!newReply.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <Flex align="center" gap="sm">
                    <LoadingSpinner />
                    Posting...
                  </Flex>
                ) : (
                  'Post Reply'
                )}
              </Button>
            </Flex>
          </form>
        </ReplyForm>
      ) : (
        <Card style={{ textAlign: 'center', padding: theme.spacing.xl }}>
          <Text size="lg" style={{ marginBottom: theme.spacing.md }}>
            Want to contribute to the discussion?
          </Text>
          <Text color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.lg }}>
            Sign in to post replies and help fellow students.
          </Text>
          <Flex justify="center" gap="sm">
            <Button as={Link} to="/login">
              Sign In
            </Button>
            <Button as={Link} to="/register" variant="outline">
              Create Account
            </Button>
          </Flex>
        </Card>
      )}
    </Container>
  );
};

export default ThreadDetails;
