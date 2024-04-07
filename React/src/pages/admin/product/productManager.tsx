import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Switch, Table, message, Input, Flex, Tooltip, Tag } from "antd";
import { SwitchChangeEventHandler } from "antd/es/switch";
import {deleteProduct, getProducts, updateProduct} from "~/api/product";
import { IProducts } from "~/models/interface";
import { useState } from "react";
import ProductUpdate from "~/pages/admin/product/productUpdate.tsx";

interface IRemoveProduct {
  _id: string
}
const ProductList = (prop: IRemoveProduct) => {
  const [open, setOpen] = useState(false);

  const {
    isError,
    isLoading,
    data: listProduct,
  } = useQuery({
    queryKey: ['productList'],
    queryFn: () => getProducts()
  });
  const queryClient = useQueryClient();
  const product = listProduct?.data || [];

  const {_id} = prop;
  const mutationRemove = useMutation({
    mutationFn: (_id: string | undefined ) => {
      return deleteProduct(_id)
    }
  });
  const confirm = (_id) => {
    mutationRemove.mutate(_id, {
      onSuccess: () => {
        message.success('Bạn đã xóa thành công')
        queryClient.invalidateQueries({ queryKey: ['productList'] })
      },
      onError: (error: any) => {
        message.error(error.response.data.message || 'Xóa không thành công')
      }
    })

  };
  const mutationUpdateStatus = useMutation({
    mutationFn: (payload: IProducts) => {
      return updateProduct(payload)
    }
  });
  const onChangeStatus = (payload: IProducts): SwitchChangeEventHandler => (checked: boolean) => {
    const updatedPayload = { ...payload, status: checked };
    mutationUpdateStatus.mutate(updatedPayload, {
      onSuccess: () => {
        message.success('update status success !');
        queryClient.invalidateQueries({ queryKey: ['productList'] });
      },
      onError: (error: any) => {
        message.error(error.response.data.message);
      }
    })
  }
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  const showModal = () => {
    setOpen(true)
  }
  const handleCloseModal = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        status ? <Tag color="green">Active</Tag> : <Tag color="red">Disable</Tag>
      )
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      width: 10,
      render: (_status: boolean, record: IProducts) =>
        <div className="flex justify-start gap-2 items-center">
          <Tooltip placement="topLeft" title={"Hide and Show product"}>
            <Switch checked={record.status} onChange={onChangeStatus(record)} />
          </Tooltip>
          <Button type="primary">Edit</Button>
          <Button type="primary" onClick={() => confirm(record._id)}  danger>Delete</Button>
        </div>
    },
  ];

  return (
    <>
      <Flex justify="space-between" gap="middle" className="mb-4">
        <Button type={"primary"} onClick={showModal}>Add products</Button>
        <Input.Search className="!w-[200px]" placeholder={"Mời bạn tìm kiếm"} />
      </Flex>
      <ProductUpdate open={open} onClose={handleCloseModal} product={product} />
      <Table dataSource={product} rowKey={(record) => record._id} columns={columns} pagination={false}
             scroll={{ x: true }} />
    </>
  )
}

export default ProductList;
