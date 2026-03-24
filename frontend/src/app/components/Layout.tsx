import { Outlet } from 'react-router';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { ThemeProvider } from '../context/ThemeContext.js';
import { AuthProvider } from '../context/AuthContext.js';
import { WishlistProvider } from '../context/WishlistContext.js';
import { ChatProvider } from '../context/ChatContext.js';
import { ReviewProvider } from '../context/ReviewContext.js';

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