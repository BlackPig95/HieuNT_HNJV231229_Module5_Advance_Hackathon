import { useContext, useState } from "react";
import { GlobalContext } from "../components/context/Global";

function Header({ handleOpenModal })
{
    const { cartLength } = useContext(GlobalContext);

    return (
        <header className="sticky top-0 z-20 bg-orange-400 w-full px-10 py-4 flex items-center justify-between text-white">
            <ul className="flex  gap-4 cursor-pointer">
                <li>Trang chủ</li>
                <li>Danh sách sản phẩm</li>
            </ul>
            <ul>
                <li className="cursor-pointer">
                    <i onClick={ handleOpenModal } className="text-2xl fa-solid fa-cart-shopping relative">
                        <span className="text-sm absolute bg-red-600 px-2 rounded-xl">
                            { cartLength }
                        </span>
                    </i>
                </li>
            </ul>
        </header>
    );
}

export default Header;