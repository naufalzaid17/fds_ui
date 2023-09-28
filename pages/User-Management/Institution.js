import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr: true});
const Search = dynamic(() => import('../../components/search'),{csr: true})
const Filter = dynamic(() => import('../../components/filter'),{csr: true})
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const DatePicker = dynamic(() => import('antd').then((antd) => antd.DatePicker),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const ConfigProvider = dynamic(() => import('antd').then((antd) => antd.ConfigProvider),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Tag = dynamic(() => import('antd').then((antd) => antd.Tag),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
// const Form = dynamic(() => import('antd').then((antd) => antd.Form),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import { MoreOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'
import {Form} from 'antd'


const Institution = () => {
  const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [id, setDeleteItemId] = useState(null);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [form] = Form.useForm();

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
    console.log(record);
      setIsModalDeleteOpen(true);
      setDeleteItemId(record.id);
  }
  const isDeleteOK = () =>{
    setIsModalDeleteOpen(false);
  }
  const isDeleteCancel = () =>{
    setIsModalDeleteOpen(false);
  }


useEffect(() => {
  getData();
}, []);

const getData = async() => {
  const res = await axios.get(`http://${apiAddress}/institution/list`).then(
    res => {
      setLoading(false);
      console.log(res.data.responseData);
      setData(
        res.data.responseData.map(row => ({
          id: row.id,
          name: row.name,
          description: row.description
        }))
      )
    }
  );
};

const handleAddData = async (e) => {
  e.preventDefault();
  try {
    const dataNew = {
      name, 
      description
    };
    // console.log(dataNew);
    await axios.post(`http://${apiAddress}/institution/add`, dataNew);
    setName('');
    setDescription('');
    setIsModalOpen(false);
    getData();
    // return('/List-Management/WhiteList')
  } catch (error) {
      console.error(error);
  }
}

const [editFormData, setEditFormData] = useState({
  name: '',
  description: ''
});

 // Modal Edit
 const [isModalEditOpen, setIsModalEditOpen] = useState(false);
 const showModalEdit = (record) => {
    console.log(record.name);
    setIsModalEditOpen(true);
    setUpdateItemId(record.name); // Menggunakan record.name sebagai identifikasi
    setEditFormData(record);
};
 const isEditOK = () =>{
   setIsModalEditOpen(false);
 };
 const isEditCancel = () =>{
   setIsModalEditOpen(false);
 }

const handleUpdateData = async (e, record) =>{
  e.preventDefault();
  try {
    console.log(editFormData);
    await axios.post(`http://${apiAddress}/institution/update`, editFormData, {
      params: {
        currentInstitutionName: updateItemId,
      } 
    }); 
    setUpdateItemId(null);
    getData();
    setLoading(false);
    isEditCancel();
  } catch (error) {
      console.error(error);
      setLoading(false);
  }
}

const handleDeleteData = async () => {
  try {
    // console.log(listId);
    setLoading(true);
    const res = await axios.delete(`http://${apiAddress}/institution/delete/${id}`);
    console.log(res);
    setSelectedRowKeys([]);
    setDeleteItemId(null);
    getData();  
    setLoading(false);
    isDeleteCancel();
  } catch (error) {
      console.error(error);
      setLoading(false);
  }
}

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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
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
      <HeadTitle title="Institution" />
      <HeadContent pageTitle="Institution" caption="A list of users grouped by institution" />
        <div className="flex flex-col gap-8 pt-6">
            <div className='flex justify-between'>
                <div className='flex flex-col md:flex-row'>
                    <Search/>
                    <span className='md:hidden'>
            <button onClick={showModal} className='bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
            <FontAwesomeIcon icon={faPlus}/>
                  Add New Record
            </button>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closable={true} width={800} footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" htmlType="submit" onClick={handleAddData}>
                Submit
              </Button>,
          ]}>
                <div className="text-center text-secondary font-bold text-xl font-poppins">
                  <h1>Create Institution</h1>
                </div>
                <form className='font-poppins mt-8 font-medium' onSubmit={handleAddData} autoComplete='
                off'>
                    <div className="text-md">
                        <div className='flex gap-10'>
                            <div className="mt-1 w-1/2">
                                <label className="">Name</label>
                                <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={name} onChange={(e)=> setName(e.target.value)} id='name'/>
                            </div>
                            <div className="mt-1 w-1/2">
                                <label className="">Description</label>
                                <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={description} onChange={(e)=> setDescription(e.target.value)} id='description'/>
                            </div>
                        </div>
                    </div>
                    {/* <button className='mt-3' type='submit'>Create</button> */}
                </form>
            </Modal>
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
                  <h1>Create Institution</h1>
                </div>
                <form className='font-poppins mt-8 font-medium' onSubmit={handleAddData} autoComplete='off'>
                    <div className="text-md">
                        <div className='flex gap-10'>
                            <div className="mt-1 w-1/2">
                                <label className="">Name</label>
                                <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={name} onChange={(e)=> setName(e.target.value)} id='name'/>
                            </div>
                            <div className="mt-1 w-1/2">
                                <label className="">Description</label>
                                <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={description} onChange={(e)=> setDescription(e.target.value)} id='description'/>
                            </div>
                        </div>
                    </div>
                    {/* <button className='mt-3' type='submit'>Create</button> */}
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
                  <h1>Edit Institution</h1>
                </div>
                <form onSubmit={handleUpdateData} className='font-poppins mt-8 font-medium' autoComplete='off'>
                    <div className="text-md">
                        <div className='flex gap-10'>
                        <div className="mt-1 w-1/2">
                                <label className="">Name</label>
                                <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}id='name'/>
                            </div>
                            <div className="mt-1 w-1/2">
                                <label className="">Description</label>
                                <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.description
                                } onChange={(e) => setEditFormData({ ...editFormData, description
                                  : e.target.value })} id='description'/>
                            </div>
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
          <Filter />
          <div className='mt-[21px] md:mt-0'>
            <Filter />
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
          <Table columns={columns} dataSource={data}  size="small" pagination={{
            position: ['bottomCenter'], defaultPageSize: 10,
          }} />
        )}
      </main>
      </div>
    </Layout>
  )
}

export default Institution