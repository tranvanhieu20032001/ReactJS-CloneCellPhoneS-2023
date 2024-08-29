import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';

// dummy data
import productItems from '../../constants/productItems';
import brands from '../../constants/brands';
import categories from '../../constants/categories';
import images from '../../assets/img';

// Component
import Catalog from '../../components/Catalog';
import BannerSlide from './BannerSlide';
import Section from './Section';
import Categories from './Categories';
import ProductCardDetailed from '../../components/ProductCardDetailed';
import SlideScrollable from '../../components/SlideScrollable';
import { useEffect, useState } from 'react';
import ProductCardDetailedMobile from '../../components/ProductCarDetailedMobile';

function HomePage() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 796);
    useEffect(() => {
        const handleResize = () => {
            console.log('window.innerWidth:', window.innerWidth);
            setIsMobile(window.innerWidth < 796);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    console.log('isMobile:', isMobile);
    const [paginationState, setPaginationState] = useState({});

    const itemsPerPage = 10;

    const getCurrentPage = (brandKey) => paginationState[brandKey]?.currentPage || 1;

    //cập nhật currentPage của từng brand
    const updatePageForBrand = (brandKey, newPage) => {
        setPaginationState((prevState) => ({
            ...prevState,
            [brandKey]: { currentPage: newPage },
        }));
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <section className={clsx(styles.topHome)}>
                <div className={clsx(styles.mainMenu)}>
                    <Catalog />
                </div>
                <div className={clsx(styles.slider)}>
                    <BannerSlide />
                </div>
                <div className={clsx(styles.banner)}>
                    {images.banners.topHomeBanner.map((banner, index) => {
                        return (
                            <Link to="/" key={index}>
                                <img src={banner} className={clsx(styles.banner)} alt="" />
                            </Link>
                        );
                    })}
                </div>
            </section>
            {Object.keys(brands).map((brandKey, index) => {
                const currentPage = getCurrentPage(brandKey);
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const currentItems = productItems.slice(indexOfFirstItem, indexOfLastItem);
                const totalPages = Math.ceil(productItems.length / itemsPerPage);

                const handlePrevPage = () => {
                    if (currentPage > 1) {
                        updatePageForBrand(brandKey, currentPage - 1);
                    }
                };

                const handleNextPage = () => {
                    if (currentPage < totalPages) {
                        updatePageForBrand(brandKey, currentPage + 1);
                    }
                };

                return (
                    <Section key={index} type={brandKey} data={brands[brandKey]}>
                        {!isMobile && (
                            <SlideScrollable
                                slideShowItemLength={Math.round(productItems.length / 2 - 5)}
                                translatePercent={20}
                                scrollable={true}
                                settingSlideLayout={{
                                    maxHeight: 926,
                                    display: 'flex',
                                    flexFlow: 'column wrap',
                                    gap: 10,
                                    padding: '0 5px',
                                }}
                            >
                                {productItems.map((item, index) => (
                                    <ProductCardDetailed item={item} key={index} />
                                ))}
                            </SlideScrollable>
                        )}
                        {isMobile && (
                            <>
                                <div className={clsx(styles.wrapperProduct)}>
                                    {currentItems.map((item, index) => (
                                        <ProductCardDetailedMobile item={item} key={index} />
                                    ))}
                                </div>
                                <div className={clsx(styles.pagination)}>
                                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                        Previous
                                    </button>
                                    <span>
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </Section>
                );
            })}

            {Object.keys(categories).map((type, index) => {
                return (
                    <Section key={index} type={type} data={[]}>
                        <Categories data={categories[type]} type={type} />
                    </Section>
                );
            })}

            <Section type={''} data={[]} title={'Ưu đãi thanh toán'}>
                <div className={clsx(styles.brandBanner)}>
                    {images.banners.paymentIncentive.map((banner, index) => {
                        return (
                            <Link key={index} to="/" className={clsx(styles.brandBannerImg)}>
                                <img src={banner} alt="" />
                            </Link>
                        );
                    })}
                </div>
            </Section>

            <Section type={''} data={[]} title={'chuyên trang thương hiệu'}>
                <div className={clsx(styles.brandBanner)}>
                    {images.banners.brandIncentive.map((banner, index) => {
                        return (
                            <Link key={index} to="/" className={clsx(styles.brandBannerImg)}>
                                <img src={banner} alt="" />
                            </Link>
                        );
                    })}
                </div>
            </Section>
            <Section type={''} data={[]} title={'tin công nghệ'}>
                <div className={clsx(styles.techNews)}>
                    {images.techNews.map((news, index) => {
                        return (
                            <Link key={index} to="/" className={clsx(styles.news)}>
                                <img src={news.img} alt="" className={clsx(styles.newsImg)} />
                                <p className={clsx(styles.newsTitle)}>{news.title}</p>
                            </Link>
                        );
                    })}
                </div>
            </Section>
        </div>
    );
}

export default HomePage;
