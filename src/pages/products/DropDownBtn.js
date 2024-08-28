import clsx from 'clsx';

import { FaCheck } from 'react-icons/fa6';
import { MdKeyboardArrowDown } from 'react-icons/md';

import styles from './DropDownBtn.module.scss';
import { useRef, useState } from 'react';

function DropDownBtn(props) {
    const {
        IconComponent = MdKeyboardArrowDown,
        title = '',
        openDropdown = '',
        menuData = [],
        filteringList,
        onSelectedFilter,
        onSelectedFilterItem,
    } = props;

    const [forceCloseDropdown, setForceCloseDropdown] = useState(false);
    const [selectedMenuItems, setSelectedMenuItems] = useState([]);
    const dropDownBtnRef = useRef();

    const handleSelectFilter = (event) => {
        event.stopPropagation();
        onSelectedFilter(dropDownBtnRef.current);
        if (menuData.length === 0) {
            onSelectedFilterItem({ [title]: [] });
        }
    };

    const handleSelectedMenuItems = (index) => {
        if (!selectedMenuItems.includes(index)) {
            setSelectedMenuItems([...selectedMenuItems, index]);
        } else {
            setSelectedMenuItems(selectedMenuItems.filter((item) => item !== index));
        }
    };


    const handleSelectedFilterItem = () => {
        let data = [];
        const key = title;
        selectedMenuItems.map((item) => {
            return data.push(menuData[item]);
        });
        onSelectedFilterItem({ [key]: data });
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <div
                className={clsx(styles.dropDownBtn, {
                    [styles.active]: openDropdown === dropDownBtnRef.current || filteringList.hasOwnProperty(title),
                })}
                onClick={(event) => {
                    handleSelectFilter(event);
                }}
                ref={dropDownBtnRef}
            >
                {IconComponent !== MdKeyboardArrowDown ? (
                    <>
                        <IconComponent className={clsx(styles.icon)} />
                        <p className={clsx(styles.title)}>{title}</p>
                    </>
                ) : (
                    <>
                        <p className={clsx(styles.title)}>{title}</p>
                        <IconComponent className={clsx(styles.icon, styles.left)} />
                    </>
                )}
            </div>
            {openDropdown === dropDownBtnRef.current && menuData.length !== 0 && !forceCloseDropdown ? (
                <div
                    className={clsx(styles.dropDownMenu)}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <ul className={clsx(styles.menu)}>
                        {menuData.map((item, index) => {
                            let isMenuItemSelected = selectedMenuItems.includes(index);
                            return (
                                <li
                                    key={index}
                                    className={clsx(styles.menuItem, { [styles.active]: isMenuItemSelected })}
                                    onClick={() => handleSelectedMenuItems(index)}
                                >
                                    {isMenuItemSelected && <FaCheck className={styles.icon} />}
                                    {item}
                                </li>
                            );
                        })}
                    </ul>

                    {selectedMenuItems.length > 0 && (
                        <div className={styles.childBtnGroup}>
                            <button className={styles.closeBtn} onClick={() => setForceCloseDropdown(true)}>
                                Đóng
                            </button>
                            <button className={styles.submitBtn} onClick={handleSelectedFilterItem}>
                                Xem kết quả
                            </button>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default DropDownBtn;
