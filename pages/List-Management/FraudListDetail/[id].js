import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../../components/HeadTitle'),{csr:true});
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
import React from 'react'
import { MoreOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faReply, faPlus}  from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { GetDetailFraudList, AddFraudListValue, EditFraudListValue, DeleteFraudListValue } from '@/services/FraudListServices/Services';

const FraudListDetail = () => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [updateItemId, setUpdateItemId] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    const {item, handleDetail} = GetDetailFraudList(id, setLoading);
    const handleAddFraudListValue = AddFraudListValue();
    const handleEditFraudListValue = EditFraudListValue();
    const handleDeleteFraudListValue = DeleteFraudListValue();

    useEffect(() => {
      handleDetail()
    }, []);

    // CREATE
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handleAdd = async(e) => {
      e.preventDefault();
      try {
        const dataNew = {
          listId: {
            listId: id,
          },
          value,
          author: 'berlin',
          creationDate: new Date(),
        };
        await handleAddFraudListValue(dataNew, handleDetail, setValue, setIsModalOpen)
      } catch (error) {
        console.log(error);
      }
    }

    // DELETE
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const showModalDelete = (record) => {
        setIsModalDeleteOpen(true);
        setDeleteItemId(record.id);
    }
    const isDeleteCancel = () =>{
      setIsModalDeleteOpen(false);
    }
    const handleDelete = async(e) => {
      e.preventDefault();
      try {
        await handleDeleteFraudListValue(deleteItemId, setDeleteItemId, handleDetail, setLoading, isDeleteCancel);
      } catch (error) {
        console.log(error);
      }
    }

    // EDIT
    const [editFormData, setEditFormData] = useState([])
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const showModalEdit = (record) => {
      console.log(record);
      setIsModalEditOpen(true);
      setUpdateItemId(record.value);
      setEditFormData(record);
    };
    const isEditOK = () =>{
      setIsModalEditOpen(false);
    };
    const isEditCancel = () =>{
      setIsModalEditOpen(false);
    }
    const handleEdit = async(e) => {
      e.preventDefault();
      try {
        const form = {
          listId:{
            listId: id
          },
          value: '',
        };
        setEditFormData(form);
        await handleEditFraudListValue(handleDetail, editFormData, updateItemId, setUpdateItemId, setLoading, isEditCancel)
      } catch (error) {
        console.log(error);
      }
    }


    function getItem(icon, key, children, type){
      return{
        icon, 
        key,
        children,
        type
      }
    }
    
    const items = [
      {
        type: 'divider'
      },
      getItem(<MoreOutlined
        style={{
          fontSize: "28px",
          border: 'none'
      }}
      />, 'sub1', [
        getItem('Edit', 'edit'),
        getItem('Delete', 'delete'),
        ]),
    ];

    const columns = [
    {
      title: 'Value Id',
      dataIndex: 'valueId',
      key: 'valueId',
    },
    {
      title: 'Fraud List',
      dataIndex: 'listName',
      key: 'listName',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
          <Menu
            onClick={(e) => 
              {if (e.key === 'edit') {
                showModalEdit(record)
              } else if(e.key === 'delete') {
                showModalDelete(record)
              } 
            }}
            style={{
              border: 'none',
            }}
            defaultSelectedKeys={['edit']}
            defaultOpenKeys={['']}
            mode='horizontal'
            items={items}
            triggerSubMenuAction = 'click'
          />
        </Space>
        )
    },
  }
    ];
       return (
        <Layout>
            <HeadTitle title="Fraud List Value"/>
            <HeadContent pageTitle="Fraud List Value" caption="Fraud List Value is more detailed from the specific fraud list chosen at the start."/>
            <div className="flex flex-col gap-8 pt-6">
            <div className='flex justify-between'>
                <div className='flex flex-col md:flex-row'>
                    <span className=''>
                        <button type="button" onClick={() => router.back()} className='flex gap-2 bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white px-7 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
                          <FontAwesomeIcon icon={faReply}/>
                              Back
                      </button>
                    </span>
                </div>
                {/* Modal create */}
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closable={true} width={800} footer={[
                  <Button key="cancel" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" htmlType="submit" onClick={handleAdd}>
                    Submit
                  </Button>,
                ]}>
                  <div className="text-center text-secondary font-bold text-xl font-poppins">
                    <h1>Create Fraud List Detail</h1>
                  </div>
                  <form className='font-poppins mt-8 font-medium' onSubmit={handleAdd}>
                      <div className="text-md">
                      <div className="mt-1 w-full">
                            <label className="">Value Id</label>
                            <select className="w-full border-secondary border-[1px]  mt-[11px] md:mt-2 rounded py-3 px-2 focus:outline-green-600" value={id} onChange={(e)=> setId(e.target.value)} disabled>
                              <option value={id}>{id}</option>
                            </select>
                        </div>
                        <div className="mt-3 w-full">
                            <label className="">Value</label>
                            <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded py-3 px-2 focus:outline-green-600" value={value} onChange={(e)=> setValue(e.target.value)}/>
                        </div>
                      </div>
                  </form>
                </Modal>
                {/* Modal edit */}
                <Modal open={isModalEditOpen} onOk={isEditOK} onCancel={isEditCancel} closable={true} width={800} footer={[
                  <Button key="cancel" onClick={isEditCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" htmlType="submit" onClick={handleEdit}>
                    Submit
                  </Button>,
                ]}>
                  <div className="text-center text-secondary font-bold text-xl font-poppins">
                    <h1>Edit Fraud List Detail</h1>
                  </div>
                  <form className='font-poppins mt-8 font-medium' onSubmit={handleEdit}>
                      <div className="text-md">
                          <div className="mt-3 w-full">
                              <label className="">Fraud List</label>
                              <select className="w-full border-secondary border-[1px]  mt-[11px] md:mt-2 rounded py-3 px-2 focus:outline-green-600" value={id} onChange={(e)=> setId(e.target.value)} disabled>
                                <option value={id}>{id}</option>
                              </select>
                          </div>
                          <div className="mt-1 w-full">
                              <label className="">Value</label>
                              <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded py-3 px-2 focus:outline-green-600" value={editFormData.value} onChange={(e) => setEditFormData({ ...editFormData, value: e.target.value })}/>
                          </div>
                      </div>
                  </form>
                </Modal>
                {/* Modal Delete */}
                <Modal open={isModalDeleteOpen} onOk={handleDelete} onCancel={isDeleteCancel} closable={true} okText="OK">
                <div className="text-center text-secondary font-bold text-lg font-poppins">
                      <h1>Delete</h1>
                  </div>
                <div className="flex justify-center my-5">
                  <Image src="/Images/warning.svg" width={65} height={65} alt=''/>
                  </div>
                  <div className='text-center'>
                      <h1 className="font-bold text-lg font-poppins">Are you sure want to proceed?</h1>
                  </div>
                </Modal>
                <div className='flex flex-col'>
                    <span className=''>
                        <button type="button" onClick={showModal} className='flex gap-2 bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white px-3 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
                            <FontAwesomeIcon icon={faPlus
                            }/>
                              Add New Record
                        </button>
                    </span>
                </div>
            </div>
            <div className='w-full'>
              <main className=''>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin tip="Loading" size="large">
                      <div className="content-loading" />
                    </Spin>
                  </div>
                ): (
                  <Table columns={columns} dataSource={item}   size="medium" pagination={{
                    position: ['bottomCenter'], defaultPageSize: 10,
                    }} />
                )}
              </main>
            </div>
            </div>
        </Layout>
      )

}

export default FraudListDetail