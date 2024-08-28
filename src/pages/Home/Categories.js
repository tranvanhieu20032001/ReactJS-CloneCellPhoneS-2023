import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './Categories.module.scss';
import { removeAccents } from '../../utils/helpers';

function Categories(props) {
    const {data, type} = props;
    let backgroundColor = '';
    switch (type) {
        case 'accessories':
            backgroundColor = 'rgb(242, 131, 118)';
            break;
        case 'pcComponents':
            backgroundColor = 'rgb(252, 165, 165)';
            break;
        case 'secondHands':
            backgroundColor = 'rgb(214, 64, 68)';
            break;

        default:
            backgroundColor = 'rgb(242, 131, 118)';
            break;
    }
    return (
        <div className={clsx(styles.container)}>
            {data.map((item, index) => {
                return (
                    <Link
                        to={type.concat('/', removeAccents(item.title).replaceAll(" ", '-'))}
                        className={clsx(styles.category)}
                        key={index}
                        style={{ backgroundImage: `url(${item.image})`, backgroundColor: `${backgroundColor}` }}
                    >
                            <span>{item.title}</span>
                    </Link>
                );
            })}
        </div>
    );
}

export default Categories;
