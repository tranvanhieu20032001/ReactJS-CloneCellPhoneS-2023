import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from './InforTab.module.scss';


import Input from '../../components/Form/Input';
import DeliveryOptiosForm from './DeliveryOptionsForm';

function InforTab(props) {
    const { paymentInfor, onPaymentInforChange, onDeliveriOptionsFormChange } = props;

    const [showCompanyInforForm, setShowCompanyInforForm] = useState(false);
    const [showReceiverForm, setShowReceiverForm] = useState(false);

    useEffect(() => {
        setShowCompanyInforForm(paymentInfor.VAT);
    }, [paymentInfor.VAT]);

    useEffect(() => {
        setShowReceiverForm(paymentInfor.receiver);
    }, [paymentInfor.receiver]);

    return (
        <>
            <h1 className={clsx(styles.title)}>THÔNG TIN KHÁCH HÀNG</h1>
            <div className={clsx(styles.blockWrapper)}>
                <form className={clsx(styles.form)}>
                    <div className={clsx(styles.formGroup)}>
                        <Input
                            type={'text'}
                            id={'name'}
                            value={paymentInfor.name}
                            label={'Họ và tên'}
                            placeHolder={'Họ và tên (Bắt buộc)'}
                            onChange={onPaymentInforChange}
                        />
                        <Input
                            type={'text'}
                            id={'phoneNumber'}
                            value={paymentInfor.phoneNumber}
                            label={'Số điện thoại'}
                            placeHolder={'Số điện thoại (Bắt buộc)'}
                            onChange={onPaymentInforChange}
                        />
                    </div>
                    <Input
                        type={'text'}
                        id={'email'}
                        value={paymentInfor.email}
                        label={'email'}
                        annote={'(*) Hóa đơn VAT sẽ được gửi qua email này'}
                        placeHolder={'email'}
                        alertMsg={'không để trống mail'}
                        onChange={onPaymentInforChange}
                    />
                    <Input
                        type={'checkbox'}
                        id={'notification'}
                        value={paymentInfor.notification}
                        label={'Nhận email thông báo và ưu đãi từ CellphoneS'}
                        onChange={onPaymentInforChange}
                    />
                </form>
            </div>
            <h1 className={clsx(styles.title)}>THÔNG TIN NHẬN HÀNG</h1>
            <div className={clsx(styles.blockWrapper)}>
                <div className={clsx(styles.deliveriTabs)}>
                    <div
                        className={clsx(styles.deliveriTab, {
                            [styles.active]: paymentInfor.deliveryType === 'pickup',
                        })}
                    >
                        <input
                            id="pickup"
                            type="radio"
                            name="deliveryType"
                            value={'pickup'}
                            checked={paymentInfor.deliveryType === 'pickup'}
                            onChange={(event) => onPaymentInforChange({ deliveryType: event.target.value })}
                        />
                        <label htmlFor="pickup">Nhận tại cửa hàng</label>
                    </div>
                    <div
                        className={clsx(styles.deliveriTab, {
                            [styles.active]: paymentInfor.deliveryType === 'delivery',
                        })}
                    >
                        <input
                            id="delivery"
                            type="radio"
                            name="deliveryType"
                            value={'delivery'}
                            checked={paymentInfor.deliveryType === 'delivery'}
                            onChange={(event) => onPaymentInforChange({ deliveryType: event.target.value })}
                        />
                        <label htmlFor="delivery">Giao hàng tận nơi</label>
                    </div>
                </div>
                <DeliveryOptiosForm
                    type={paymentInfor.deliveryType}
                    value={paymentInfor.deliveryInfor}
                    onChange={onDeliveriOptionsFormChange}
                />
            </div>
            <Input
                type={'checkbox'}
                id={'VAT'}
                value={paymentInfor.VAT}
                label={'Yêu cầu xuất hoá đơn công ty '}
                annote={
                    'Với đơn hàng trên 20 triệu đồng, vui lòng thanh toán bằng phương thức chuyển khoản từ tài khoản công ty hoặc bằng thẻ công ty. Xem chính sách'
                }
                onChange={onPaymentInforChange}
            />
            {showCompanyInforForm && (
                <div className={clsx(styles.blockWrapper)}>
                    <form className={clsx(styles.form)}>
                        <Input
                            type={'text'}
                            id={'companyInforName'}
                            value={paymentInfor.companyInfor.name}
                            label={'Tên công ty'}
                            placeHolder={'Tên công ty'}
                            onChange={onPaymentInforChange}
                        />
                        <Input
                            type={'text'}
                            id={'companyInforAddress'}
                            value={paymentInfor.companyInfor.address}
                            label={'Địa chỉ công ty'}
                            placeHolder={'Địa chỉ công ty'}
                            onChange={onPaymentInforChange}
                        />
                        <Input
                            type={'text'}
                            id={'companyInforTaxCode'}
                            value={paymentInfor.companyInfor.taxCode}
                            label={'Mã số thuế'}
                            placeHolder={'Mã số thuế'}
                            onChange={onPaymentInforChange}
                        />
                    </form>
                </div>
            )}
            <Input
                type={'checkbox'}
                id={'receiver'}
                value={paymentInfor.receiver}
                label={'Nhờ người khác nhận hàng'}
                onChange={onPaymentInforChange}
            />
            {showReceiverForm && (
                <div className={clsx(styles.blockWrapper)}>
                    <form className={clsx(styles.form)}>
                        <Input
                            type={'text'}
                            id={'receiverInforName'}
                            value={paymentInfor.receiverInfor.name}
                            label={'Họ và tên'}
                            placeHolder={'Họ và tên (Bắt buộc)'}
                            onChange={onPaymentInforChange}
                        />
                        <Input
                            type={'text'}
                            id={'receiverInforPhoneNumber'}
                            value={paymentInfor.receiverInfor.phoneNumber}
                            label={'Số điện thoại'}
                            placeHolder={'Số điện thoại (Bắt buộc)'}
                            onChange={onPaymentInforChange}
                        />
                    </form>
                </div>
            )}
        </>
    );
}

export default InforTab;
