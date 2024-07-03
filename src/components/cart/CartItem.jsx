import { handleFormatMoney } from "../../utility/FormatData";
import CartModal from "../modal/CartModal";//Phải import thì mới dùng được các hàm truyền xuống từ component cha thông qua props
function CartItem({ item, handleAddQuantity, handleMinusQuantity, handleDeleteItem })
{
    return (
        <li className="flex justify-between items-center">
            <div className="flex items-center gap-5">
                <img className="h-14 border p-1 w-14 object-cover rounded-full" src={ item.product.image } alt="" />
                <div className="flex flex-col">
                    { item.product.productName }
                    <span>{ handleFormatMoney(item.product.price) }</span>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex gap-3">
                    <button onClick={ () => handleMinusQuantity(item) } className="h-6 leading-4 px-2 border rounded">
                        -
                    </button>
                    <span>
                        { item.quantity }
                    </span>
                    <button onClick={ () => handleAddQuantity(item) } className="h-6 leading-4 px-2 border rounded">
                        +
                    </button>
                </div>
                <i onClick={ () => handleDeleteItem(item) } className="fa-solid fa-trash cursor-pointer p-2 hover:bg-slate-50 rounded-full hover:text-black">
                </i>
            </div>
        </li>
    );
}

export default CartItem;