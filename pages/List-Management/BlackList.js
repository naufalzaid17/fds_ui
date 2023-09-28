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
// const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
import { MoreOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import BlackListDetail from "./BlackListDetail/[id]";
import BlackListFraudReaction from "./BlackListFraudReaction";
import { GetData, GetFraudListType, AddBlackList, EditBlackList, DeleteBlackList } from '@/services/BlackListServices/Services';

const BlackList = () => {
  const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const [loading, setLoading] = useState(false);
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [value, setValue] = useState("");
  const [entityType, setEntityType] = useState("");
  const [idUserGroup, setIdUserGroup] = useState("");
  const [idInitiator, setIdInitiator] = useState("");
  const [reason, setReason] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataGroup, setDataGroup] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [detailItemId, setDetailItemId] = useState(null);
  const router = useRouter();
  const {dataFraudList, handleDataFraudList} = GetFraudListType();
  const {listData, handleRead} = GetData();
  const handleAddBlackList = AddBlackList();
  const handleEditBlackList = EditBlackList();
  const handleDeleteBlackList = DeleteBlackList();


  useEffect(() => {
    handleRead();
  }, []);

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
        dateIn,
        dateOut,
        value,
        entityType,
        userGroup: {
          id: 1,
          // groupName: "test"
        },
        initiator: {
          id: 1,
        },
        reason,
      };
      console.log(dataNew);
      await handleAddBlackList(dataNew, setDateIn, setDateOut, setValue, setEntityType, setIdUserGroup, setReason, handleRead, setIsModalOpen)
    } catch (error) {
        console.log(error);
    }
  }

  // EDIT
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const showModalEdit = (record) => {
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
  const [editFormData, setEditFormData] = useState([]);
  const handleEdit = async(e) => {
    e.preventDefault();
    try {
      const form = {
        dateIn: '',
        dateOut: '',
        value: '',
        entityType: '',
        userGroup:{
          id: idUserGroup
        },
        initiator:{
          id: 1
        },
        reason
      };
      setEditFormData(form);
      console.log(editFormData);
      await handleEditBlackList(editFormData, updateItemId, setUpdateItemId, handleRead, setLoading, isEditCancel);
    } catch (error) {
      console.log(error);
    }
  }

  // DETAIL
  const showModalDetail = (record) => {
    setDetailItemId(record.id);
    const id = record.id;
    router.push(`/List-Management/BlackListDetail/${id}`);
  };

  // FRAUD REACTION
  const showModalFraudReaction = (record) => {
    setDetailItemId(record.id);
    const id = record.id;
    router.push(`/List-Management/BlackListFraudReaction?id=${id}`);
  };

  // DELETE
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const showModalDelete = (record) => {
    console.log(record);
    setIsModalDeleteOpen(true);
    setDeleteItemId(record.id);
  };
  const isDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };
  const handleDelete = async(e) => {
    e.preventDefault();
    try {
      await handleDeleteBlackList(deleteItemId, setDeleteItemId, setLoading, handleRead, isDeleteCancel)
    } catch (error) {
      console.log(error);
    }
  }


  // TABLE CONFIG
  function getItem(icon, key, children, type) {
    return {
      icon,
      key,
      children,
      type,
    };
  }

  const items = [
    {
      type: "divider",
    },
    getItem(
      <MoreOutlined
        style={{
          fontSize: "28px",
          border: "none",
        }}
      />,
      "sub1",
      [
        getItem("Edit", "edit"),
        getItem("Detail", "detail"),
        getItem("Fraud Reaction", "fraudReaction"),
        getItem("Delete", "delete"),
      ]
    ),
  ];

  const columns = [
    {
      title: "Date In",
      dataIndex: "dateIn",
      key: "dateIn",
    },
    {
      title: "Date Out",
      dataIndex: "dateOut",
      key: "dateOut",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Entity Type",
      dataIndex: "entityType",
      key: "entityType",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Menu
              onClick={(e) => {
                if (e.key === "edit") {
                  showModalEdit(record);
                } else if (e.key === "delete") {
                  showModalDelete(record);
                } else if (e.key === "detail") {
                  <BlackListDetail id={record.id} />;
                  showModalDetail(record);
                } else if (e.key === "fraudReaction") {
                  <BlackListFraudReaction id={record.id} />;
                  showModalFraudReaction(record);
                }
              }}
              style={{
                border: "none",
              }}
              defaultSelectedKeys={["edit"]}
              defaultOpenKeys={[""]}
              mode="horizontal"
              items={items}
              triggerSubMenuAction="click"
            />
          </Space>
        );
      },
    },
  ];

  return (
    <Layout>
        <HeadTitle title="Black List"/>
        <HeadContent pageTitle="Black List" caption="A black list present in an incoming transaction is automatically flagged as fraudulent."/>
        <div className="flex flex-col gap-8 pt-6">
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
        <div className="flex flex-col md:flex-row md:gap-5">
          <span className="hidden md:block">
            <div className="mt-5 md:mt-0">
              <button
                onClick={showModal}
                className="flex gap-2 bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center"
              >
                <FontAwesomeIcon icon={faPlus} />
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
              <h1>Create Black List</h1>
            </div>
            <form className='font-poppins mt-8 font-medium' onSubmit={handleAdd} autoComplete="off">
                <div className="text-md">
                    <div className='flex gap-10'>
                        <div className="mt-1 w-1/2">
                            <label className="">Value</label>
                            <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={value} onChange={(e)=> setValue(e.target.value)} id='value'/>
                        </div>
                        <div className="mt-1 w-1/2">
                            <label className="">Entity Type</label>
                            <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={entityType} onChange={(e)=> setEntityType(e.target.value)} id='entityType'>
                            <option value="0">Select Field</option>
                            {dataFraudList.map(option => (
                              <option key={option.entityType} value={option.entityType}>
                                {option.entityType}
                              </option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-10 mt-5'>
                        <div className="mt-1 w-1/2">
                            <label className="">Date In</label>
                            <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='dateIn' type='date' value={dateIn} onChange={(e)=> setDateIn(e.target.value)} id='dateIn'/>
                        </div>
                        <div className="mt-1 w-1/2">
                            <label className="">Date Out</label>
                            <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='dateOut' type='date' value={dateOut} onChange={(e)=> setDateOut(e.target.value)} id='dateOut'/>
                        </div>
                    </div>
                    <div className='flex gap-10 mt-5'>
                        <div className="w-1/2">
                            <label className="">Reason</label>
                            <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='reason' value={reason} onChange={(e)=> setReason(e.target.value)} id='reason'/>
                        </div>
                        <div className="w-1/2">
                            <label className="">Group</label>
                            <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='group' id='group' disabled>
                              {/* <option value="0" selected className=''>Select Field</option> */}
                              <option value="1">Group 1</option>
                            </select>
                        </div>
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
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={handleEdit}
            >
              Submit
            </Button>,
          ]}
        >
          <div className="text-center text-secondary font-bold text-xl font-poppins">
            <h1>Edit Black List</h1>
          </div>
          <form onSubmit={handleEdit} className='font-poppins mt-8 font-medium' autoComplete="off">
              <div className="text-md">
                  <div className='flex gap-10'>
                      <div className="mt-1 w-1/2">
                          <label className="">Value</label>
                          <input className="w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.value} onChange={(e) => setEditFormData({ ...editFormData, value: e.target.value })} id='value'/>
                      </div>
                      <div className="mt-1 w-1/2">
                          <label className="">Entity Type</label>
                          <select
                              className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"
                              value={editFormData.entityType} onChange={(e) => setEditFormData({ ...editFormData, entityType: e.target.value })}
                              id='entityType'
                            >
                          <option value="0">Select Field</option>
                          {dataFraudList.map(option => (
                            <option key={option.entityType} value={option.entityType}>
                              {option.entityType}
                            </option>
                          ))}
                          </select>
                      </div>
                  </div>
                  <div className='flex gap-10 mt-5'>
                      <div className="mt-1 w-1/2">
                          <label className="">Date In</label>
                          <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='dateIn' type='date' value={editFormData.dateIn} onChange={(e) => setEditFormData({ ...editFormData, dateIn: e.target.value })} id='dateIn'/>
                      </div>
                      <div className="mt-1 w-1/2">
                          <label className="">Date Out</label>
                          <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='dateOut' type='date' value={editFormData.dateOut} onChange={(e) => setEditFormData({ ...editFormData, dateOut: e.target.value })} id='dateOut'/>
                      </div>
                  </div>
                  <div className='flex gap-10 mt-5'>
                      <div className="w-1/2">
                          <label className="">Reason</label>
                          <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='reason' value={editFormData.reason} onChange={(e) => setEditFormData({ ...editFormData, reason: e.target.value })} id='reason'/>
                      </div>
                      <div className="w-1/2">
                          <label className="">Group</label>
                          <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='group' id='group' disabled>
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
  );
};

export default BlackList;
