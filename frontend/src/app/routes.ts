import { createBrowserRouter } from 'react-router';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Layout } from './components/Layout.js';
import { Home } from './pages/Home.js';
import { Browse } from './pages/Browse.js';
import { ItemDetail } from './pages/ItemDetail.js';
import { PostItem } from './pages/PostItem.js';
import { Wishlist } from './pages/Wishlist.js';
import { Chat } from './pages/Chat.js';
import { Login } from './pages/Login.js';
import { SignUp } from './pages/SignUp.js';
import { About } from './pages/About.js';
import { CustomerCare } from './pages/CustomerCare.js';
import { Profile } from './pages/Profile.js';
import { MyListings } from './pages/MyListings.js';
=======
>>>>>>> 170944ca248775a90c71923f2fb9d532fa0bffbe
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
<<<<<<< HEAD
=======
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242
>>>>>>> 170944ca248775a90c71923f2fb9d532fa0bffbe

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