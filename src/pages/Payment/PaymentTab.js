import clsx from 'clsx';

import styles from './PaymentTab.module.scss';
import parentStyles from './Payment.module.scss';
import { paymentIcons } from '../../assets/img/icons';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { formatCash } from '../../utils/helpers';

import Input from '../../components/Form/Input';

function PaymentTab(props) {
    const { totalPrice, checkoutProductList, paymentInfor, onPaymentInforChange } = props;
    const totalQuantity = checkoutProductList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0,
    );
    return (
        <>
            <div className={clsx(parentStyles.blockWrapper)}>
                <div className={clsx(styles.formGroup)}>
                    <Input
                        type={'text'}
                        id={'coupon'}
                        value={paymentInfor.coupon}
                        label={'Mã giảm giá'}
                        placeHolder={'Nhập mã giảm giá (chỉ áp dụng 1 lần)'}
                        onChange={(event) => onPaymentInforChange({ coupon: event.target.value })}
                    />
                    <div className={styles.button}>Áp dụng</div>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Số lượng sản phẩm <span>{totalQuantity}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Tiền hàng (tạm tính) <span>{formatCash(totalPrice)}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Phí vận chuyển <span>Miễn Phí</span>
                </div>
                <div className={clsx(styles.formGroup, styles.totalPrice)}>
                    Tổng tiền <span>{formatCash(totalPrice)}</span>
                </div>
            </div>
            <h1 className={clsx(styles.title)}>THÔNG TIN THANH TOÁN</h1>
            <div className={clsx(parentStyles.blockWrapper)}>
                <div className={clsx(styles.formGroup, styles.justifyLeft)}>
                    <img src={paymentIcons.cardsIcon} alt="cardsIcon" />
                    <span>Chọn phương thức thanh toán</span>
                    <MdOutlineKeyboardArrowRight className={clsx(styles.icon)} />
                </div>
            </div>
            <h1 className={clsx(styles.title)}>THÔNG TIN NHẬN HÀNG</h1>
            <div className={clsx(parentStyles.blockWrapper)}>
                <div className={clsx(styles.formGroup)}>
                    Khách hàng: <span>{paymentInfor.name}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Số điện thoại: <span>{paymentInfor.phoneNumber}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Email: <span>{paymentInfor.email}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Nhận hàng tại:{' '}
                    {paymentInfor.deliveryType === 'pickup' ? (
                        <span>{`${paymentInfor.deliveryInfor.address},${paymentInfor.deliveryInfor.district}, ${paymentInfor.deliveryInfor.city}`}</span>
                    ) : (
                        <span>{`${paymentInfor.deliveryInfor.address},${paymentInfor.deliveryInfor.ward},${paymentInfor.deliveryInfor.district},${paymentInfor.deliveryInfor.city}`}</span>
                    )}
                </div>
                {paymentInfor.receiver && (
                    <div className={clsx(styles.formGroup)}>
                        Người nhận:{' '}
                        <span>{`${paymentInfor.receiverInfor.name} - ${paymentInfor.receiverInfor.phoneNumber}`}</span>
                    </div>
                )}
            </div>
            <Input
                type={'checkbox'}
                id={'coupon'}
                value={true}
                label={'Bằng việc Đặt hàng, bạn đồng ý với Điều khoản sử dụng của CellphoneS.'}
                annote={
                    'Với các giao dịch từ 10 triệu trở lên, CellphoneS xin phép kiểm tra thẻ cứng và CCCD của đúng chủ thẻ trước khi tiến hành giao hàng nhằm hạn chế các trường hợp gian lận.'
                }
            />
        </>
    );
}

export default PaymentTab;
