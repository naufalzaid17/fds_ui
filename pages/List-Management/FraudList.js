import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../../components/layout/Layout'),{ssr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{ssr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{ssr:true});
const Search = dynamic(() => import('../../components/search'),{csr:true});
const Filter = dynamic(() => import('../../components/filter'),{csr:true});
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
import { MoreOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faPlus}  from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import FraudListDetail from './FraudListDetail/[id]';
import { GetData, GetFraudListType, AddFraudList, EditFraudList, DeleteFraudList } from '@/services/FraudListServices/Services';

const FraudList = () => {
  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState("");
  const [entityType, setEntityType] = useState("");
  const [idUserGroup, setIdUserGroup] = useState("");
  const [listId, setItemListId] = useState(null);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [detailItemId, setDetailItemId] = useState(null);
  const [typeId, setTypeId] = useState(null); 
  const {listData, handleRead} = GetData();
  const {dataFraudList, handleDataFraudList} = GetFraudListType();
  const handleAddFraudList = AddFraudList();
  const handleEditFraudList = EditFraudList();
  const handleDeleteFraudList = DeleteFraudList();


  useEffect(() => {
    handleRead();
  }, [listData]);

  useEffect(() => {
    handleDataFraudList();
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
        listName,
        entityType:{
          typeId
        },
        userGroup:{
          id: 1
        }
      };
      console.log(dataNew);
      await handleAddFraudList(dataNew, setListName, setEntityType, setIdUserGroup, setIsModalOpen, handleRead)
    } catch (error) {
      console.log(error);
    }
  }

  // EDIT
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const showModalEdit = (record) => {
    console.log(record);
    setIsModalEditOpen(true);
    setUpdateItemId(record.listName);
    setEditFormData(record);
    setTypeId(record.entityType.typeId);
    setIdUserGroup(record.userGroup.id);
  };
  const isEditOK = () =>{
    setIsModalEditOpen(false);
  };
  const isEditCancel = () =>{
    setIsModalEditOpen(false);
  }
  const [editFormData, setEditFormData] = useState([]);
  const handleEdit = async(e) => {
    e.preventDefault();
    try {
      const form = {
        listName: '',
        entityType:{
          typeId,
        },
        userGroup:{
          id: idUserGroup
        },
      };
      setEditFormData(form);
      console.log(editFormData);
      await handleEditFraudList(editFormData, updateItemId, setUpdateItemId, handleRead, setLoading, isEditCancel)
    } catch (error) {
      console.log(error);
    }
  }

  // DETAIL
  const router = useRouter();
  const showModalDetail = (record) => {
    setDetailItemId(record.listId)
    const listId = record.listId;
      router.push(`/List-Management/FraudListDetail/${listId}`);
  };

  // DELETE
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const showModalDelete = (record) => {
    console.log(record.listId);
      setIsModalDeleteOpen(true);
      setItemListId(record.listId);
  }
  const isDeleteCancel = () =>{
    setIsModalDeleteOpen(false);
  }
  const handleDelete = async(e) => {
    e.preventDefault();
    try {
      await handleDeleteFraudList(listId, setLoading, setItemListId, isDeleteCancel, handleRead)
    } catch (error) {
      console.log(error);
    } 
  }

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setTypeId(selectedValue);
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
      getItem('Detail Value', 'detail'),
      getItem('Delete', 'delete'),
      ]),
  ];

  const columns = [
    {
      title: 'List Name',
      dataIndex: 'listName',
      key: 'listName',
    },
    {
      title: 'Entity Type',
      dataIndex: 'entity',
      key: 'entity',
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
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
              } else if(e.key === 'detail'){
                // console.log(record.listName);
                <FraudListDetail id={record.listId} name={record.listName}/>
                showModalDetail(record)
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
        <HeadTitle title="Fraud List"/>
        <HeadContent pageTitle="Fraud List" caption="A fraud list can be used when a rule group is created, in the list conditions, and statistics calculation parameters."/>
        <div className='flex flex-col gap-8 pt-6'>
        <div className='flex justify-between'>
          <div className='flex flex-col md:flex-row'>
            <Search/>
            <span className='md:hidden'>
            <button onClick={showModal} className='flex gap-2 bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
            <FontAwesomeIcon icon={faPlus}/>
                  Add New Record
            </button>
            </span>
          </div> 
          <div className='flex flex-col md:flex-row md:gap-5'>
            <span className='hidden md:block'>
            <div className='mt-5 md:mt-0'>
            <button onClick={showModal} className='flex gap-2 bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
            <FontAwesomeIcon icon={faPlus}/>
                  Add New Record
            </button>
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
              <h1>Create Fraud List</h1>
            </div>
            <form className='font-poppins mt-8 font-medium' onSubmit={handleAdd} autoComplete='off'>
                <div className="text-md">
                    <div className='flex gap-10'>
                        <div className="mt-1 w-1/2">
                            <label className="">List Name</label>
                            <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={listName} onChange={(e)=> setListName(e.target.value)} id='listName'/>
                        </div>
                        <div className="mt-1 w-1/2">
                            <label className="">Entity Type</label>
                            <select
                                className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"
                                value={typeId}
                                onChange={handleSelectChange} // Gunakan fungsi handleSelectChange sebagai event onChange
                                id='entityType'
                                required
                              >
                            <option value="0">Select Field</option>
                            {dataFraudList.map(option => (
                              <option key={option.typeId} value={option.typeId}>
                                {option.entityType}
                              </option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <label className="">Group</label>
                        <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='group' id='group' disabled>
                          {/* <option value="0" selected className=''>Select Field</option> */}
                          <option value="1">Group 1</option>
                        </select>
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
              <Button key="submit" type="primary" htmlType="submit" onClick={handleEdit}>
                Submit
              </Button>,
          ]}
        >
            <div className="text-center text-secondary font-bold text-xl font-poppins">
              <h1>Edit Fraud List</h1>
            </div>
            <form onSubmit={handleEdit} className='font-poppins mt-8 font-medium' autoComplete='off'>
                <div className="text-md">
                    <div className='flex gap-10'>
                        <div className="mt-1 w-1/2">
                            <label className="">List Name</label>
                            <input className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.listName} onChange={(e) => setEditFormData({ ...editFormData, listName: e.target.value })} id='listName'/>
                        </div>
                        <div className="mt-1 w-1/2">
                            <label className="">Entity Type</label>
                            <select
                              className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"
                              value={typeId}
                              onChange={handleSelectChange}
                              id='entityType'
                            >
                              <option value="0">Select Field</option>
                              {dataFraudList.map(option => (
                                <option key={option.typeId} value={option.typeId}>
                                  {option.entityType}
                                </option>
                              ))}
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-10 mt-5'>
                        <div className="w-full">
                            <label className="">Group</label>
                            <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='group' value={idUserGroup} id='group' disabled>
                              {/* <option value="0" selected className=''>Select Field</option> */}
                              <option value="1">Group 1</option>
                            </select>
                        </div>
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

export default FraudList