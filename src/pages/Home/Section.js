import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './Section.module.scss';
import { removeAccents } from '../../utils/helpers';

function Section(props) {
    const { children, type } = props;
    const producers = [...props.data, 'Xem tất cả'];
    let title = '';
    switch (type) {
        case 'phones':
            title = 'ĐIỆN THOẠI NỔI BẬT NHẤT';
            break;
        case 'laptops':
            title = 'LAPTOP';
            break;
        case 'PCs':
            title = 'MÀN HÌNH, MÁY TÍNH ĐỂ BÀN';
            break;
        case 'tablets':
            title = 'MÁY TÍNH BẢNG';
            break;
        case 'audio':
            title = 'ÂM THANH';
            break;
        case 'smartWatchs':
            title = 'ĐỒNG HỒ THÔNG MINH';
            break;
        case 'housewares':
            title = 'ĐỒ GIA DỤNG';
            break;
        case 'tivi':
            title = 'TIVI';
            break;
        case 'accessories':
            title = 'PHỤ KIỆN';
            break;
        case 'pcComponents':
            title = 'LINH KIỆN MÁY TÍNH';
            break;
        case 'secondHands':
            title = 'HÀNG CŨ';
            break;
        default:
            title = props.title;
            break;
    }
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.header)}>
                <h1>{title}</h1>
                <div className={clsx(styles.producers)}>
                    {producers.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                to={
                                    item.localeCompare('Xem tất cả')
                                        ? type.concat('/', removeAccents(item).replaceAll(' ', '-'))
                                        : type
                                }
                                className={clsx(styles.producer)}
                            >
                                {item}
                            </Link>
                        );
                    })}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Section;
