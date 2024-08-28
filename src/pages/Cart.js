import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Cart.module.scss';
import { formatCash } from './../utils/helpers';
import { IoArrowBack, IoTrashOutline } from 'react-icons/io5';
import images from '../assets/img';

import QuantityInput from '../components/QuantityInput';
// dummy data
import productItems from '.././constants/productItems';

function CartPage(props) {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [fetchedDummyData, setFetchedDummyData] = useState(productItems.map((item) => ({ ...item, quantity: 1 })));

    // uncomment to test ui empty cart
    // const [fetchedDummyData, setFetchedDummyData] = useState([]);

    const selectAllRef = useRef();

    const handleQuantityOnChange = (quantity, id) => {
        setFetchedDummyData((prevData) =>
            prevData.map((item) => (item.id === id ? { ...item, quantity: quantity } : item)),
        );
    };

    const handleSelectAll = () => {
        if (!selectAll && selectedItems.length !== fetchedDummyData.length) {
            setSelectedItems([...fetchedDummyData.map((item) => item.id)]);
            setSelectAll(true);
        } else {
            setSelectedItems([]);
            setSelectAll(false);
        }
    };

    const handleSelectItem = (id) => {
        if (!selectedItems.includes(id)) {
            setSelectedItems([...selectedItems, id]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== id));
        }
    };

    const handleRemoveItem = (id) => {
        setFetchedDummyData([...fetchedDummyData.filter((item) => item.id !== id)]);
    };

    useEffect(() => {
        if (selectedItems.length === fetchedDummyData.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedItems, fetchedDummyData]);

    useEffect(() => {
        if (selectedItems.length !== 0) {
            setTotalPrice(0);
            fetchedDummyData.forEach((product) => {
                if (selectedItems.includes(product.id)) {
                    setTotalPrice((prev) => (prev += product.newPrice * product.quantity));
                }
            });
        } else {
            setTotalPrice(0);
        }
    }, [selectedItems, fetchedDummyData]);

    return fetchedDummyData.length > 0 ? (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.header)}>
                    <Link to="/">
                        <IoArrowBack className={clsx(styles.icon)} />
                    </Link>
                    <p className={clsx(styles.title)}>Giỏ hàng của bạn</p>
                </div>
                <div className={clsx(styles.groupBtn)}>
                    <div className={clsx(styles.selectAll)}>
                        <input
                            type="checkbox"
                            id="selectAll"
                            ref={selectAllRef}
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                        <label htmlFor="selectAll">Chọn tất cả</label>
                    </div>
                    <div className={clsx(styles.button)} onClick={() => setFetchedDummyData([])}>
                        Xoá tất cả sản phẩm trong giỏ hàng
                    </div>
                </div>
                <div className={clsx(styles.listProducts)}>
                    {fetchedDummyData.map((item, index) => {
                        return (
                            <div className={clsx(styles.productItem)} key={index}>
                                <div className={clsx(styles.checkBoxGroup)}>
                                    <input
                                        type="checkbox"
                                        name={item.id}
                                        id={item.id}
                                        onChange={() => {
                                            handleSelectItem(item.id);
                                        }}
                                        checked={selectAll || selectedItems.includes(item.id)}
                                    />
                                    <label htmlFor={item.id}>
                                        <img src={item.img} alt={item.name} />
                                    </label>
                                </div>
                                <div className={clsx(styles.info)}>
                                    <div>
                                        <Link className={clsx(styles.name)} to={item.href}>
                                            {item.name}
                                        </Link>
                                        <IoTrashOutline
                                            className={clsx(styles.icon)}
                                            onClick={() => handleRemoveItem(item.id)}
                                        />
                                    </div>
                                    <div>
                                        <div>
                                            <span className={clsx(styles.newPrice)}>{formatCash(item.newPrice)}</span>{' '}
                                            {item.oldPrice !== 0 ? (
                                                <span className={clsx(styles.oldPrice)}>
                                                    {formatCash(item.oldPrice)}
                                                </span>
                                            ) : null}
                                        </div>
                                        <QuantityInput id={item.id} onChange={handleQuantityOnChange} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={clsx(styles.totalPayment)}>
                    <div className={clsx(styles.priceTemp)}>
                        Tạm tính: <p className={clsx(styles.totalPrice)}>{formatCash(totalPrice)}</p>
                    </div>
                    <Link
                        to="/payment"
                        className={clsx(styles.button, { [styles.disable]: selectedItems.length === 0 })}
                    >
                        Mua Ngay
                    </Link>
                </div>
            </div>
        </div>
    ) : (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.header)}>
                    <Link to="/">
                        <IoArrowBack className={clsx(styles.icon)} />
                    </Link>
                    <p className={clsx(styles.title)}>Giỏ hàng của bạn</p>
                </div>
                <div className={clsx(styles.cartEmpty)}>
                    <img src={images.cartEmpty} alt="CartEmpty" width={262} height={197} />
                    <span>
                        Giỏ hàng của bạn đang trống.
                        <br /> Hãy chọn thêm sản phẩm để mua sắm nhé
                    </span>
                </div>
                <div className={clsx(styles.totalPayment)}>
                    <Link to="/" className={clsx(styles.buttonEmpty)}>
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
