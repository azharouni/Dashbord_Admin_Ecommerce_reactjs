
import "./index.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { editInventory } from "../../API";
import { Space, Typography } from "antd";



function Offreedit() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();


  useEffect(() => {
    // Fetch data for the offer with
    // the given id and pre-populate
    // the form with the offer's data
    setLoading(true);
    // Call your API to get the offer with the given id
    // and update the form fields with its data
    setLoading(false);
  }, [id]);

  const handleFormSubmit = (values) => {
    setLoading(true);
    editInventory(id, values)
      .then(() => {
        setLoading(false);
        // Redirect to the offers page
        // after successful submission
      })
      .catch((error) => {
        setLoading(false);
        // Handle submission errors here
      });
  };

  const handleClearForm = () => {
    form.resetFields();
  };

  return (
    <><Typography.Title level={4} style={{ color: 'rgb(220, 17, 17)' }}>Edit Offre  { id }  </Typography.Title
    >  <div className="container"><Form   labelCol={{span:8}} labelAlign='left'
      form={form}
      onFinish={handleFormSubmit}
      initialValues={{}} // Replace with an empty object
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Pourcentage de remise"
        name="discountPercentage"
        rules={[
          { required: true, message: "Please enter the discount percentage" },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Prix"
        name="price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label=" Date de début "
        name="startDate"
        rules={[{ required: true, message: "Please enter the start date" }]}
      >
        <Input type="date" />
      </Form.Item>

      <Form.Item
        label="Date de fin "
        name="endDate"
        rules={[{ required: true, message: "Please enter the end date" }]}
      >
        <Input type="date" />
      </Form.Item>

      <div className="button-container">
  <Button type="primary" htmlType="submit" loading={loading}>
    Modifier
  </Button>
  <Button type="default" onClick={handleClearForm}>
    Clear
  </Button>
</div>

     
    </Form> 
    </div>
    </>
  );
}

export default Offreedit;
