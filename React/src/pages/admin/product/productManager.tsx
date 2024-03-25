import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Switch, Table, message } from "antd";
import { SwitchChangeEventHandler } from "antd/es/switch";
import { getProducts, updateProduct } from "~/api/product";
import { IProducts } from "~/models/interface";

const ProductList = () => {
  const {
    isError,
    isLoading,
    data: listProduct,
  } = useQuery({
    queryKey: ['productList'],
    queryFn: () => getProducts()
  });
  const product = listProduct?.data || [];
  const mutationUpdateStatus = useMutation({
    mutationFn: (payload: IProducts) => {
      return updateProduct(payload)
    }
  });
  const onChangeStatus = (payload: IProducts): SwitchChangeEventHandler => (_checked: boolean) => {
    const updatedPayload = { ...payload, status: !payload.status };
    mutationUpdateStatus.mutate(updatedPayload, {
      onSuccess: () => {
        message.success('Bạn cập nhật trạng thái thành công')
      },
      onError: (error: any) => {
        message.error(error.response.data.message || 'Xin vui lòng thử lại !')
      }
    })
  }
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

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
      render: (status: boolean) => <span>{status ? 'Active' : 'Inactive'}</span>
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      render: (record: IProducts) =>
        <div className="flex justify-start gap-2 items-center">
          <Switch checked={!record.status} onChange={() => onChangeStatus(record)} />
          <Button type="primary">Edit</Button>
        </div>
    },
  ];

  return (
    <>
      <Table dataSource={product} columns={columns} pagination={false} />
    </>
  )
}

export default ProductList