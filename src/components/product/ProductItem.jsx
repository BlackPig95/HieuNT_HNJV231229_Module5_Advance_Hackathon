import { useContext } from "react";
import { handleFormatMoney } from "../../utility/FormatData";
import { GlobalContext } from "../context/Global";

function ProductItem({ product })
{
    const { handleAddToCart } = useContext(GlobalContext);
    return (
        <div className="border rounded shadow-md ">
            <img className="w-full max-h-[300px] min-h-[300px] object-cover" src={ product.image } alt={ product.id } />
            <div className="p-4 flex flex-col gap-4 flex-1">
                <h3 className="font-semibold text-center">
                    { product.productName }
                </h3>
                <div className="text-center">
                    { handleFormatMoney(product.price) }
                </div>
                <div className="text-center ">
                    <button onClick={ () => handleAddToCart(product) } className="outline-none bg-blue-500 text-white hover:bg-blue-400 focus:bg-blue-600 border px-4 h-9 rounded cursor-pointer">
                        <i className="fa-solid fa-cart-shopping mr-2">
                        </i>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;