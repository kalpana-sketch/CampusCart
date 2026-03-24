import { Outlet } from 'react-router';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { ThemeProvider } from '../context/ThemeContext.js';
import { AuthProvider } from '../context/AuthContext.js';
import { WishlistProvider } from '../context/WishlistContext.js';
import { ChatProvider } from '../context/ChatContext.js';
import { ReviewProvider } from '../context/ReviewContext.js';
=======
>>>>>>> 170944ca248775a90c71923f2fb9d532fa0bffbe
import { Header } from './Header';
import { Footer } from './Footer';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { WishlistProvider } from '../context/WishlistContext';
import { ChatProvider } from '../context/ChatContext';
import { ReviewProvider } from '../context/ReviewContext';
<<<<<<< HEAD
=======
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242
>>>>>>> 170944ca248775a90c71923f2fb9d532fa0bffbe

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