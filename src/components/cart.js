import React from "react";
import { Table, Button } from "antd";

export default function Cart({ cart, updateQuantity }) {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="product" style={{ width: 50 }} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div>
          <Button onClick={() => updateQuantity(record.id, record.quantity - 1)}>-</Button>
          <span style={{ margin: "0 10px" }}>{text}</span>
          <Button onClick={() => updateQuantity(record.id, record.quantity + 1)}>+</Button>
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) => record.price * record.quantity,
    },
  ];

  return <Table dataSource={cart} columns={columns} rowKey="id" />;
}
