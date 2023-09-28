import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr: true});
const Search = dynamic(() => import('../../components/search'),{csr: true})
const Filter = dynamic(() => import('../../components/filter'),{csr: true})
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import { MoreOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { GetData, AddDictionaries, EditDictionaries, DeleteDictionaries } from "@/services/DictionariesServices/Services";


const ISO8583 = () => {
  const [loading, setLoading] = useState(false);
  const [configId, setDeleteConfigId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [msgType, setMsgType] = useState("");
  const [updateItemId, setUpdateItemId] = useState(null);
  const {listData, handleRead} = GetData();
  const handleAddData = AddDictionaries();
  const handleEditData = EditDictionaries();
  const handleDeleteData = DeleteDictionaries();

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
      const dataNew = {
        name,
        description,
        hasHeader: true,
        msgType: {
          msgId: msgType,
        }
      };
      // console.log(dataNew);
      await handleAddData(dataNew, setName, setDescription, setMsgType, setIsModalOpen, handleRead)
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const showModalDelete = (record) => {
    console.log(record.configId);
    setIsModalDeleteOpen(true);
    setDeleteConfigId(record.configId);
  };
  const isDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };
  const handleDelete = async(e) => {
    e.preventDefault(); 
    try {
      await handleDeleteData(configId, setDeleteConfigId, handleRead, setLoading, isDeleteCancel)
    } catch (error) {
      console.log(error);
    }
  }
  
  
  // EDIT
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editFormData, setEditFormData] = useState([]);
  const showModalEdit = (record) => {
    console.log(record);
    setIsModalEditOpen(true);
    setUpdateItemId(record.configId)
    setEditFormData(record);
  };
  const isEditOK = () => {
    setIsModalEditOpen(false);
  };
  const isEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      msgType: {
        ...prevFormData.msgType,
        msgId: selectedValue,
      },
    }));
  };
  const handleEdit = async(e) => {
    e.preventDefault();
    try {
      const form = {
        name: '',
        description: '',
        msgType: {
          msgId: ''
        },
        hasHeader: true
      }
      setEditFormData(form);
      console.log(editFormData);
      await handleEditData(editFormData, setUpdateItemId, handleRead, setLoading, isEditCancel)
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Message Type",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Action",
      key: "action",
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
      <HeadTitle title="Messaging Data" />
      <HeadContent pageTitle="Messaging Data" caption="Setup and customization of message" />
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
            <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closable={true} width={800} footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" htmlType="submit" onClick={handleAdd}>
                Submit
              </Button>,
          ]}>
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Create Messaging Data</h1>
              </div>
              <form className="font-poppins mt-6 font-medium" onSubmit={handleAdd} autoComplete="off">
                <div className="text-sm">
                  <div className="flex gap-10">
                    <div className="mt-4 w-1/2">
                      <label className="">Name</label>
                      <input className="w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={name} onChange={(e)=> setName(e.target.value)} id='name'/>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Description</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={description} onChange={(e)=> setDescription(e.target.value)} id='description'/>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="">Message Type</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={msgType} onChange={(e)=> setMsgType(e.target.value)} id='msgType'>
                      <option value="0" selected className=''>Select Field</option>
                      <option value="1">ISO8583</option>
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
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Edit Messaging Data</h1>
              </div>
              <form onSubmit={handleEdit} className="font-poppins mt-6 font-medium">
                <div className="text-sm">
                  <div className="flex gap-10">
                    <div className="mt-4 w-1/2">
                      <label className="">Name</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value})} id='name'/>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Description</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.description} onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value})} id='description'/>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="">Message Type</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.msgType?.msgId}
                      onChange={handleSelectChange} id='msgType'>
                      <option value="0" selected className=''>Select Field</option>
                      <option value="1">ISO8583</option>
                    </select> 
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
          <Filter />
          <div className="mt-[21px] md:mt-0">
            <Filter />
          </div>
        </div>
      </div>
      <main className="">
      {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin tip="Loading" size="large">
              <div className="content-loading" />
            </Spin>
          </div>
        ): (
          <Table
          columns={columns}
          dataSource={listData}
          size="small"
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: 10,
          }}
        />
        )}
      </main>
      </div>
    </Layout>
  );
};

export default ISO8583;