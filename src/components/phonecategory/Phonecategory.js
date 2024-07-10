import React from "react";
import Product from "../Product";
import { Button, Flex, Pagination } from 'antd';
import categoryitems from "../../components/categoryitems.json";
import products from "../products.json";
import Phonesection from "./Phonesection";

export default function Phonecategory({ selectedProduct, onProductClick }) {

    const Demo = () => (
        <Flex wrap gap="small">
          {categoryitems.map((item) => (
            <Button key={item.id} type="default" align="center">
              {item.label}
            </Button>
          ))}
        </Flex>
    );



    const ViewButton = () => (
        <Flex wrap gap="small">
          <Button type="primary" className="bigbutton">
            View All
          </Button>
        </Flex>);
    const Pagenumbering = () => <Pagination defaultCurrent={6} total={500} className="position-center" />;

    
    // Filter products to display only those of the same category as selectedProduct
    const categoryProducts = products.filter(product =>
        product.category === selectedProduct.category && product.id !== selectedProduct.id
    ).slice(0, 5);

    // Combine selectedProduct and categoryProducts
    const displayProducts = [selectedProduct, ...categoryProducts];

    return (
        <div className="phonecategory">
            <Phonesection />
            <div>
            <div>
                <div>Home/ Phones</div>
                <div>CATEGORIES</div>
            </div>
            <div>
                <div><img src="" alt="" /></div>
                <div><img src="" alt="" /></div>
                <div>2</div>
            </div>
        </div>
        <div className="demo">
            <Demo />
        </div>
            <div className="category-products">
                {displayProducts.map(product => (
                    <div key={product.id} className="product-item" onClick={() => onProductClick(product)}>
                        <Product {...product} />
                    </div>
                ))}
            </div>
            <Pagenumbering />
            <ViewButton />
        </div>
        
    );
}


