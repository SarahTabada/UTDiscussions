import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        // TODO: Add proper token when backend implements JWT
        config.headers.Authorization = `Bearer ${userData.id}`;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid auth data
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types matching the Java backend models
export interface User {
  id: string;
  username: string;
  email?: string;
  fullName?: string;
  avatar?: string;
  joinedAt?: Date;
  reputation?: number;
  isVerified?: boolean;
}

export interface Question {
  id: number;
  title: string;
  body: string;
  author?: User;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
  category?: string;
  replies?: Reply[];
  likes?: number;
  dislikes?: number;
  views?: number;
  isAnswered?: boolean;
}

export interface Reply {
  id: number;
  body: string;
  author?: User;
  createdAt?: Date;
  likes?: number;
  dislikes?: number;
  isBestAnswer?: boolean;
  questionId?: number;
}

export interface CreateQuestionData {
  title: string;
  body: string;
  tags?: string[];
  category?: string;
}

export interface CreateReplyData {
  body: string;
  questionId: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

// Auth API
export const authAPI = {
  login: async (data: LoginData): Promise<{ user: User; token: string }> => {
    try {
      const response = await api.post('/auth/login', data);
      return response.data;
    } catch (error) {
      // Fallback to mock data for development
      console.warn('Using mock auth data - backend not available');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        username: data.email.split('@')[0],
        email: data.email,
        fullName: 'UTD Student',
        avatar: `https://ui-avatars.com/api/?name=${data.email.split('@')[0]}&background=C75B12&color=fff`,
        joinedAt: new Date('2023-08-01'),
        reputation: 150,
        isVerified: true
      };
      
      return { user: mockUser, token: 'mock-token' };
    }
  },

  register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      // Fallback to mock data for development
      console.warn('Using mock auth data - backend not available');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        avatar: `https://ui-avatars.com/api/?name=${data.fullName.replace(' ', '+')}&background=C75B12&color=fff`,
        joinedAt: new Date(),
        reputation: 0,
        isVerified: false
      };
      
      return { user: mockUser, token: 'mock-token' };
    }
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore errors on logout
      console.warn('Logout error (ignored):', error);
    }
  }
};

// Questions API
export const questionsAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sortBy?: string;
  }): Promise<{ questions: Question[]; total: number }> => {
    try {
      const response = await api.get('/questions', { params });
      return response.data;
    } catch (error) {
      console.warn('Using mock questions data - backend not available');
      // Return mock data for development
      return {
        questions: [], // Mock questions would go here
        total: 0
      };
    }
  },

  getById: async (id: number): Promise<Question> => {
    try {
      const response = await api.get(`/questions/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Using mock question data - backend not available');
      throw new Error('Question not found');
    }
  },

  create: async (data: CreateQuestionData): Promise<Question> => {
    try {
      const response = await api.post('/questions', data);
      return response.data;
    } catch (error) {
      console.warn('Using mock question creation - backend not available');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock created question
      const mockQuestion: Question = {
        id: Math.floor(Math.random() * 1000) + 1,
        title: data.title,
        body: data.body,
        tags: data.tags,
        category: data.category,
        createdAt: new Date(),
        likes: 0,
        dislikes: 0,
        views: 0,
        isAnswered: false,
        replies: []
      };
      
      return mockQuestion;
    }
  },

  update: async (id: number, data: Partial<CreateQuestionData>): Promise<Question> => {
    const response = await api.put(`/questions/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/questions/${id}`);
  },

  vote: async (id: number, type: 'up' | 'down'): Promise<void> => {
    await api.post(`/questions/${id}/vote`, { type });
  }
};

// Replies API
export const repliesAPI = {
  getByQuestionId: async (questionId: number): Promise<Reply[]> => {
    try {
      const response = await api.get(`/questions/${questionId}/replies`);
      return response.data;
    } catch (error) {
      console.warn('Using mock replies data - backend not available');
      return []; // Mock replies would go here
    }
  },

  create: async (data: CreateReplyData): Promise<Reply> => {
    try {
      const response = await api.post('/replies', data);
      return response.data;
    } catch (error) {
      console.warn('Using mock reply creation - backend not available');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock created reply
      const mockReply: Reply = {
        id: Math.floor(Math.random() * 1000) + 1,
        body: data.body,
        questionId: data.questionId,
        createdAt: new Date(),
        likes: 0,
        dislikes: 0,
        isBestAnswer: false
      };
      
      return mockReply;
    }
  },

  update: async (id: number, data: { body: string }): Promise<Reply> => {
    const response = await api.put(`/replies/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/replies/${id}`);
  },

  vote: async (id: number, type: 'up' | 'down'): Promise<void> => {
    await api.post(`/replies/${id}/vote`, { type });
  },

  markAsBestAnswer: async (id: number): Promise<void> => {
    await api.post(`/replies/${id}/best-answer`);
  }
};

// Users API
export const usersAPI = {
  getProfile: async (id?: string): Promise<User> => {
    const response = await api.get(`/users/${id || 'me'}`);
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    try {
      const response = await api.put('/users/me', data);
      return response.data;
    } catch (error) {
      console.warn('Using mock profile update - backend not available');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return updated mock user
      const currentUser = localStorage.getItem('user');
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        const updatedUser = { ...userData, ...data };
        return updatedUser;
      }
      throw new Error('User not found');
    }
  },

  getUserActivity: async (id?: string): Promise<any[]> => {
    try {
      const response = await api.get(`/users/${id || 'me'}/activity`);
      return response.data;
    } catch (error) {
      console.warn('Using mock activity data - backend not available');
      return []; // Mock activity data would go here
    }
  }
};

// Search API
export const searchAPI = {
  searchAll: async (query: string, filters?: {
    category?: string;
    tags?: string[];
    type?: 'questions' | 'replies' | 'users';
  }): Promise<{
    questions: Question[];
    replies: Reply[];
    users: User[];
  }> => {
    try {
      const response = await api.get('/search', { 
        params: { q: query, ...filters } 
      });
      return response.data;
    } catch (error) {
      console.warn('Using mock search data - backend not available');
      return {
        questions: [],
        replies: [],
        users: []
      };
    }
  }
};

export default api;