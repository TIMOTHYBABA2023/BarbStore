// import React from "react";
// import Product from "./Product";
// import products from "./products.json";
// // import { Button, Flex } from 'antd';

// export default function Products({ onProductSelect }) {
//     const uniqueCategories = products.reduce((acc, product) => {
//         if (!acc.some(item => item.category === product.category)) {
//             acc.push(product);
//         }
//         return acc;
//     }, []);

//     const handleProductClick = (product) => {
//         if (typeof onProductSelect === 'function') {
//             onProductSelect(product);
//         } else {
//             console.error("onProductSelect is not a function");
//         }
//     };

//     const storeproductgotten = uniqueCategories.map(product => (
//         <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
//             <Product {...product} />
//         </div>
//     ));

//     return (
//         <div className="products">
//             <div className="my--products">
//                 {storeproductgotten}
//             </div>
//         </div>
//     );
// }

import React from "react";
import Product from "./Product";
import products from "./products.json";

export default function Products({ onProductSelect }) {
    const uniqueCategories = products.reduce((acc, product) => {
        if (!acc.some(item => item.category === product.category)) {
            acc.push(product);
        }
        return acc;
    }, []);

    const handleProductClick = (product) => {
        if (typeof onProductSelect === 'function') {
            onProductSelect(product);
        } else {
            console.error("onProductSelect is not a function");
        }
    };

    const storeproductgotten = uniqueCategories.map(product => (
        <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
            <Product {...product} />
        </div>
    ));

    return (
        <div className="products">
            <div className="my--products">
                {storeproductgotten}
            </div>
        </div>
    );
}
