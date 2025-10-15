import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiFilter, FiPlus, FiMessageCircle, FiThumbsUp, FiClock, FiUser } from 'react-icons/fi';
import { Container, Card, Button, Input, Badge, Flex, Heading, Text } from '../styles/components';
import { theme } from '../styles/theme';
import { formatDistanceToNow } from 'date-fns';

const Header = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const SearchAndFilters = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;

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

const FilterButton = styled(Button)<{ $isActive: boolean }>`
  background-color: ${props => props.$isActive ? theme.colors.primary : 'transparent'};
  color: ${props => props.$isActive ? 'white' : theme.colors.textSecondary};
  border: 1px solid ${props => props.$isActive ? theme.colors.primary : theme.colors.border};

  &:hover {
    background-color: ${props => props.$isActive ? theme.colors.primary : theme.colors.borderLight};
    color: ${props => props.$isActive ? 'white' : theme.colors.textPrimary};
  }
`;

const ThreadCard = styled(Card)`
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }
`;

const ThreadHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const ThreadTitle = styled(Link)`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.textPrimary};
  text-decoration: none;
  margin-bottom: ${theme.spacing.sm};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ThreadMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
  }
`;

const ThreadStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};

  svg {
    width: 14px;
    height: 14px;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.sm};
`;

const mockThreads = [
  {
    id: 1,
    title: 'Need help with Calculus I - Integration by Parts',
    content: 'I\'m struggling with integration by parts problems. Can someone explain the process step by step?',
    author: 'Sarah Chen',
    authorId: 'sarah123',
    createdAt: new Date('2024-10-14T10:30:00'),
    tags: ['Mathematics', 'Calculus', 'Integration'],
    replies: 12,
    likes: 8,
    views: 156,
    isAnswered: true,
    category: 'Mathematics'
  },
  {
    id: 2,
    title: 'CS 2336 - Programming Assignment 2 Discussion',
    content: 'Anyone else working on the linked list assignment? I\'m having trouble with the deletion method.',
    author: 'Mike Rodriguez',
    authorId: 'mike_r',
    createdAt: new Date('2024-10-14T14:15:00'),
    tags: ['Computer Science', 'Java', 'Data Structures'],
    replies: 7,
    likes: 15,
    views: 203,
    isAnswered: false,
    category: 'Computer Science'
  },
  {
    id: 3,
    title: 'Physics 2325 - Wave Motion and Sound',
    content: 'Can someone help me understand the relationship between frequency, wavelength, and wave speed?',
    author: 'Emily Johnson',
    authorId: 'emily_j',
    createdAt: new Date('2024-10-13T16:45:00'),
    tags: ['Physics', 'Waves', 'Mechanics'],
    replies: 5,
    likes: 6,
    views: 89,
    isAnswered: true,
    category: 'Physics'
  },
  {
    id: 4,
    title: 'Study Group for CHEM 1311 Final Exam',
    content: 'Looking to form a study group for the upcoming chemistry final. Anyone interested?',
    author: 'David Kim',
    authorId: 'david_k',
    createdAt: new Date('2024-10-15T09:20:00'),
    tags: ['Chemistry', 'Study Group', 'Finals'],
    replies: 18,
    likes: 22,
    views: 341,
    isAnswered: false,
    category: 'Chemistry'
  },
];

const categories = ['All', 'Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'Engineering'];
const sortOptions = ['Newest', 'Most Popular', 'Most Replies', 'Unanswered'];

const Threads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const filteredThreads = mockThreads
    .filter(thread => {
      const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || thread.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Most Popular':
          return b.likes - a.likes;
        case 'Most Replies':
          return b.replies - a.replies;
        case 'Unanswered':
          return a.isAnswered === b.isAnswered ? 0 : a.isAnswered ? 1 : -1;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <Container>
      <Header>
        <Flex justify="space-between" align="center" wrap>
          <div>
            <Heading level={2} style={{ marginBottom: theme.spacing.sm }}>
              Discussion Threads
            </Heading>
            <Text color={theme.colors.textSecondary}>
              Find help, share knowledge, and connect with fellow UTD students
            </Text>
          </div>
          <Button as={Link} to="/submit">
            <FiPlus />
            Ask Question
          </Button>
        </Flex>
      </Header>

      <SearchAndFilters>
        <SearchContainer>
          <FiSearch />
          <Input
            type="text"
            placeholder="Search discussions, topics, or questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.md,
            backgroundColor: theme.colors.surface,
            color: theme.colors.textPrimary,
            fontSize: theme.fontSizes.sm,
          }}
        >
          {sortOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </SearchAndFilters>

      <Flex gap="sm" wrap style={{ marginBottom: theme.spacing.lg }}>
        {categories.map(category => (
          <FilterButton
            key={category}
            size="sm"
            $isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </Flex>

      <div>
        {filteredThreads.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: theme.spacing['2xl'] }}>
            <Text color={theme.colors.textSecondary} size="lg">
              No threads found matching your criteria.
            </Text>
            <Button as={Link} to="/submit" style={{ marginTop: theme.spacing.md }}>
              <FiPlus />
              Start a New Discussion
            </Button>
          </Card>
        ) : (
          filteredThreads.map(thread => (
            <ThreadCard key={thread.id}>
              <ThreadHeader>
                <div style={{ flex: 1 }}>
                  <ThreadTitle to={`/threads/${thread.id}`}>
                    {thread.title}
                  </ThreadTitle>
                  <Text color={thread.isAnswered ? theme.colors.success : theme.colors.textSecondary} size="sm">
                    {thread.isAnswered ? '✓ Answered' : 'Open'}
                  </Text>
                </div>
              </ThreadHeader>

              <Text color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.md }}>
                {thread.content}
              </Text>

              <TagsContainer>
                {thread.tags.map(tag => (
                  <Badge key={tag} variant="primary">
                    {tag}
                  </Badge>
                ))}
              </TagsContainer>

              <ThreadMeta>
                <span>
                  <FiUser style={{ display: 'inline', marginRight: '4px' }} />
                  {thread.author}
                </span>
                <span>
                  <FiClock style={{ display: 'inline', marginRight: '4px' }} />
                  {formatDistanceToNow(thread.createdAt, { addSuffix: true })}
                </span>
              </ThreadMeta>

              <ThreadStats>
                <StatItem>
                  <FiMessageCircle />
                  <span>{thread.replies} replies</span>
                </StatItem>
                <StatItem>
                  <FiThumbsUp />
                  <span>{thread.likes} likes</span>
                </StatItem>
                <StatItem>
                  <span>{thread.views} views</span>
                </StatItem>
              </ThreadStats>
            </ThreadCard>
          ))
        )}
      </div>
    </Container>
  );
};

export default Threads;
