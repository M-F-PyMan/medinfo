import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import HomePage2 from './pages/HomePage2';
import HomePage3 from './pages/HomePage3';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailedPage from './pages/PaymentFailedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoginPageNew from './pages/LoginPageNew';
import RegisterPageNew from './pages/RegisterPageNew';
import VerifyCodePage from './pages/VerifyCodePage';
import VerifyLoginCodePage from './pages/VerifyLoginCodePage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import DashboardPage from './pages/DashboardPage';
import GamificationPage from './pages/GamificationPage';
import NotificationsPage from './pages/NotificationsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';
import ProfilePage from './pages/ProfilePage';
import InstructorsPage from './pages/InstructorsPage';
import InstructorProfilePage from './pages/InstructorProfilePage';
import WalletPage from './pages/WalletPage';
import AdminPage from './admin/AdminPage.tsx';
import SpecialSalePage1 from './pages/SpecialSalePage1';
import SpecialSalePage2 from './pages/SpecialSalePage2';
import NewsletterPage from './pages/NewsletterPage';
import CommunityPage from './pages/CommunityPage';
import CareersPage from './pages/CareersPage';
import HelpCenterPage from './pages/HelpCenterPage';
import HelpPage from './pages/HelpPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import NotificationContainer from './components/NotificationContainer';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <NotificationContainer />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white rtl">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="home2" element={<HomePage2 />} />
                <Route path="home3" element={<HomePage3 />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="course/:id" element={<CourseDetailsPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="payment-success" element={<PaymentSuccessPage />} />
                <Route path="payment-failed" element={<PaymentFailedPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="gamification" element={<GamificationPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:id" element={<BlogPostPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="instructors" element={<InstructorsPage />} />
                <Route path="instructor/:id" element={<InstructorProfilePage />} />
                <Route path="wallet" element={<WalletPage />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path="special-sale-1" element={<SpecialSalePage1 />} />
                <Route path="special-sale-2" element={<SpecialSalePage2 />} />
                <Route path="newsletter" element={<NewsletterPage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="careers" element={<CareersPage />} />
                <Route path="help" element={<HelpCenterPage />} />
                <Route path="help-center" element={<HelpPage />} />
              </Route>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login-new" element={<LoginPageNew />} />
              <Route path="register-new" element={<RegisterPageNew />} />
              <Route path="verify-code" element={<VerifyCodePage />} />
              <Route path="verify-login-code" element={<VerifyLoginCodePage />} />
              <Route path="registration-success" element={<RegistrationSuccessPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
                      </div>
          </Router>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;