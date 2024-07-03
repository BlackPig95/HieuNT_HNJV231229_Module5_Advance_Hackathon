import { useContext } from "react";
import ProductItem from "./ProductItem";
import { GlobalContext } from "../context/Global";

function ProductList()
{
    const { productList } = useContext(GlobalContext);
    return (
        <main className="px-12">
            <h1 className="text-center py-4 text-2xl uppercase font-bold">DANH SÁCH SẢN PHẨM</h1>
            <div className="grid grid-cols-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {
                    productList.map((p) =>
                    {
                        return (<ProductItem key={ p.id } product={ p } />);
                    })
                }
            </div>
        </main>
    );
}

export default ProductList;