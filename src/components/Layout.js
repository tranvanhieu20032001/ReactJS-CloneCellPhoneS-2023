import clsx from 'clsx';
import { useState, useEffect } from 'react';

import { IoIosArrowUp } from 'react-icons/io';

import styles from './Layout.module.scss';
import Header from './Header';
import Footer from './Footer';
import { useLocation, useParams } from 'react-router-dom';

function Layout({ children }) {
    const location = useLocation();
    const [goToTop, setGoToTop] = useState(false);
    const setBackground =
        location.pathname.localeCompare('/payment') === 0 || location.pathname.localeCompare('/cart') === 0;
    useEffect(() => {
        const handleScroll = () => setGoToTop(window.scrollY >= 200);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };
    return (
        <div className={clsx(styles.wrapper, { [styles.backgroundGray]: setBackground })}>
            <Header />
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.content)}>{children}</div>
            </div>
            {goToTop && (
                <button id={clsx(styles.backToTop)} onClick={handleScrollToTop}>
                    <IoIosArrowUp className={clsx(styles.icon)} />
                    <strong>Lên đầu</strong>
                </button>
            )}
            <Footer />
        </div>
    );
}

export default Layout;
