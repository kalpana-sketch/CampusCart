import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Browse } from './pages/Browse';
import { ItemDetail } from './pages/ItemDetail';
import { PostItem } from './pages/PostItem';
import { Wishlist } from './pages/Wishlist';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { About } from './pages/About';
import { CustomerCare } from './pages/CustomerCare';
import { Profile } from './pages/Profile';
import { MyListings } from './pages/MyListings';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'browse', Component: Browse },
      { path: 'item/:id', Component: ItemDetail },
      { path: 'post', Component: PostItem },
      { path: 'wishlist', Component: Wishlist },
      { path: 'chat', Component: Chat },
      { path: 'login', Component: Login },
      { path: 'signup', Component: SignUp },
      { path: 'about', Component: About },
      { path: 'customer-care', Component: CustomerCare },
      { path: 'profile', Component: Profile },
      { path: 'my-listings', Component: MyListings },
    ],
  },
]);