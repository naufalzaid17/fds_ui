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
const Select = dynamic(() => import('antd').then((antd) => antd.Select),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
// const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import React from 'react'
import { MoreOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'
import { parseISO, formatISO } from 'date-fns'
import {message} from 'antd'

const UserManagement = () => {
  const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [institution, setInstitution] =  useState("");
  const [type, setType] = useState("");
  const [userGroup, setUserGroup] = useState("");
  const [role, setRole] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [detailItemId, setDetailItemId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [idInstitution, setIdInstitution] = useState(0);
  const [idType, setIdType] = useState(0);
  const [idGroup, setIdGroup] = useState(0);
  const [idRole, setIdRole] = useState(0);
  const [institutionObj, setInstitutionObj] = useState([]);
  const [roleObj, setRoleObj] = useState([]);
  const [typeObj, setTypeObj] = useState([]);
  const [userGroupObj, setUserGroupObj] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState([]);

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


  // Modal Detail
  const router = useRouter();
  const showModalDetail = (record) => {
    setDetailItemId(record.username)
    const username = record.username;
    router.push(`/User-Management/UserDetail/${username}`);
  };

  // Modal Delete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const showModalDelete = (record) => {
    // console.log(record.id);
    setIsModalDeleteOpen(true);
    setDeleteItemId(record.id);
    // console.log(deleteItemId)
  }
  const isDeleteOK = () => {
    setIsModalDeleteOpen(false);
  }
  const isDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  }

  useEffect(() => {
    getInstitutionObj();
  }, []);

  const getInstitutionObj= async() => {
    const res = await axios.get(`http://${apiAddress}/institution/list`)
    .then(
      res => {
        console.log(res.data.responseData);
        setLoading(false);
        setInstitutionObj(
          res.data.responseData.map(row => ({
            id : row.id,
            name : row.name
          }))
        )
        console.log(institutionObj);
      }
    );
  }

  useEffect(() => {
    getRoleObj();
  }, [])

  const getRoleObj = async() => {
    const res = await axios.get(`http://${apiAddress}/role/list`)
    .then(
      res => {
        setLoading(false);
        setRoleObj(
          res.data.responseData.map(row => ({
            id: row.id,
            name: row.name
          }))
        )
      }
    );
  }

  useEffect(() => {
    getTypeObj();
  }, []
  )

  const getTypeObj = async() => {
    const res = await axios.get(`http://${apiAddress}/type/list`)
    .then(
      res => {
        setLoading(false);
        setTypeObj(
          res.data.responseData.map(row => ({
            id: row.id,
            name: row.typeName
          }))
        )
      }
    );
  }

  useEffect(() => {
    getUserGroupObj();
  }, [])

  const getUserGroupObj = async() => {
    const res = await axios.get(`http://${apiAddress}/user/group/list`)
    .then(
      res => {
        setLoading(false);
        setUserGroupObj(
          res.data.responseData.map(row => ({
            id: row.id,
            name: row.groupName
          }))
        )
      }
    )
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {
    const res = await axios.get(`http://${apiAddress}/user/listUsers`)
    .then(
      res => {
        // console.log(res.data.responseData);
        setLoading(false);
        setData(
          res.data.responseData.map(row => ({
            id: row.id,
            name: row.name,
            username: row.username,
            email: row.email,
            lastLoginDate: row.lastLoginDate,
            isActive: row.isActive,
            isNotLocked: row.isNotLocked,
            joinDate: formatISO(new Date(row.joinDate), {representation: 'date'}),
            institution:{
              id: row.institution.id
            },
            type:{
              id: row.type.id
            },
            userGroup:{
              id: row.userGroup.id
            },
            role:{
              id: row.role.id
            }
          }))
        )
      }
    );
  };

  const handleAddData = async (e) => {
    e.preventDefault();
    try{
      console.log(role);
      const dataNew = {
        name,
        username,
        email,
        joinDate: new Date(),
        institution:{
          id: institution
        },
        type:{
          id: type
        },
        userGroup:{
          id: userGroup
        },
        role:{
          id: role
        },
      };
      console.log(dataNew);
      const res = await axios.post(`http://${apiAddress}/user/add`, dataNew);
      setName('');
      setUsername('');
      setPassword('');
      setEmail('');
      setJoinDate('');
      setInstitution('');
      setType('');
      setUserGroup('');
      setRole('');
      setIsModalOpen(false);
      getData();
      if(res.data.responseCode == 200){
        message.open({
          content: 'Data Added Successfully',
          type:'success',
          duration: 3
        });
      }else{
        message.open({
          content: res.data.responseMessage,
          type: 'error',
          duration: 3
        });
      }
    }catch (error){
        console.error(error);
    }
  }

  const [editFormData, setEditFormData] = useState({
    name: '',
    username: '',
    email: '',
    institution:{
      id: ''
    },
    type:{
      id: ''
    },
    userGroup:{
      id: ''
    },
    role:{
      id: ''
    },
  });

  // Modal Edit
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const showModalEdit = (record) => {
    console.log(record);
    setIsModalEditOpen(true);
    setUpdateItemId(record.username);
    setEditFormData(record);
  };
  const isEditOK = () => {
    setIsModalEditOpen(false);
  };
  const isEditCancel = () => {
    setIsModalEditOpen(false);
  }

  const handleInstitution = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      institution: {
        ...prevFormData.institution,
        id: selectedValue,
      },
    }));
  };

  const handleType = (e) => {
    const selectedValue = e.target.value;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      type: {
        ...prevFormData.type,
        id: selectedValue,
      },
    }));
  };

  const handleGroup = (e) => {
    const selectedValue = e.target.value;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      userGroup: {
        ...prevFormData.userGroup,
        id: selectedValue,
      },
    }));
  };

  const handleRole = (e) => {
    const selectedValue = e.target.value;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      role: {
        ...prevFormData.role,
        id: selectedValue,
      },
    }));
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try{
      console.log(editFormData);
      const res= await axios.post(`http://${apiAddress}/user/update`, editFormData, {
        params: {
          currentUsername: updateItemId
        }
      })
      setUpdateItemId(null);
      getData();
      setLoading(false);
      isEditCancel();
      if(res.data.responseCode == 200){
        message.open({
          content: 'Data Updated Successfully',
          type:'success',
          duration: 3
        });
      }else{
        message.open({
          content: res.data.responseMessage,
          type: 'error',
          duration: 3
        });
      }
    }catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const handleDeleteData = async () => {
    try{
      setLoading(true);
      const res = await axios.delete(`http://${apiAddress}/user/delete/${deleteItemId}`);
      setSelectedRowKeys([]);
      setDeleteItemId(null);
      getData();
      setLoading(false);
      isDeleteCancel();
      if(res.data.responseCode == 200){
        message.open({
          content: 'Data Deleted Successfully',
          type:'success',
          duration: 3
        });
      }else{
        message.open({
          content: res.data.responseMessage,
          type: 'error',
          duration: 3
        });
      }
    }catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  // STATUS USER
const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
const showModalActive = (record) => {
  setSelectedRecord(record);
  setIsModalStatusOpen(true);
};

const handleModalStatusCancel = () => {
  setIsModalStatusOpen(false);
};

const showModalNonActive = (record) => {
  setSelectedRecord(record);
  setIsModalStatusOpen(true);
};
const statusActive = async () => {
  try{
    console.log(selectedRecord);
    const username = selectedRecord.username;
    const res = await axios.post(`http://${apiAddress}/user/activate/${username}`);
    setIsModalStatusOpen(false);
    getData();
    if(res.data.responseCode == 200){
      message.open({
          content: 'User Activated Succesfully',
          type:'success',
          duration: 3
      }); 
    }else{
        message.open({
            content: res.data.responseMessage,
            type: 'error',
            duration: 3
        });
    }
  }catch(error){
    console.error(error);
  }
}
const statusNonActive = async () => {
  try{
    console.log(selectedRecord);
    const username = selectedRecord.username;
    const res = await axios.post(`http://${apiAddress}/user/deactivate/${username}`);
    setIsModalStatusOpen(false);
    getData();
    if(res.data.responseCode == 200){
      message.open({
          content: 'User Deactivated Succesfully',
          type:'success',
          duration: 3
      });
    }else{
        message.open({
            content: res.data.responseMessage,
            type: 'error',
            duration: 3
        });
    }
  }catch(error){
    console.error(error);
  }
}

// LOCK USER
const [isModalLockOpen, setIsModalLockOpen] = useState(false);
const showModalLockOpen = (record) => {
  setSelectedRecord(record);
  setIsModalLockOpen(true);
};

const handleModalLockCancel = () => {
  setIsModalLockOpen(false);
};

const showModalUnlockOpen = (record) => {
  setSelectedRecord(record);
  setIsModalLockOpen(true);
};
const lockUser = async () => {
  try{
    console.log(selectedRecord);
    const username = selectedRecord.username;
    const res = await axios.post(`http://${apiAddress}/user/activate/${username}`);
    setIsModalLockOpen(false);
    getData();
    if(res.data.responseCode == 200){
      message.open({
          content: 'User Locked Succesfully',
          type:'success',
          duration: 3
      }); 
    }else{
        message.open({
            content: res.data.responseMessage,
            type: 'error',
            duration: 3
        });
    }
  }catch(error){
    console.error(error);
  }
}
const nonlockUser = async () => {
  try{
    console.log(selectedRecord);
    const username = selectedRecord.username;
    const res = await axios.post(`http://${apiAddress}/user/deactivate/${username}`);
    setIsModalLockOpen(false);
    getData();
    if(res.data.responseCode == 200){
      message.open({
          content: 'User Unlocked Succesfully',
          type:'success',
          duration: 3
      });
    }else{
        message.open({
            content: res.data.responseMessage,
            type: 'error',
            duration: 3
        });
    }
  }catch(error){
    console.error(error);
  }
}

  function getItem(icon, key, children, type) {
    return {
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
      getItem('Detail', 'detail'),
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
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
    {
      title: 'Last Login Date',
      dataIndex: 'lastLoginDate',
      key: 'lastLoginDate',
    },
    {
      title: 'Status',
      key: 'isActive',
      dataIndex: 'isActive',
      render: (isActive, record) => (
        <>
          {isActive === true ? (
            <button onClick={() => showModalActive(record)}> 
              <Tag color='blue' text="Active" key={isActive} className='text-red'>
                ACTIVE
              </Tag>
            </button>
          ) : (
            <button onClick={() => showModalNonActive(record)}>
              <Tag color='red' text="Non Active" key={isActive}>
                NON ACTIVE
              </Tag>
            </button>
          )}
        </>
      ),
    },
    {
      title: 'Locked',
      key: 'isLocked',
      dataIndex: 'isLocked',
      render: (isLocked, record) => (
        <>
          {isLocked === true ? (
            <button onClick={() => showModalLockOpen(record)}> 
              <Tag color='blue' text="Locked" key={isLocked} className='text-red'>
                LOCKED
              </Tag>
            </button>
          ) : (
            <button onClick={() => showModalUnlockOpen(record)}>
              <Tag color='red' text="Non Locked" key={isLocked}>
                NON LOCKED
              </Tag>
            </button>
          )}
        </>
      ),
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
                // <WhiteListDetail id={record.id}/>
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
      <HeadTitle title="User" />
      <HeadContent pageTitle="User" caption="List of users" />
      <div className="flex flex-col gap-8 pt-6">
        <div className='flex justify-between'>
          <div className='flex flex-col md:flex-row'>
            <Search/>
            <span className='md:hidden'>
            <button onClick={showModal} className='bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
            <FontAwesomeIcon icon={faPlus}/>
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
                <h1>Create User</h1>
              </div>
              <form className='font-poppins mt-12 font-medium' autoComplete='off'>
                <div className="text-sm">
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Name</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Email</label>
                      <input type="email" className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                  </div>
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Username</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Role</label>
                      <select className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700' value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="0" selected={true}>Select Role</option>
                        {roleObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Institution</label>
                      <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={institution} onChange={(e)=> setInstitution(e.target.value)} id='entityType'>
                        <option value="0">Select Field</option>
                        {institutionObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Type</label>
                      <select className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700' value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="0" selected={true}>Select Type</option>
                        {typeObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="">User Group</label>
                      <select className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700' value={userGroup} onChange={(e) => setUserGroup(e.target.value)}>
                        <option value="0" selected={true}>Select User Group</option>
                        {userGroupObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                  </div>
                </div>
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
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Create User</h1>
              </div>
              <form className='font-poppins mt-12 font-medium' autoComplete='off'>
                <div className="text-sm">
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Name</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Email</label>
                      <input type="email" className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                  </div>
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Username</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Role</label>
                      <select className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700' value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="0" selected={true}>Select Role</option>
                        {roleObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Institution</label>
                      <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={institution} onChange={(e)=> setInstitution(e.target.value)} id='entityType'>
                        <option value="0">Select Field</option>
                        {institutionObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Type</label>
                      <select className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700' value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="0" selected={true}>Select Type</option>
                        {typeObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="">User Group</label>
                      <select className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700' value={userGroup} onChange={(e) => setUserGroup(e.target.value)}>
                        <option value="0" selected={true}>Select User Group</option>
                        {userGroupObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
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
              width={800}
              closable={true}
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
                <h1>Edit User</h1>
              </div>
              <form className='font-poppins mt-12 font-medium' onSubmit={handleUpdateData}>
                <div className="text-sm">
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Name</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}/>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Email</label>
                      <input type="email" className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.email} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}/>
                    </div>
                  </div>
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Username</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.username} onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}/>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Role</label>
                      <select className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700'                               value={editFormData.role.id}
                      onChange={handleRole}>
                        <option value="0" selected={true}>Select Role</option>
                        {roleObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Institution</label>
                      <select className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700'                               value={editFormData.institution.id}
                      onChange={handleInstitution}>
                        <option value="0" selected={true}>Select Institution</option>
                        {institutionObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Type</label>
                      <select className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700'                               value={editFormData.type.id}
                      onChange={handleType}>
                        <option value="0" selected={true}>Select Type</option>
                        {typeObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="">User Group</label>
                      <select className='minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700'                               value={editFormData.userGroup.id}
                      onChange={handleGroup}>
                        <option value="0" selected={true}>Select User Group</option>
                        {userGroupObj.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
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
        {/* MODAL ACTIVE & DEACTIVE CASE */}
        {selectedRecord && (
        <>
          {selectedRecord.isActive === false ? (
            <Modal
              open={isModalStatusOpen}
              onOk={statusActive}
              onCancel={handleModalStatusCancel}
              closable
              okText="OK"
            >
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Activate User</h1>
              </div>
              <div className="flex justify-center my-5">
                <Image src="/Images/warning.svg" width={65} height={65} alt=''/>
              </div>
              <div className='text-center'>
                <h1 className="font-bold text-lg font-poppins">Are you sure want to proceed?</h1>
              </div>
            </Modal>
          ) : (
            <Modal
              open={isModalStatusOpen}
              onOk={statusNonActive}
              onCancel={handleModalStatusCancel}
              closable
              okText="OK"
            >
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Deactivate User</h1>
              </div>
              <div className="flex justify-center my-5">
                <Image src="/Images/warning.svg" width={65} height={65} alt=''/>
              </div>
              <div className='text-center'>
                <h1 className="font-bold text-lg font-poppins">Are you sure want to proceed?</h1>
              </div>
            </Modal>
          )}
        </>
        )}

        {/* MODAL LOCKED & UNLOCKED CASE */}
        {selectedRecord && (
        <>
          {selectedRecord.isLocked === false ? (
            <Modal
              open={isModalLockOpen}
              onOk={lockUser}
              onCancel={handleModalLockCancel}
              closable
              okText="OK"
            >
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Lock User</h1>
              </div>
              <div className="flex justify-center my-5">
                <Image src="/Images/warning.svg" width={65} height={65} alt=''/>
              </div>
              <div className='text-center'>
                <h1 className="font-bold text-lg font-poppins">Are you sure want to proceed?</h1>
              </div>
            </Modal>
          ) : (
            <Modal
              open={isModalLockOpen}
              onOk={nonlockUser}
              onCancel={handleModalLockCancel}
              closable
              okText="OK"
            >
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Unlock User</h1>
              </div>
              <div className="flex justify-center my-5">
                <Image src="/Images/warning.svg" width={65} height={65} alt=''/>
              </div>
              <div className='text-center'>
                <h1 className="font-bold text-lg font-poppins">Are you sure want to proceed?</h1>
              </div>
            </Modal>
          )}
        </>
        )}
      </div>
    </Layout>
  )
}

export default UserManagement