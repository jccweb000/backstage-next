import React, { FC, useRef, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

// import { addShop, getShopDetail, updateShop } from '@/serves/org';

interface IShopModal {
  open?: boolean;
  changeOpen: (v?: boolean) => void;
  id?: string;
  refresh: () => void;
}

export const ShopModal: FC<IShopModal> = (props) => {
  const { open, id, changeOpen, refresh } = props;
  const [form] = Form.useForm();

  const onInternalClose = () => {
    form.resetFields();
    changeOpen?.(false);
  };

  useEffect(() => {
    if (id && open) {
      (async () => {
        // const res = await getShopDetail(id);
        // if (res.data) {
        //   formRef?.current?.setFieldsValue(res.data);
        // }
      })();
    }
  }, [id, open]);

  const onFinish = async () => {
    const values = await form.validateFields();
    // if (id) {
    //   const res = await updateShop({ ...values, shopCode: id });
    //   if (res) {
    //     refresh();
    //     formRef?.current?.resetFields();
    //     changeOpen(false);
    //   }
    // } else {
    //   const res = await addShop(values);
    //   if (res) {
    //     refresh();
    //     formRef?.current?.resetFields();
    //     changeOpen(false);
    //   }
    // }
  };

  return (
    <Modal
      title={id ? '编辑店铺' : '新增店铺'}
      open={open}
      onCancel={onInternalClose}
      footer={null}
      onOk={onFinish}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="店铺名称" name="shopName">
          <Input />
        </Form.Item>
        <Form.Item label="店铺地址" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="联系方式" name="phoneNumber">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
