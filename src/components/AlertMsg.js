import clsx from 'clsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { STATE_SUCCESS, STATE_FAIL, STATE_PRIMARY, STATE_WARNING } from '../constants';

import styles from './AlertMsg.module.scss';
import { IoAlertSharp, IoClose, IoCheckmarkSharp, IoWarning } from 'react-icons/io5';

const Message = ({ id, type, content, onClose }) => {
    const [show, setShow] = useState(true);
    const messageRef = useRef();
    const handleOnClose = () => {
        setShow(false);
        onClose(id);
    };

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
            onClose(id);
        }, 5000);
    });
    return (
        <CSSTransition
            key={id}
            in={show}
            nodeRef={messageRef}
            timeout={1000}
            classNames={{ ...styles }} // Define your CSS transition class
            unmountOnExit
        >
            <div className={clsx(styles.container, styles[type])} ref={messageRef}>
                <div className={clsx(styles.icon)}>
                    {type === STATE_PRIMARY && <IoAlertSharp />}
                    {type === STATE_SUCCESS && <IoCheckmarkSharp />}
                    {type === STATE_FAIL && <IoClose />}
                    {type === STATE_WARNING && <IoWarning />}
                </div>
                <div className={clsx(styles.content)}>
                    <p>{content}</p>
                </div>
                <div className={clsx(styles.close)} onClick={handleOnClose}>
                    <IoClose />
                </div>
            </div>
        </CSSTransition>
    );
};

function AlertMsg(props) {
    const { message } = props;

    const [alertMsgs, setAlertMsgs] = useState([]);

    useEffect(() => {
        if (message) {
            // if you see the alert component showing 2 notifications at the same time when it render for
            // the first time, it's happening because React.StrictMode please turn it off then it won't happen again
            setAlertMsgs((prevAlertMsgs) => [...prevAlertMsgs, { id: uuidv4(), msg: message.msg, type: message.type }]);
        }
    }, [message]);

    const handleOnClose = (id) => {
        setAlertMsgs((prevAlertMsgs) => prevAlertMsgs.filter((msg) => msg.id !== id));
    };

    return (
        <TransitionGroup className={clsx(styles.alertMsgsGroup)}>
            {alertMsgs.map((item) => {
                return (
                    <Message key={item.id} id={item.id} type={item.type} content={item.msg} onClose={handleOnClose} />
                );
            })}
        </TransitionGroup>
    );
}

export default AlertMsg;
