import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiHelpCircle, FiTag, FiBook, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { 
  Container, 
  Card, 
  Button, 
  Input, 
  TextArea, 
  FormGroup, 
  Label, 
  ErrorText, 
  Heading, 
  Text, 
  Flex,
  Badge,
  LoadingSpinner 
} from '../styles/components';
import { theme } from '../styles/theme';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormCard = styled(Card)`
  padding: ${theme.spacing['2xl']};
`;

const CategorySelect = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  background-color: ${theme.colors.surface};
  color: ${theme.colors.textPrimary};
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }
`;

const TagInput = styled.div`
  position: relative;
`;

const TagsDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.sm};
  min-height: 30px;
`;

const TagBadge = styled(Badge)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.error}20;
    color: ${theme.colors.error};
  }
`;

const GuidelinesCard = styled(Card)`
  background-color: ${theme.colors.background};
  margin-bottom: ${theme.spacing.xl};
`;

const GuidelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: ${theme.colors.primary};
    width: 16px;
    height: 16px;
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

const categories = [
  'Mathematics',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering',
  'Business',
  'Economics',
  'Statistics',
  'Other'
];

const SubmitQuestion = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tagInput: ''
  });
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = formData.tagInput.trim();
    if (newTag && !tags.includes(newTag) && tags.length < 5) {
      setTags(prev => [...prev, newTag]);
      setFormData(prev => ({ ...prev, tagInput: '' }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Question description is required';
    } else if (formData.content.trim().length < 30) {
      newErrors.content = 'Please provide more details (at least 30 characters)';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (tags.length === 0) {
      newErrors.tags = 'Please add at least one tag';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: Submit to API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful submission
      const newQuestionId = Math.floor(Math.random() * 1000) + 1;
      navigate(`/threads/${newQuestionId}`);
    } catch (error) {
      setErrors({ submit: 'Failed to submit question. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <div style={{ marginBottom: theme.spacing.xl }}>
          <Heading level={2} style={{ marginBottom: theme.spacing.sm }}>
            Ask a Question
          </Heading>
          <Text color={theme.colors.textSecondary}>
            Get help from the UTD community. Be specific and clear to get the best answers.
          </Text>
        </div>

        <GuidelinesCard>
          <Heading level={5} style={{ marginBottom: theme.spacing.md, display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            <FiHelpCircle />
            Writing a Good Question
          </Heading>
          <GuidelineItem>
            <FiAlertCircle />
            <Text size="sm">Be specific and descriptive in your title</Text>
          </GuidelineItem>
          <GuidelineItem>
            <FiBook />
            <Text size="sm">Include relevant course codes, concepts, or assignment details</Text>
          </GuidelineItem>
          <GuidelineItem>
            <FiTag />
            <Text size="sm">Add appropriate tags to help others find and answer your question</Text>
          </GuidelineItem>
          <GuidelineItem>
            <FiHelpCircle />
            <Text size="sm">Show what you've tried and where you're stuck</Text>
          </GuidelineItem>
        </GuidelinesCard>

        <FormCard>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Question Title *</Label>
              <Input
                type="text"
                name="title"
                placeholder="e.g., How do I solve integration by parts in Calculus I?"
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
              />
              {errors.title && <ErrorText>{errors.title}</ErrorText>}
              <Text size="sm" color={theme.colors.textMuted}>
                Be specific and imagine you're asking a question to another student
              </Text>
            </FormGroup>

            <FormGroup>
              <Label>Category *</Label>
              <CategorySelect
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </CategorySelect>
              {errors.category && <ErrorText>{errors.category}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Tags *</Label>
              <TagInput>
                <Input
                  type="text"
                  name="tagInput"
                  placeholder="Add tags (press Enter or comma to add)"
                  value={formData.tagInput}
                  onChange={handleInputChange}
                  onKeyPress={handleTagInputKeyPress}
                  onBlur={addTag}
                />
              </TagInput>
              {errors.tags && <ErrorText>{errors.tags}</ErrorText>}
              <TagsDisplay>
                {tags.map(tag => (
                  <TagBadge 
                    key={tag} 
                    variant="primary"
                    onClick={() => removeTag(tag)}
                    title="Click to remove"
                  >
                    {tag} ×
                  </TagBadge>
                ))}
              </TagsDisplay>
              <Text size="sm" color={theme.colors.textMuted}>
                Add up to 5 tags to describe what your question is about
              </Text>
            </FormGroup>

            <FormGroup>
              <Label>Question Details *</Label>
              <TextArea
                name="content"
                placeholder="Describe your question in detail. Include:
• What specific concept you're working with
• What you've tried so far
• Where exactly you're getting stuck
• Any relevant course information or assignment details"
                value={formData.content}
                onChange={handleInputChange}
                rows={8}
                error={!!errors.content}
              />
              {errors.content && <ErrorText>{errors.content}</ErrorText>}
              <Text size="sm" color={theme.colors.textMuted}>
                The more details you provide, the better answers you'll receive
              </Text>
            </FormGroup>

            {errors.submit && (
              <ErrorText style={{ marginBottom: theme.spacing.md }}>
                {errors.submit}
              </ErrorText>
            )}

            <Flex justify="flex-end" gap="md">
              <Button 
                type="button" 
                variant="ghost"
                onClick={() => navigate('/threads')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Flex align="center" gap="sm">
                    <LoadingSpinner />
                    Posting Question...
                  </Flex>
                ) : (
                  'Post Question'
                )}
              </Button>
            </Flex>
          </form>
        </FormCard>
      </FormContainer>
    </Container>
  );
};

export default SubmitQuestion;
