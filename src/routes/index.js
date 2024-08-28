import Login from '../pages/Login';
import Register from '../pages/Register';
import HomePage from '../pages/Home';
import CartPage from '../pages/Cart';
import ProductDetailsPage from '../pages/productDetails';
import SearchPage from '../pages/Search';
import Layout from '../components/Layout';
import Payment from '../pages/Payment';
import Products from '../pages/products';

const publicRoutes = [
    { path: '/', component: HomePage, layout: Layout },
    { path: '/:products', component: Products, layout: Layout },
    { path: '/:products/:brand', component: Products, layout: Layout },
    { path: '/:products/:brand/:productDetails', component: ProductDetailsPage, layout: Layout },
    { path: '/cart', component: CartPage, layout: Layout },
    { path: '/searchResult', component: SearchPage, layout: Layout },
    { path: '/login', component: Login, layout: Layout },
    { path: '/register', component: Register, layout: Layout },
    { path: '/payment', component: Payment, layout: Layout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
