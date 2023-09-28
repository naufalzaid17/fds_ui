import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr: true});
const Filter = dynamic(() => import('../../components/filter'),{csr: true});
const Search = dynamic(() => import('../../components/search'),{csr: true});
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const DatePicker= dynamic(() => import('antd').then((antd) => antd.DatePicker),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Form = dynamic(() => import('antd').then((antd) => antd.Form),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import { MoreOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetData, AddNotificationTemplate, EditNotificationTemplate, DeleteNotificationTemplate, GetNotificationType } from "@/services/NotificationTemplateServices/Services";

const NotificationTemplate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [template, setTemplate] = useState("");
  const [idNotificationType, setIdNotificationType] = useState('');
  const [updateItemId, setUpdateItemId] = useState(null);
  const [detailItemId, setDetailItemId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const {dataNotification, handleNotificationType} = GetNotificationType();
  const {listData, handleRead} = GetData();
  const handleAddData = AddNotificationTemplate();
  const handleEditData = EditNotificationTemplate();
  const handleDeleteData = DeleteNotificationTemplate();

  useEffect(() => {
    handleRead();
  }, []);

  useEffect(() => {
    handleNotificationType();
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
    const id = idNotificationType;
    try {
      const dataNew = {
        subject,
        description,
        template,
        notificationType:{
          id
        }
      };
      console.log(dataNew);
      await handleAddData(dataNew, setSubject, setDescription, setTemplate, setIdNotificationType, setIsModalOpen, handleRead)
    } catch (error) {
      console.log(error);
    }
  }

  // DETAIL
  const router = useRouter();
  const showModalDetail = (record) => {
    setDetailItemId(record.id)
    const id = record.id;
    router.push(`/Notification/NotificationTemplateDetail/${id}`);
  };

  // DELETE
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const showModalDelete = (record) => {
    setIsModalDeleteOpen(true);
    setDeleteItemId(record.id);
  }
  const isDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  }
  const handleDelete = async(e) => {
    e.preventDefault();
    try {
      await handleDeleteData(deleteItemId, setDeleteItemId, handleRead, setLoading, isDeleteCancel)
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
    setUpdateItemId(record.id);
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
        id: '',
        subject: '',
        description: '',
        template: '',
        notificationType:{
          id: ''
        }
      }
      setEditFormData(form);
      await handleEditData(editFormData, setUpdateItemId, setIsModalEditOpen, handleRead, setLoading)
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddButtonClick = (e) => {
    e.preventDefault();
    setTemplate((prevTemplate) => prevTemplate + selectedValue);
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      template: prevFormData.template + selectedValue,
    }));
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  // TABLE CONFIG
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
      getItem('Detail', 'detail'),
      getItem('Delete', 'delete'),
      ]),
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Notification Type",
      dataIndex: "notification",
      key: "notification",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Menu
              onClick={(e) =>
              {if (e.key === 'edit') {
                showModalEdit(record)
              } else if(e.key === 'delete') {
                showModalDelete(record)
              } else if(e.key === 'detail'){
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
      ),
    },
  ];
  
  return (
    <Layout>
      <HeadTitle title="Notification Template"/>
      <HeadContent pageTitle="Notification Template" caption="Template for get notifications from various services"/>
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
                <h1>Create Notification Template</h1>
              </div>
              <form className="font-poppins mt-6 font-medium" autoComplete="off">
              <div className="text-sm">
                  <div className="mt-4">
                    <label className="">Notification Type</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={idNotificationType} onChange={(e)=> setIdNotificationType(e.target.value)} id='notificationType'>
                      <option value="0">Select Field</option>
                      <option value="1">SMS</option>
                      <option value="2">Email</option>
                        {/* {dataNotification.map(option => (
                          <option key={option.notificationType} value={option.id}>
                            {option.notificationType}
                          </option>
                        ))} */}
                    </select>
                   </div>
                <div className="flex gap-10">
                  <div className="mt-5 w-1/2">
                      <label className="">Subject</label>
                      <input className=" w-full border-secondary border-[1px]  mt-[11px] md:mt-2  rounded py-2 px-2 focus:outline-green-600" value={subject} onChange={(e)=> setSubject(e.target.value)} id='subject'/>
                  </div>
                  <div className="mt-5 w-1/2">
                    <label className="">Description</label>
                    <input className=" w-full border-secondary border-[1px]  mt-[11px] md:mt-2  rounded py-2 px-2 focus:outline-green-600" value={description} onChange={(e)=> setDescription(e.target.value)} id='description'/>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="mt-4 w-3/4">
                    <label className="">Placeholder</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" onChange={handleSelectChange} value={selectedValue}>
                      <option value='0' selected>Select Placeholder</option>
                      <option value='[hpan]'>Hpan</option>
                      <option value='[terminalId]'>Terminal ID</option>
                      <option value='[date]'>Date</option>
                      <option value='[currency]'>Currency</option>
                      <option value='[refNumber]'>Reference Number</option>
                      <option value='[transType]'>Transaction Type</option>
                      <option value='[responseCode]'>Response Code</option>
                      <option value='[merchantType]'>Merchant Type</option>
                      <option value='[rule]'>Rule</option>
                      <option value='[ruleDescription]'>Rule Description</option>
                    </select>
                  </div>
                  <div className="mt-11 w-1/4"> 
                    <button className="bg-secondary md:w-full  hover:bg-opacity-90 text-white  md:px-10 py-2.5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center" onClick={handleAddButtonClick}>Add</button>
                  </div>
                </div>
                <div className="mt-5">
                  <label className="">Template</label>
                  <textarea className=" w-full border-secondary border-[1px]  mt-[11px] md:mt-2  rounded py-2 px-2 focus:outline-green-600" value={template} onChange={(e)=> setTemplate(e.target.value)} id='template'></textarea>
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
              width={800}
              closable={true}
              footer={[
                <Button key="cancel" onClick={isEditCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" htmlType="submit" onClick={handleEdit}>
                  Submit
                </Button>,
              ]}
            >
                <div className="text-center text-secondary font-bold text-base font-poppins">
                    <h1>Edit Notification Template</h1>
                </div>
                <form className='font-poppins mt-8 font-medium'>
                    <div className="text-md">
                        <div className="mt-5">
                            <label className="">Notification Type</label>
                            <select className='minimal w-full border-secondary border-[1px]  mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700' value={editFormData.notificationType?.id}   onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                notificationType: { id: e.target.value }
                              })
                            }>
                            <option value="0">Select Field</option>
                            <option value="1">SMS</option>
                            <option value="2">Email</option>
                              {/* {dataNotification.map(option => (
                                <option key={option.notificationType} value={option.id}>
                                  {option.notificationType}
                                </option>
                              ))} */}
                            </select>
                        </div>
                        <div className='flex gap-10'>
                            <div className="mt-6 w-1/2">
                                <label className="">Subject</label>
                                <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.subject} onChange={(e) => setEditFormData({ ...editFormData, subject: e.target.value })}/>
                            </div>
                            <div className="mt-5 w-1/2">
                                <label className="">Description</label>
                                <input className=" w-full border-secondary border-[1px]  mt-[11px] md:mt2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.description} onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}/>
                            </div>
                        </div>
                        <div className="flex gap-5">
                          <div className='w-3/4 mt-4'>
                          <label className="">Placeholder</label>
                              <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" onChange={handleSelectChange} value={selectedValue}>
                                <option value='0' selected>Select Placeholder</option>
                                <option value='[hpan]'>Hpan</option>
                                <option value='[terminalId]'>Terminal ID</option>
                                <option value='[date]'>Date</option>
                                <option value='[currency]'>Currency</option>
                                <option value='[refNumber]'>Reference Number</option>
                                <option value='[transType]'>Transaction Type</option>
                                <option value='[responseCode]'>Response Code</option>
                                <option value='[merchantType]'>Merchant Type</option>
                                <option value='[rule]'>Rule</option>
                                <option value='[ruleDescription]'>Rule Description</option>
                              </select>
                          </div>
                          <div className="mt-12 w-1/4"> 
                            <button className="bg-secondary md:w-full  hover:bg-opacity-90 text-white  md:px-10 py-2.5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center" onClick={handleAddButtonClick}>Add</button>
                          </div>
                        </div>
                        <div className='w-full mt-5 mb-7'>
                        <label className="">Template</label>
                          <textarea rows="10" className='w-full border-secondary border-[1px]  mt-[11px] md:mt-2 rounded-lg py-3 focus:outline-green-700' value={editFormData.template} onChange={(e) => setEditFormData({ ...editFormData, template: e.target.value })}></textarea>
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

export default NotificationTemplate