import { useContext, useMemo } from "react";
import { GlobalContext } from "../context/Global";
import { handleFormatMoney } from "../../utility/FormatData";
import CartItem from "../cart/CartItem";

function CartModal()
{
    const { cartItemList, handleSaveData } = useContext(GlobalContext);
    /**
     * Hàm xử lý việc tăng số lượng sản phẩm
     * @param {*} item Sản phẩm được chọn trong giỏ hàng
     */
    const handleAddQuantity = (item) =>
    {
        item.quantity += 1;
        handleSaveData("carts", [ ...cartItemList ]);
    };
    /**
     * Hàm giảm số lượng sản phẩm trong giỏ hàng
     * @param {*} item Sản phẩm được chọn trong giỏ hàng
     */
    const handleMinusQuantity = (item) =>
    {
        item.quantity -= 1;
        //Lấy ra danh sách sản phẩm hiện tại
        let updatedCart = [ ...cartItemList ];
        //Nếu số lượng sản phẩm giảm đến 0 thì xóa sản phẩm ra khỏi danh sách
        if (item.quantity <= 0)
        {
            updatedCart = [ ...cartItemList ].filter(cartItem => cartItem.id !== item.id);
        }
        //Cập nhật lại dữ liệu vào localStorage và re-render
        handleSaveData("carts", updatedCart);
    };
    /**
     * Hàm xóa sản phẩm ra khỏi giỏ hàng
     * @param {*} item Sản phẩm được chọn để xóa khỏi giỏ hàng
     */
    const handleDeleteItem = (item) =>
    {
        const updatedCart = [ ...cartItemList ].filter(cartItem => cartItem.id !== item.id);
        handleSaveData("carts", updatedCart);
    };
    /**
     * Dùng để cập nhật tổng số tiền trong giỏ hàng
     * total: Tổng số tiền cần hiển thị
     * cartItemList: Danh sách các sản phẩm có trong giỏ hàng
     * item: Từng sản phẩm có trong giỏ hàng
     */
    const totalCost = useMemo(() =>
    {
        return cartItemList.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }, [ cartItemList ]);
    return (
        <div className="bg-black w-[550px] text-white rounded px-5 py-4 fixed right-1 top-16 ">
            <h3 className=" font-semibold text-2xl mb-2">Cart</h3>
            <hr />
            <ul className="flex flex-col gap-4 mt-3 pr-5 min-h-[300px] max-h-[500px] overflow-auto">
                { cartItemList.length === 0 ? <h1 className="text-center font-bold text-xl">Chưa có sản phẩm trong giỏ hàng</h1>
                    :
                    cartItemList.map((item) =>
                    {
                        return (<CartItem key={ item.id } item={ item } handleAddQuantity={ handleAddQuantity } handleMinusQuantity={ handleMinusQuantity } handleDeleteItem={ handleDeleteItem } />);
                    })
                }
            </ul>
            <hr className="mt-5" />
            <footer className="flex items-center gap-5 pt-5">
                <span>Tổng tiền:</span>
                <span>{ handleFormatMoney(totalCost) }</span>
            </footer>
        </div>
    );
}

export default CartModal;