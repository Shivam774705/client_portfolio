# Vishnu Kumar Kesharwani - Pharma Professional Portfolio

A modern, highly optimized, and interactive professional portfolio website built for Vishnu Kumar Kesharwani, a Pharmaceutical Marketing Professional.

**Live Preview**: [https://vishnu-kesharwani.onrender.com](https://vishnu-kesharwani.onrender.com)

## ✨ Features
- **Premium UI/UX**: Glassmorphism design, smooth scroll, and custom cursor.
- **High Performance**: 100/100 Lighthouse scores in Accessibility, Best Practices, and SEO. Optimized with code-splitting, lazy loading, and `IntersectionObserver`.
- **Interactive Animations**: Powered by Framer Motion, featuring dynamic particle backgrounds and responsive timeline cards.
- **Fully Functional Contact Form**: Backend powered by Node.js, Express, and Nodemailer (Gmail integration).
- **Responsive Design**: Mobile-first architecture ensuring perfect layouts across all devices.

## 🛠️ Technology Stack
### Frontend
- **Framework**: React.js (via Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons

### Backend
- **Framework**: Node.js & Express.js
- **Email Service**: Nodemailer (Gmail SMTP)
- **Security**: CORS, Helmet

## 🚀 Quick Start
This project is structured as a monorepo containing both the frontend and backend.

### Prerequisites
- Node.js (v18+ recommended)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shivam774705/client_portfolio.git
   cd client_portfolio
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your Gmail credentials:
   ```env
   PORT=5000
   GMAIL_USER=your_email@gmail.com
   GMAIL_PASS=your_app_password
   FRONTEND_URL=http://localhost:5173
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   Open a new terminal window.
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🏗️ Build for Production
To build the frontend for production, ensuring maximum performance optimization:
```bash
cd frontend
npm run build
npm run preview
```

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).