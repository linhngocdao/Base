import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProducts } from "~/models/interface.ts";
import { updateProduct } from "~/api/product.ts";

const ProductUpdate: React.FC<{ open: boolean; onClose: () => void; product: IProducts }> = ({ open, onClose, product }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => form.submit();
  const handleCancel = () => onClose();
  const queryClient = useQueryClient();

  const mutationUpdateProduct = useMutation({
    mutationFn: (data: IProducts) => {
      return updateProduct(data)
    }
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      await mutationUpdateProduct.mutateAsync({ ...product, ...values });
      message.success('Cập nhật sản phẩm thành công');
      await queryClient.invalidateQueries({queryKey: ['productList']})
      onClose();
      form.resetFields();
    } catch (errorInfo) {
      message.error('Cập nhật sản phẩm không thành công');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div>
      <Modal
        title="Add Product"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{required: true, message: 'Please input your name!'}]}
            labelCol={{span: 24}}
            wrapperCol={{span: 24}}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Product price"
            name="price"
            rules={[{required: true, message: 'Please input your price!'}]}
            labelCol={{span: 24}}
            wrapperCol={{span: 24}}
          >
            <InputNumber style={{width: '100%'}}/>
          </Form.Item>
          <Form.Item
            label="Product desc"
            name="desc"
            labelCol={{span: 24}}
            wrapperCol={{span: 24}}
          >
            <Input.TextArea/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductUpdate;
