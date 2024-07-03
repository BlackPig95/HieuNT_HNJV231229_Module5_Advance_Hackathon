import { createContext, useState } from "react";
import Header from "../../layout/Header";
import ProductList from "../product/ProductList";
import ProductJSON from "../../data.json";
import CartModal from "../modal/CartModal";

export const GlobalContext = createContext();
function Global()
{
    //Dùng để làm key cho việc cập nhật productList trên localStorage
    const productKey = "products";
    //Dùng để làm key để làm việc với đối tượng shopping cart
    const cartKey = "carts";
    //Khởi tạo dữ liệu mẫu ban đầu bằng file JSON
    localStorage.setItem(productKey, JSON.stringify(ProductJSON.products));
    //Lấy về danh sách sản phẩm đã lưu trong localStorage
    //Vì dữ liệu về product được fix cứng bằng file JSON nên tạm thời hàm setProductList không được dùng đến
    const [ productList, setProductList ] = useState(() =>
    {
        return JSON.parse(localStorage.getItem(productKey)) || [];
    });
    //Lấy về danh sách các sản phẩm có trong shopping cart
    const [ cartItemList, setCartItemList ] = useState(() =>
    {
        return JSON.parse(localStorage.getItem(cartKey)) || [];
    });
    /**
     * Hàm xử lý việc thêm sản phẩm vào giỏ hàng/ shopping cart
     * @param {*} product Sản phẩm được thêm vào giỏ hàng
     */
    const handleAddToCart = (product) =>
    {   //Đối tượng dùng để cập nhật lại mảng các sản phẩm trong giỏ hàng
        let updatedCart = null;
        //Kiểm tra xem sản phẩm này đã tồn tại trong shopping cart chưa
        const productIndex = cartItemList.findIndex(c => c.product.id === product.id);
        //Nếu sản phẩm chưa tồn tại thì thêm mới
        if (productIndex === -1)
        {
            const newCartItem = {
                //Id tự tăng
                id: (cartItemList[ cartItemList.length - 1 ]?.id + 1) || 0,
                product: product,
                quantity: 1,
            };
            //Cập nhật sản phẩm mới vào list shopping cart
            updatedCart = [ ...cartItemList, newCartItem ];
        }
        else
        {//Nếu sản phẩm đã tồn tại thì chỉ tăng số lượng
            cartItemList[ productIndex ].quantity += 1;
            updatedCart = [ ...cartItemList ];
        }
        handleSaveData(cartKey, updatedCart);
    };
    /**
     * Hàm hỗ trợ việc lưu dữ liệu và kích hoạt re-render bằng cách cập nhật lại state
     * @param {*} key Key của dữ liệu lưu trong localStorage
     * @param {*} data Value của key ở trên = dữ liệu cần lưu vào localStorage
     */
    const handleSaveData = (key, data) =>
    {
        switch (key)
        {
            case cartKey:
                setCartItemList(data);
                break;
            case productKey:
                setProductList(data);
                break;
        }
        localStorage.setItem(key, JSON.stringify(data));
    };
    //Dùng để kiểm soát việc đóng mở Modal Shopping Cart
    const [ openModal, setOpenModal ] = useState(false);
    const handleOpenModal = () =>
    {
        setOpenModal(prev => !prev);
    };
    //Đối tượng dùng để cung cấp các dữ liệu global cho các component cần sử dụng các dữ liệu này
    const globalData = {
        productList,
        handleAddToCart,
        handleSaveData,
        cartLength: cartItemList.length,
        cartItemList,
    };

    return (
        <GlobalContext.Provider value={ globalData }>
            { openModal && <CartModal /> }
            <Header handleOpenModal={ handleOpenModal } />
            <ProductList />
        </GlobalContext.Provider>
    );
}

export default Global;