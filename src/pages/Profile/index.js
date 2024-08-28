import clsx from 'clsx';
import styles from './Profile.module.scss';
import axios from 'axios';
import { webIcons } from '../../assets/img';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LuHome } from 'react-icons/lu';
import { formatCash, formatDate } from '../../utils/helpers';

function Profile(props) {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [userInfor, setUserInfor] = useState({
        username: '',
        phoneNumber: '',
        email: '',
    });
    const handleOnLogout = () => {
        localStorage.clear();
        navigate('/');
    };
    useEffect(() => {
        const customerId = localStorage.getItem('customerId');
        const username = localStorage.getItem('username');
        const phoneNumber = localStorage.getItem('userphone');
        const useremail = localStorage.getItem('useremail');
        setUserInfor({ ...userInfor, username: username, phoneNumber: phoneNumber, email: useremail });
        const fetchInvoiceByUser = async () => {
            const options = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('auth'),
                },
                url: `http://localhost:1337/api/invoices?populate[product_names][fields][1]=productName&filters[customer][$eq]=${customerId}&populate[product_names][fields][2]=sellPrice&populate[product_names][populate][image][fields][0]=url`,
                method: 'GET',
            };
            await axios
                .request(options)
                .then((response) => response.data)
                .then((result) => setInvoices([...result.data]))
                .catch((err) => console.log(err));
        };
        fetchInvoiceByUser();
        // eslint-disable-next-line
    }, []);
    console.log(invoices);

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.sidebar)}>
                <div className={clsx(styles.menu)}>
                    <div className={clsx(styles.itemMenu)}>
                        <LuHome className="text-[20px]" />
                        <Link to="/profile">Trang Cá Nhân</Link>
                    </div>
                    <div className="font-bold text-[16px] text-red-300 cursor-pointer" onClick={handleOnLogout}>
                        Thoát tài khoản
                    </div>
                </div>
            </div>
            <div className={clsx(styles.pageContent)}>
                <div className={clsx(styles.information)}>
                    <div className={clsx(styles.personalInformation)}>
                        <div className={clsx(styles.image)}>
                            <img src={webIcons.avatar} alt="" />
                        </div>
                        <div className={clsx(styles.info)}>
                            <div className={clsx(styles.infoItem)}>
                                <p id={clsx(styles.fullname)}>{userInfor.username}</p>
                                <Link to="" className={clsx(styles.edit)}></Link>
                            </div>
                            <div className={clsx(styles.infoItem)}>
                                <p id={clsx(styles.phoneNumber)}>{userInfor.phoneNumber}</p>
                                <Link to="" className={clsx(styles.edit)}></Link>
                            </div>
                            <div className={clsx(styles.infoItem)}>
                                <p>{userInfor.email}</p>
                                <Link to="" className={clsx(styles.edit)}></Link>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.orderInformation)}>
                        <h1 className="text-[30px]">{invoices.length}</h1>
                        <p>đơn hàng</p>
                    </div>
                    <div className={clsx(styles.history, 'bg-white p-3')}>
                        {/* <img src="./assets/img/empty.db6deab.svg" alt=""> */}
                        {/* <p className="text-[15px]">Không có đơn hàng nào thỏa mãn!</p> */}
                        {invoices.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className=" flex flex-col gap-5 border border-gray-200 rounded-2xl p-3"
                                >
                                    <h1 className="text-[15px] font-bold">
                                        Đơn Hàng ngày:{' '}
                                        <span className="text-red-300">
                                            {formatDate(item.attributes.createdAt, 'dd/mm/yyyy')}
                                        </span>
                                    </h1>
                                    <div className="flex gap-5">
                                        <h1 className="text-[15px] font-bold">
                                            Tổng tiền hoá đơn:{' '}
                                            <span className="text-red-300">
                                                {formatCash(item.attributes.totalPrice)}
                                            </span>
                                        </h1>
                                        <h1 className="text-[15px] font-bold">
                                            Số lượng sản phẩm:{' '}
                                            <span className="text-red-300">{item.attributes.quantity}</span>
                                        </h1>
                                    </div>
                                    {item.attributes['product_names'].data.map((product, index) => {
                                        return (
                                            <div key={index} className="flex gap-3 border-b-2 rounded border-gray-200">
                                                <div className="max-w-[10%]">
                                                    <img
                                                        src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
                                                        alt=""
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-5">
                                                    <p className="text-[20px] font-bold text-gray-300">
                                                        {product.attributes.productName}
                                                    </p>
                                                    <p className="text-[15px] font-bold text-red-300">
                                                        {formatCash(product.attributes.sellPrice)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
