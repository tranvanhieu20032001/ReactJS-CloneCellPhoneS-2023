import images from '../assets/img';

const categories = {
    accessories: [
        {
            title: 'Nổi bật',
        },
        {
            title: 'Phụ kiện Apple',
        },
        {
            title: 'Dán màn hình',
        },
        {
            title: 'Ốp lưng - Bao da',
        },
        {
            title: 'Cáp, sạc',
        },
        {
            title: 'Pin dự phòng',
        },
        {
            title: 'Thiết bị mạng',
        },
        {
            title: 'Gaming Gear',
        },
        {
            title: 'Gimbal | Tay cầm chống rung',
        },
        {
            title: 'Thẻ nhớ, USB',
        },
        {
            title: 'Chuột, bàn phím',
        },
        {
            title: 'Sim 4G',
        },
        {
            title: 'Sim số đẹp',
        },
        {
            title: 'Camera hành trình',
        },
        {
            title: 'Camera an ninh',
        },
        {
            title: 'Phụ kiện Laptop',
        },
        {
            title: 'Balo, túi chống sốc',
        },
        {
            title: 'Quạt mini',
        },
        {
            title: 'Ổ cứng di động',
        },
        {
            title: 'Apple Care',
        },
    ],
    pcComponents: [
        {
            title: 'PC ráp sẵn CellphoneS',
        },
        {
            title: 'CPU',
        },
        {
            title: 'Mainboard',
        },
        {
            title: 'RAM',
        },
        {
            title: 'Ổ cứng',
        },
        {
            title: 'Card màn hình',
        },
        {
            title: 'Nguồn máy tính',
        },
        {
            title: 'Tản nhiệt',
        },
        {
            title: 'Case máy tính',
        },
    ],
    secondHands: [
        {
            title: 'Điện thoại cũ',
        },
        {
            title: 'Máy tính bảng cũ',
        },
        {
            title: 'Mac cũ',
        },
        {
            title: 'Laptop cũ',
        },
        {
            title: 'Tai nghe cũ',
        },
        {
            title: 'Loa cũ',
        },
        {
            title: 'Đồng hồ thông minh cũ',
        },
        {
            title: 'Nhà thông minh cũ',
        },
        {
            title: 'Phụ kiện cũ',
        },
        {
            title: 'Màn hình cũ',
        },
        {
            title: 'Tivi cũ',
        },
    ],
};

Object.keys(categories).map((key) => {
    return categories[key].map((item, index) => {
        return (item.image = images.categories[key][index]);
    });
});

export default categories;
