// import React from "react";
// import Products from "../Products";
// import Herosection from "../herosection/Herosection";
// import Footer from "../Footer";
// import { Button, Flex } from 'antd';

// export default function Homescreen({ onProductSelect }){
//     const ViewButton = () => (
//         <Flex wrap gap="small">
//           <Button type="primary" className="bigbutton">
//             View All
//           </Button>
//         </Flex>)
//     return(
//         <div className="homescreen">
//             <Herosection />
//             <Products onProductSelect={onProductSelect} />
//             <div className="viewbutton">
//               <ViewButton />
//             </div>
//         </div>
        
//     )
// }

import React from "react";
import Products from "../Products";
import Herosection from "../herosection/Herosection";
import { Button, Flex } from 'antd';

export default function Homescreen({ onProductSelect }) {
    const ViewButton = () => (
        <Flex wrap gap="small">
            <Button type="primary" className="bigbutton">
                View All
            </Button>
        </Flex>
    );

    return (
        <div className="homescreen">
            <Herosection />
            <Products onProductSelect={onProductSelect} />
            <div className="viewbutton">
                <ViewButton />
            </div>
        </div>
    );
}


