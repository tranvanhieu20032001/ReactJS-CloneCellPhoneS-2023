import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useState, forwardRef } from 'react';

// icon
import { AiFillStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import styles from './ProductCardDetailedMobile.module.scss';
import { formatCash } from '../utils/helpers';

const ProductCardDetailedMobile = forwardRef((props, ref) => {
    const { item = null } = props;

    let isPreferential = false;
    let isSaleOff = false;
    if (item.peferential.length > 0) {
        isPreferential = true;
    }
    if (item.oldPrice > 0 && item.percentOff != null) {
        isSaleOff = true;
    }

    return (
        <Link to={item.href} className={clsx(styles.productItem)} ref={ref}>
            <div className={clsx(styles.percentOffRibbon, { [styles.active]: isSaleOff })}>
                <p className={clsx(styles.percentOffDetail)}>Giảm {item.percentOff}</p>
            </div>
            <div className={clsx(styles.productImg)}>
                <img src={item.img} alt={item.name} />
            </div>
            <div className={clsx(styles.productDetails)}>
                <h3 className={clsx(styles.productName)}>{item.name}</h3>

                <div className={clsx(styles.productPrices)}>
                    <div className={clsx(styles.activePrice)}>
                        {formatCash(item.newPrice)}
                        <span className={clsx(styles.oldPrice, { [styles.active]: isSaleOff })}>
                            {formatCash(item.oldPrice)}
                        </span>
                    </div>
                    <div style={item.updatePrice > 0 ? { display: 'block' } : { display: 'none' }}>
                        Giá lên đời: <span className={clsx(styles.activePrice)}>{formatCash(item.updatePrice)}</span>
                    </div>
                </div>
                <div
                    className={clsx(styles.productPeferential, {
                        [styles.active]: isPreferential,
                    })}
                >
                    <p>{item.peferential[0]}</p>
                </div>

                <div className={clsx(styles.productRate)}>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                </div>
            </div>
            {/* <div
                className={clsx(styles.wishListBtn)}
                onMouseEnter={() => setIsHoverWishListBtn(true)}
                onMouseLeave={() => setIsHoverWishListBtn(false)}
            >
                Yêu thích
                {isHoverWishListBtn ? (
                    <AiFillHeart className={clsx(styles.wishListIcon)} />
                ) : (
                    <AiOutlineHeart className={clsx(styles.wishListIcon)} />
                )}
            </div> */}
        </Link>
    );
});

export default ProductCardDetailedMobile;
