import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiMessageSquare, FiUsers, FiBookOpen, FiTrendingUp, FiPlus, FiSearch } from 'react-icons/fi';
import { Container, Card, Button, Flex, Heading, Text } from '../styles/components';
import { theme } from '../styles/theme';

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  color: white;
  padding: ${theme.spacing['3xl']} 0;
  margin-bottom: ${theme.spacing['2xl']};
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin: ${theme.spacing['2xl']} 0;
`;

const FeatureCard = styled(Card)`
  text-align: center;
  padding: ${theme.spacing.xl};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.full};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.md};
  color: white;

  svg {
    width: 28px;
    height: 28px;
  }
`;

const StatsSection = styled.section`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing['2xl']} 0;
  margin: ${theme.spacing['2xl']} 0;
  border-radius: ${theme.borderRadius.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.xl};
  text-align: center;
`;

const StatCard = styled.div`
  padding: ${theme.spacing.lg};
`;

const StatNumber = styled.div`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.fontWeights.medium};
`;

const CTASection = styled.section`
  text-align: center;
  padding: ${theme.spacing['2xl']} 0;
`;

const Home = () => {
  return (
    <>
      <HeroSection>
        <Container>
          <HeroContent>
            <Heading level={1} style={{ marginBottom: theme.spacing.lg }}>
              Welcome to UTDiscussions
            </Heading>
            <Text size="xl" style={{ marginBottom: theme.spacing.xl, opacity: 0.9 }}>
              The premier 24/7 academic support community for UTD students. Connect with peers, 
              find tutors, and get answers to your questions in a collaborative environment.
            </Text>
            <Flex justify="center" gap="md" wrap>
              <Button as={Link} to="/threads" size="lg">
                <FiSearch />
                Browse Discussions
              </Button>
              <Button as={Link} to="/submit" variant="outline" size="lg" style={{ color: 'white', borderColor: 'white' }}>
                <FiPlus />
                Ask a Question
              </Button>
            </Flex>
          </HeroContent>
        </Container>
      </HeroSection>

      <Container>
        <section>
          <Heading level={2} align="center" style={{ marginBottom: theme.spacing.xl }}>
            Why Choose UTDiscussions?
          </Heading>
          
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>
                <FiUsers />
              </FeatureIcon>
              <Heading level={4} style={{ marginBottom: theme.spacing.md }}>
                Peer-to-Peer Learning
              </Heading>
              <Text color={theme.colors.textSecondary}>
                Connect with fellow UTD students who understand your academic challenges and can provide relevant help.
              </Text>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FiBookOpen />
              </FeatureIcon>
              <Heading level={4} style={{ marginBottom: theme.spacing.md }}>
                Course-Specific Help
              </Heading>
              <Text color={theme.colors.textSecondary}>
                Get targeted assistance for your specific courses, from CS fundamentals to advanced mathematics.
              </Text>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FiMessageSquare />
              </FeatureIcon>
              <Heading level={4} style={{ marginBottom: theme.spacing.md }}>
                Organized Discussions
              </Heading>
              <Text color={theme.colors.textSecondary}>
                Find answers easily with organized threads, tags, and search functionality.
              </Text>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FiTrendingUp />
              </FeatureIcon>
              <Heading level={4} style={{ marginBottom: theme.spacing.md }}>
                Academic Success
              </Heading>
              <Text color={theme.colors.textSecondary}>
                Access past resources and proven strategies to excel in your academic journey.
              </Text>
            </FeatureCard>
          </FeatureGrid>
        </section>

        <StatsSection>
          <Container>
            <Heading level={3} align="center" style={{ marginBottom: theme.spacing.xl }}>
              Join Our Growing Community
            </Heading>
            <StatsGrid>
              <StatCard>
                <StatNumber>2,500+</StatNumber>
                <StatLabel>Active Students</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>15,000+</StatNumber>
                <StatLabel>Questions Answered</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>200+</StatNumber>
                <StatLabel>Study Groups</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>95%</StatNumber>
                <StatLabel>Success Rate</StatLabel>
              </StatCard>
            </StatsGrid>
          </Container>
        </StatsSection>

        <CTASection>
          <Heading level={3} style={{ marginBottom: theme.spacing.md }}>
            Ready to Get Started?
          </Heading>
          <Text size="lg" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.xl }}>
            Join thousands of UTD students who are already benefiting from our collaborative learning community.
          </Text>
          <Flex justify="center" gap="md" wrap>
            <Button as={Link} to="/threads" size="lg">
              Explore Discussions
            </Button>
            <Button as={Link} to="/submit" variant="outline" size="lg">
              Ask Your First Question
            </Button>
          </Flex>
        </CTASection>
      </Container>
    </>
  );
};

export default Home;
