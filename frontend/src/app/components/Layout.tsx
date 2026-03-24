import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { WishlistProvider } from '../context/WishlistContext';
import { ChatProvider } from '../context/ChatContext';
import { ReviewProvider } from '../context/ReviewContext';

export function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <ChatProvider>
            <ReviewProvider>
              <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
                <Header />
                <div className="flex-1">
                  <Outlet />
                </div>
                <Footer />
              </div>
            </ReviewProvider>
          </ChatProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}