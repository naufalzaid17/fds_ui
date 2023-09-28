import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr: true});
const Search = dynamic(() => import('../../components/search'),{csr: true});
const Filter = dynamic(() => import('../../components/filter'),{csr: true});
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const DatePicker = dynamic(() => import('antd').then((antd) => antd.DatePicker),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const ConfigProvider = dynamic(() => import('antd').then((antd) => antd.ConfigProvider),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Tag = dynamic(() => import('antd').then((antd) => antd.Tag),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
import React, { useEffect } from 'react'
import { MoreOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faPlus}  from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import Image from 'next/image'
import { GetData, AddContactGroup, EditContactGroup, DeleteContactGroup } from "@/services/ContactGroupServices/Services";

const ContactGroup = () => {
  const [loading, setLoading] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [groupName, setGroupName] = useState('');
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [id, setId] = useState(null);
  const {listData, handleRead} = GetData();
  const handleAddData = AddContactGroup();
  const handleEditData = EditContactGroup();
  const handleDeleteData = DeleteContactGroup();

  useEffect(() => {
    handleRead();
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
      
    } catch (error) {
      
    }
  }

  // Modal Delete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const showModalDelete = (record) => {
    console.log(record.groupId);
      setIsModalDeleteOpen(true);
      setDeleteItemId(record.groupId);
      console.log(deleteItemId);
  }
  const isDeleteCancel = () =>{
    setIsModalDeleteOpen(false);
  }

  const [editFormData, setEditFormData] = useState({
    notificationType:{
      id: '',
      notificationType: ''
    },
    groupName: ''
  });

  // Modal Edit
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const showModalEdit = (record) => {
    console.log(record.groupId);
    setIsModalEditOpen(true);
    setUpdateItemId(record.groupId);
    setEditFormData(record);
    console.log(record);
  };
  const isEditOK = () =>{
    setIsModalEditOpen(false);
  };
  const isEditCancel = () =>{
    setIsModalEditOpen(false);
  }

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      notificationType: {
        ...prevFormData.notificationType,
        id: selectedValue,
        notificationType: e.target.options[e.target.selectedIndex].text,
      },
    }));
  };

  // TABLE CONFIG
  function getItem(icon, key, children, type){
    return{
      icon, 
      key,
      children,
      type
    }
  };
  
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
      title: 'Notification Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      key: 'groupName',
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
    },
  ];

  return (
    <Layout>
      <HeadTitle title="Contact Group"/>
      <HeadContent pageTitle="Contact Group" caption="Group of contact"/>
        <div className="flex flex-col gap-8 pt-6">
      <div className='flex justify-between'>
          <div className='flex flex-col md:flex-row'>
            <Search/>
            <span className='md:hidden'>
            <button onClick={showModal} className='bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
            <FontAwesomeIcon icon={faPlus}/>
                  Add New Record
            </button>
            </span>
          </div>
          <div className='flex flex-col md:flex-row md:gap-5'>
            <span className='hidden md:block'>
            <div className='mt-5 md:mt-0'>
            <button onClick={showModal} className='bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
            <FontAwesomeIcon icon={faPlus}/>
                  Add New Record
            </button>
        </div>
          {/* Modal create */}
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closable={true} width={800} footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" htmlType="submit" onClick={handleAddData}>
                Submit
              </Button>,
          ]}>
                <div className="text-center text-secondary font-bold text-xl font-poppins">
                    <h1>Create Contact Group</h1>
                </div>
                <form className='font-poppins mt-12 font-medium' autoComplete='off'>
                    <div className="text-md">
                        <div className="mt-4">
                            <label className="">Notification Type</label>
                            <select name="" className=' minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700' value={id} onChange={(e)=> setId(e.target.value)} id='notificationType'>
                              <option value="0" selected>Add Notification Type</option>
                              <option value="2">Email</option>
                              <option value="1">SMS</option>
                            </select>
                        </div>
                        <div className='w-full mt-6 mb-6'>
                            <label>Group Name</label> 
                            <input type="text" className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={groupName} onChange={(e)=> setGroupName(e.target.value)}/>
                        </div>
                    </div>
                </form>
          </Modal>
            {/* Modal Edit */}
            <Modal 
                open={isModalEditOpen}
                centered
                onOk={isEditOK}
                onCancel={isEditCancel}
                closable={true}
                width={800}
                footer={[
                  <Button key="cancel" onClick={isEditCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" htmlType="submit" onClick={handleUpdateData}>
                    Submit
                  </Button>,
              ]}
              >
                <div className="text-center text-secondary font-bold text-xl font-poppins">
                    <h1>Edit Contact Group</h1>
                </div>
                <form className='font-poppins mt-12 font-medium' autoComplete='off'>
                    <div className="text-md">
                        <div className="mt-4">
                            <label className="">Notification Type</label>
                            <select
                              name=""
                              className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700'
                              value={editFormData.notificationType.id}
                              onChange={handleSelectChange}
                              id='notificationType'
                            >
                              <option value="0" selected>Select Notification Type</option>
                              <option value="2">SMS</option>
                              <option value="1">Email</option>
                            </select>
                        </div>
                        <div className='w-full mt-6 mb-6'>
                            <label>Group Name</label> 
                            <input type="text" className="w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.groupName} onChange={(e) => setEditFormData({ ...editFormData, groupName: e.target.value })}/>
                        </div>
                    </div>
                </form>
            </Modal>
            {/* Modal Delete */}
            <Modal open={isModalDeleteOpen} onOk={handleDeleteData} onCancel={isDeleteCancel} closable={true} okText="OK">
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
            </span>
              <Filter/>
            <div className='mt-[21px] md:mt-0'>
               <Filter/>
            </div>
          </div> 
        </div>
        <main className=''>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin tip="Loading" size="large">
              <div className="content-loading" />
            </Spin>
          </div>
        ): (
          <Table columns={columns} dataSource={listData}  size="small" pagination={{
            position: ['bottomCenter'], defaultPageSize: 10,
          }} />
        )}
        </main>
        </div>
    </Layout>
  )
}

export default ContactGroup