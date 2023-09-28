import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr: true});
const Search = dynamic(() => import('../../components/search'),{csr: true})
const Filter = dynamic(() => import('../../components/filter'),{csr: true})
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const DatePicker = dynamic(() => import('antd').then((antd) => antd.DatePicker),{csr: true})
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
import { useRouter } from "next/router";
import axios from "axios";
import { GetTransactionTypeData, AddTransactionTypeData, UpdateTransactionTypeData, DeleteTransactionTypeData } from "@/services/TransactionTypeServices/Services";

const TransactionType = () => {
  const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const [id, setDeleteItemId] = useState("");
  const [attrId, setAttrId] = useState("");
  const [attribute, setAttribute] = useState("");
  const [fieldTag, setFieldTag] = useState("");
  const [addtData, setAddtData] = useState("");
  const [description, setDescription] = useState("");
  const [configId, setConfigId] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); 
  const [updateItemId, setUpdateItemId] = useState(null);
  const [detailItemId, setDetailItemId] = useState(null);
  const { data, loading, getData} =  GetTransactionTypeData();
  const handleAddData = AddTransactionTypeData();
  const handleUpdateData = UpdateTransactionTypeData();
  const handleDeleteData = DeleteTransactionTypeData();


  // Modal create
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

  // Modal Delete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const showModalDelete = (record) => {
    console.log(record.attrId);
      setIsModalDeleteOpen(true);
      setAttrId(record.attrId);
  }
  const isDeleteOK = () => {
    setIsModalDeleteOpen(false);
  };
  const isDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const [editFormData, setEditFormData] = useState({
    attribute: '',
    fieldTag: '',
    description: '',
    configId: ''
  });

  // Modal Edit
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const showModalEdit = (record) => {
    // console.log(record.id);
    setIsModalEditOpen(true);
    setUpdateItemId(record.atttribute);
    setEditFormData(record);
  };
  const isEditOK = () => {
    setIsModalEditOpen(false);
  };  
  const isEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const onclick = (e) => {
    showModalEdit(e);
    showModalDelete(e);
  };

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
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
    },
    {
      title: "Field Tag",
      dataIndex: "fieldTag",
      key: "fieldTag",
    },
    {
      title: "Config Id",
      dataIndex: "config",
      key: "config",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      <HeadTitle title="Transaction Type" />
      <HeadContent
        pageTitle="Transaction Type"
        caption="List of Transaction Data Attribute for create rule"/>
      <div className="flex flex-col gap-8 pt-6">
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row">
          <Search />
          <span className="md:hidden">
            <button
              onClick={showModal}
              className="bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 ml-10 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center"
            >
              <FontAwesomeIcon icon={faPlus} />
                Add New Record
            </button>
             {/* Modal create */}
             <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closable={true} width={800} footer={[
                <Button key="cancel" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" htmlType="submit" onClick={handleAddData}>
                  Submit
                </Button>,
            ]}>
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Create Transaction Management</h1>
              </div>
              <form className="font-poppins mt-8 font-medium" onSubmit={handleAddData} autoComplete="off">
                <div className="text-md">
                  <div className="flex gap-10">
                    <div className="mt-6 w-1/2">
                      <label className="">Attribute</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={attribute} onChange={(e)=> setAttribute(e.target.value)} id='attribute'/>
                    </div>
                    <div className="mt-6 w-1/2">
                      <label className="">Field Tag</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={fieldTag} onChange={(e)=> setFieldTag(e.target.value)} id='fieldTag'/>
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="">Config ID</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={configId} onChange={(e)=> setConfigId(e.target.value)} id='fieldTag'/>
                  </div>
                  <div className="w-full mt-5 mb-7">
                    <label className="">Description</label>
                    <textarea
                      rows="10"
                      className="w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"
                      value={description} onChange={(e)=> setDescription(e.target.value)} id='description'></textarea>
                  </div>
                </div>
              </form>
            </Modal>
          </span>
        </div>
        <div className="flex flex-col md:flex-row mr-5">
          <span className="hidden md:block">
            <div className="pl-10 md:pl-5 mt-5 md:mt-0 mr-5">
              <button
                onClick={showModal}
                className="bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center"
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
                <Button key="submit" type="primary" htmlType="submit" onClick={handleAddData}>
                  Submit
                </Button>,
            ]}>
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Create Transaction Management</h1>
              </div>
              <form className="font-poppins mt-8 font-medium" onSubmit={handleAddData} autoComplete="off">
                <div className="text-md">
                  <div className="flex gap-10">
                    <div className="mt-6 w-1/2">
                      <label className="">Attribute</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={attribute} onChange={(e)=> setAttribute(e.target.value)} id='attribute'/>
                    </div>
                    <div className="mt-6 w-1/2">
                      <label className="">Field Tag</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={fieldTag} onChange={(e)=> setFieldTag(e.target.value)} id='fieldTag'/>
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="">Config ID</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={configId} onChange={(e)=> setConfigId(e.target.value)} id='fieldTag'/>
                  </div>
                  <div className="w-full mt-5 mb-7">
                    <label className="">Description</label>
                    <textarea
                      rows="10"
                      className="w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"
                      value={description} onChange={(e)=> setDescription(e.target.value)} id='description'></textarea>
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
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Edit Transaction Management</h1>
              </div>
              <form onSubmit={handleUpdateData} className="font-poppins mt-8 font-medium" autoComplete="off">
                <div className="text-md">
                  <div className="flex gap-10">
                    <div className="mt-6 w-1/2">
                      <label className="">Attribute</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.attribute} onChange={(e)=> setEditFormData({ ...editFormData, attribute: e.target.value})} id='attribute'/>
                    </div>
                    <div className="mt-6 w-1/2">
                      <label className="">Field Tag</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.fieldTag} onChange={(e)=> setEditFormData({...editFormData, fieldTag: e.target.value})} id='fieldTag'/>
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="">Config ID</label>
                    <input className="w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.configId} onChange={(e)=> setEditFormData({ ...editFormData, configId: e.target.value})} id='configId' />
                  </div>
                  <div className="w-full mt-5 mb-7">
                    <label className="">Description</label>
                    <textarea
                      rows="10"
                      className="w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"
                      value={editFormData.description} onChange={(e)=> setEditFormData({ ...editFormData, description: e.target.value})} id='description'></textarea>
                  </div>
                </div>
              </form>
            </Modal>
            {/* Modal Delete */}
            <Modal open={isModalDeleteOpen} onOk={handleDeleteData} onCancel={isDeleteCancel} closable={true} okText="OK">
                <div className="text-center text-secondary font-bold text-base font-poppins">
                    <h1>Delete</h1>
                </div>
               <div className="flex justify-center my-5">
                <Image src="/Images/warning.svg" width={35} height={35} alt=''/>
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
          dataSource={data}
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

export default TransactionType;