import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';

// ultilities & styles
import { formatCash } from '../../utils/helpers';
import { STATE_SUCCESS } from '../../constants';
import styles from './ProductDetails.module.scss';
import { AiFillStar } from 'react-icons/ai';
import { MdCurrencyExchange } from 'react-icons/md';
import { FaGift, FaCartPlus } from 'react-icons/fa6';

// components
import Modal from './Modal';
import SlideScrollable from '../../components/SlideScrollable';
import AlertMsg from '../../components/AlertMsg';

// dummy data
import productItems from '../../constants/productItems';

function ProductDetailsPage() {
    // const { products, brand, productDetails } = useParams();
    const location = useLocation();

    // start dummy data
    const product = productItems.filter((item) => {
        return item.href.localeCompare(location.pathname) === 0;
    })[0];

    var indents = [];
    for (let index = 0; index < 15; index++) {
        indents.push(product.img);
    }
    // end dummy data

    const [selectPrice, setSelectPrice] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [addAlertMsg, setAddAlertMsg] = useState();

    const handleOnClickPrice = () => {
        setSelectPrice(!selectPrice);
    };

    const handleShowModal = (data) => {
        if (data) {
            setShowModal(data);
        } else {
            setShowModal(!showModal);
        }
    };

    const handleUpdateSlideIndex = (index) => {
        setSlideIndex(index);
    };

    return (
        <>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.title)}>
                    <h1 className={clsx(styles.name)}>{product.name}</h1>
                    <div className={clsx(styles.rating)}>
                        <AiFillStar className={clsx(styles.icon)} />
                        <AiFillStar className={clsx(styles.icon)} />
                        <AiFillStar className={clsx(styles.icon)} />
                        <AiFillStar className={clsx(styles.icon)} />
                        <AiFillStar className={clsx(styles.icon)} />5 Đánh giá
                    </div>
                    <button className={clsx(styles.compareBtn)}> + So sánh</button>
                </div>
                <hr />

                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.leftBoxDetails)}>
                        <SlideScrollable
                            slideShowItemLength={indents.length}
                            translatePercent={50}
                            autoTranslate={false}
                            forceTranslateTo={slideIndex}
                            updateThumbnailIndex={handleUpdateSlideIndex}
                            settingSlideLayout={{
                                display: 'flex',
                                maxHeight: '400',
                            }}
                        >
                            {indents.map((slide, index) => {
                                return <img style={{ width: '100%' }} key={index} src={slide} alt={''} />;
                            })}
                        </SlideScrollable>

                        <SlideScrollable
                            settingSlideLayout={{ display: 'flex', gap: 10 }}
                            autoTranslate={false}
                            showBtn={false}
                            scrollable={true}
                        >
                            {indents.map((slide, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={clsx(styles.slideContent, { [styles.active]: index === slideIndex })}
                                        onClick={() => setSlideIndex(index)}
                                    >
                                        <img src={slide} alt={''} height={50} width={50} />
                                    </div>
                                );
                            })}
                        </SlideScrollable>
                    </div>
                    <div className={clsx(styles.rigthBoxDetail)}>
                        <div className={clsx(styles.prices)}>
                            <div
                                className={clsx(styles.priceItem, { [styles.active]: !selectPrice })}
                                onClick={handleOnClickPrice}
                            >
                                <MdCurrencyExchange className={styles.icon} />
                                <div className={clsx(styles.child)}>
                                    <p className={styles.updatePrice}>{formatCash(product.updatePrice)}</p>
                                    <span>Khi thu cũ lên đời</span>
                                </div>
                            </div>
                            <div
                                style={{ flexDirection: 'column' }}
                                className={clsx(styles.priceItem, { [styles.active]: selectPrice })}
                                onClick={handleOnClickPrice}
                            >
                                <p className={styles.newPrice}>{formatCash(product.newPrice)}</p>
                                <p className={styles.oldPrice}>{formatCash(product.oldPrice)}</p>
                            </div>
                        </div>
                        <div className={clsx(styles.peferential)}>
                            <div className={clsx(styles.title)}>
                                <FaGift className={clsx(styles.icon)} />
                                Khuyễn mãi
                            </div>
                            <table className={clsx(styles.details)}>
                                {product.peferential.map((prefer, index) => {
                                    return (
                                        <tbody key={index}>
                                            <td className={clsx(styles.detailNumb)}>{index}</td>
                                            <td>{prefer}</td>
                                        </tbody>
                                    );
                                })}
                            </table>
                        </div>
                        <div className={clsx(styles.groupBtns)}>
                            <div className={clsx(styles.group)}>
                                <div className={clsx(styles.btn)}>
                                    <p>Mua ngay</p>
                                    <p>(Giao nhanh tử 2 giờ hoặc nhận tại cửa hàng)</p>
                                </div>
                                <div
                                    className={clsx(styles.btn)}
                                    onClick={() =>
                                        setAddAlertMsg({ type: STATE_SUCCESS, msg: 'Thêm vào giỏ hàng thành công' })
                                    }
                                >
                                    <FaCartPlus />
                                    <p>Thêm vào giỏ hàng</p>
                                </div>
                            </div>
                            <div className={clsx(styles.group)}>
                                <div className={clsx(styles.btn)}>
                                    <p>Trả góp 0%</p>
                                    <p>Trả trước chỉ từ </p>
                                </div>
                                <div className={clsx(styles.btn)}>
                                    <p>Trả góp qua thẻ</p>
                                    <p>(Visa, Mastercard, JCB)</p>
                                </div>
                            </div>
                            <div className={clsx(styles.group)}>
                                <div className={clsx(styles.btn)} onClick={handleShowModal}>
                                    <p>Xem cấu hình chi tiết</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal ? (
                <Modal handleShowModal={handleShowModal} modalTitle={'Thông số kỹ thuật'}>
                    <div className={clsx(styles.content)}>
                        <h1 className={clsx(styles.title)}>Pin & Sạc</h1>
                        <table className={clsx(styles.description)}>
                            <tbody>
                                <tr>
                                    <td>Thời lượng pin</td>
                                    <td>
                                        <p>Tai nghe: 8 giờ</p>
                                        <p>Hộp sạc: 24 giờ</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Thời gian sạc</td>
                                    <td>
                                        <p>2 giờ</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Cổng sạc</td>
                                    <td>
                                        <p>Type-C</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal>
            ) : null}
            {addAlertMsg && <AlertMsg message={addAlertMsg} />}
        </>
    );
}

export default ProductDetailsPage;
