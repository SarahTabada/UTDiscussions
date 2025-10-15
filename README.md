# UTDiscussions 🎓

A modern, responsive web application designed as the premier 24/7 academic support community for UTD students. This platform facilitates peer-to-peer learning, tutoring connections, and collaborative problem-solving through organized discussion threads.

## 🌟 Project Overview

UTDiscussions serves as the go-to source of academic support for UTD students, featuring:
- **Peer Tutoring Forum**: Connect students with tutors and study partners
- **Question & Answer System**: Get help with coursework and academic challenges  
- **Thread Organization**: Organized discussions with categories, tags, and search
- **Community Building**: Foster tutor-peer and peer-peer relationships
- **24/7 Accessibility**: Always available academic support platform

---

## 🚀 Live Application

**Access the application at: `http://localhost:5173`**

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast build tooling and development server
- **React Router v6** for client-side routing
- **Styled Components** for CSS-in-JS styling and theming
- **React Icons** for consistent iconography
- **Axios** for HTTP requests and API integration
- **date-fns** for date formatting and manipulation

### Backend Integration Ready
- **Java Spring Boot** backend support
- **RESTful API** integration layer
- **Mock data fallbacks** for development

---

## ✨ Features Implemented

### 🎨 **Modern UI/UX Design**
- **UTD Brand Colors**: Orange (#C75B12), Green (#00A651), Navy (#003366)
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Professional Theme System**: Consistent typography, spacing, and color schemes
- **Accessibility**: Proper contrast ratios and keyboard navigation

### 🔐 **Authentication System**
- **Login/Register Pages**: Beautiful forms with real-time validation
- **User Context Management**: Global authentication state with React Context
- **Protected Routes**: Secure access to authenticated features
- **User Profiles**: Avatar support, reputation system, and activity tracking

### 🏠 **Enhanced Landing Page**
- **Hero Section**: Compelling introduction with UTD branding
- **Feature Showcase**: Interactive cards highlighting platform benefits
- **Community Statistics**: Trust-building metrics and user engagement data
- **Clear CTAs**: Guided user flow to browse discussions or ask questions

### 💬 **Advanced Discussion System**
- **Thread Browsing**: Search, filter by category, and multiple sort options
- **Rich Thread Display**: Author info, timestamps, tags, engagement metrics
- **Thread Details**: Full conversation view with nested replies
- **Voting System**: Upvote/downvote functionality for quality content
- **Best Answer Marking**: Highlight most helpful responses

### ✍️ **Question Submission**
- **Rich Form Interface**: Title, category selection, dynamic tag system
- **Content Guidelines**: Helper text and best practices for quality questions
- **Form Validation**: Client-side validation with helpful error messages
- **Tag Management**: Dynamic tag addition/removal with visual feedback

### 👤 **User Profile System**
- **Comprehensive Profiles**: Avatar, stats, reputation, join date, activity feed
- **Activity Tracking**: Recent questions, replies, and community contributions
- **Profile Editing**: Update personal information with real-time validation
- **User Statistics**: Question count, helpful answers, community reputation

### 📱 **Mobile-First Responsive Design**
- **Mobile Navigation**: Collapsible menu with smooth animations
- **Touch-Friendly Interface**: Optimized touch targets and interactions
- **Adaptive Layouts**: Fluid layouts that work perfectly on all screen sizes
- **Progressive Enhancement**: Core functionality works without JavaScript

### 🔧 **Technical Excellence**
- **TypeScript Integration**: Full type safety throughout the application
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Smooth loading indicators and skeleton screens
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets

---

## 📁 Project Structure

```
UTDiscussions/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Auth.tsx          # Authentication forms
│   │   ├── Navbar.tsx        # Navigation component
│   │   └── ProtectedRoute.tsx # Route protection
│   ├── contexts/             # React Context providers
│   │   └── AuthContext.tsx   # Authentication state management
│   ├── pages/                # Main application pages
│   │   ├── Home.tsx          # Landing page
│   │   ├── Threads.tsx       # Discussion browser
│   │   ├── ThreadDetails.tsx # Individual thread view
│   │   ├── SubmitQuestion.tsx # Question submission form
│   │   └── UserProfile.tsx   # User profile and settings
│   ├── services/             # API integration layer
│   │   └── api.ts           # Backend communication with fallbacks
│   ├── styles/              # Styling system
│   │   ├── theme.ts         # Design system tokens
│   │   └── components.ts    # Styled components library
│   ├── App.tsx              # Main application component
│   └── index.tsx            # Application entry point
├── backend/                  # Java Spring Boot backend
├── package.json             # Dependencies and scripts
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SarahTabada/UTDiscussions.git
   cd UTDiscussions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

---

## 🔗 Backend Integration

The frontend includes a complete API service layer ready for Java Spring Boot integration:

### API Endpoints Supported
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/questions` - Fetch discussion threads
- `POST /api/questions` - Create new questions
- `GET /api/questions/:id` - Get thread details
- `POST /api/replies` - Submit replies
- `PUT /api/users/me` - Update user profile

### Mock Data Fallbacks
The application includes comprehensive mock data for development, allowing full functionality even without the backend running.

---

## 🎯 Competition Alignment

### WEHack General Track - "Timeless Moments Await"
- **Past**: Access to historical questions and proven solutions
- **Present**: Real-time peer support and collaborative learning
- **Future**: Building academic success and professional relationships

### Design Time with UX Club Track
- **Outstanding UI**: Modern, accessible interface with UTD branding
- **Seamless Usability**: Intuitive navigation and user-friendly design
- **Audience Resonance**: Specifically designed for UTD student needs
- **Functional Prototype**: Fully working application with rich features

---

## 🏆 Key Achievements

✅ **Complete Frontend Implementation**: Fully functional React application  
✅ **Modern Design System**: Professional UI with UTD branding  
✅ **Mobile Responsive**: Works perfectly on all devices  
✅ **Authentication Ready**: Secure user management system  
✅ **Backend Integration**: API layer ready for Java Spring Boot  
✅ **Type Safety**: Full TypeScript implementation  
✅ **Performance Optimized**: Fast loading and smooth interactions  
✅ **Accessibility Compliant**: WCAG guidelines followed  

---

## 📈 Future Enhancements

- Real-time chat and messaging system
- Advanced search with filters and sorting
- Gamification with badges and achievements  
- Course-specific discussion channels
- Mobile app development
- Integration with UTD course systems
- AI-powered question recommendations
- Video conferencing for study groups

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is part of the WEHack hackathon submission and is available for educational purposes.

---

## 👥 Team

**Developer**: Sarah Tabada  
**Institution**: University of Texas at Dallas  
**Event**: WEHack 2025  

---

## 📞 Support

For questions or support, please contact the development team or create an issue in this repository.

---

*Built with ❤️ for the UTD community*


