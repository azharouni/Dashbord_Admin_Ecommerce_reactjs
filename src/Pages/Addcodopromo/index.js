import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import "./index.css";
import { Typography } from "antd";


const AddCodePromo = () => {
const [loading, setLoading] = useState(false);

const onFinish = (values) => {
setLoading(true);
// appel à l'API pour ajouter le nouveau code promo
setLoading(false);
};

const onFinishFailed = (errorInfo) => {
console.log('Failed:', errorInfo);
};

return (
    <><Typography.Title level={4} style={{ color: 'rgb(220, 17, 17)' }}> Ajouter un  code promo </Typography.Title><div  className="container">
        <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelCol={{span:5}} labelAlign='left' >
            <Form.Item
                label="Code"
                name="code"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer un code promo!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Réduction (%)"
                name="reduction"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer une réduction en pourcentage!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Ajouter
                </Button>
            </Form.Item>
        </Form>
    </div></>
);
};

export default AddCodePromo;