import clsx from 'clsx';

import styles from './DropDownBtn.module.scss';
import { useEffect, useRef, useState } from 'react';

function Button(props) {
    const {
        IconComponent = null,
        title = '',
        active = '',
        type = '',
        init = false,
        handleRemoveItemFilteringList = null,
        handleSelectedSortBtn = null,
    } = props;

    const [openMenu, setOpenMenu] = useState(false);
    const btnRef = useRef();

    const handleOnClick = () => {
        if (handleRemoveItemFilteringList !== null) {
            handleRemoveItemFilteringList(title.split(':')[0]);
        }
        if (handleSelectedSortBtn !== null) {
            handleSelectedSortBtn(btnRef.current);
            setOpenMenu(!openMenu);
        }
    };

    useEffect(() => {
        if (init) {
            handleSelectedSortBtn(btnRef.current);
        }
    }, []);

    return type.localeCompare('sortList') === 0 ? (
        <div className={clsx(styles.wrapper)} onClick={handleOnClick} ref={btnRef}>
            <div className={clsx(styles.dropDownBtn, { [styles.active]: active === btnRef.current })}>
                <IconComponent className={clsx(styles.icon)} />
                <p className={clsx(styles.title)}>{title}</p>
            </div>
        </div>
    ) : (
        <div className={clsx(styles.wrapper)} onClick={handleOnClick} ref={btnRef}>
            <div className={clsx(styles.dropDownBtn, { [styles.active]: true })}>
                <IconComponent className={clsx(styles.icon)} />
                <p className={clsx(styles.title)}>{title}</p>
            </div>
        </div>
    );
}

export default Button;
