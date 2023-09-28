import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr:true});
const Search = dynamic(() => import('../../components/search'),{csr:true});
const Filter = dynamic(() => import('../../components/filter'),{csr:true});
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
const Slider = dynamic(() => import('antd').then((antd) => antd.Slider),{csr: true})
const InputNumber = dynamic(() => import('antd').then((antd) => antd.InputNumber),{csr: true})
import { MoreOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetData, AddScenarioGroup, EditScenarioGroup, DeleteScenarioGroup } from '@/services/ScenarioGroupServices/Services';

const ScenarioGroup = () => {
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [threshouldBlack, setThreshouldBlack] = useState("");
  const [threshouldGrey, setThreshouldGrey] = useState("");
  const [priority, setPriority] = useState("");
  const [role, setRole] = useState("");
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [detailItemId, setDetailItemId] = useState(null);
  const {data, handleRead} = GetData();
  const handleAddScenarioGroup = AddScenarioGroup();
  const handleEditScenarioGroup = EditScenarioGroup();
  const handleDeleteScenarioGroup = DeleteScenarioGroup();
  const handleSliderChange = (value) => {
    setPriority(value);
  };
  const handleInputChange = (value) => {
    setPriority(value);
  };
  const handleSliderEdit = (value) => {
    setEditFormData({
      ...editFormData,
      priority: value,
    });
  };
  const handleInputEdit = (value) => {
    setEditFormData({
      ...editFormData,
      priority: value,
    });
  };

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
        groupName,
        threshouldBlack,
        threshouldGrey,
        priority,
        isActive: null,
        isForcedReaction: null,
        userGroup:{
            id: 1
        }
      };
      await handleAddScenarioGroup(dataNew, setGroupName, setThreshouldBlack, setThreshouldGrey, setPriority, setIsModalOpen, handleRead)
    } catch (error) {
      console.log(error);
    }
  }

  //DETAIL
  const router = useRouter();
  const showModalDetail = (record) => {
    setDetailItemId(record.id)
    const id = record.id;
    router.push(`/Monitoring/ScenarioGroupDetail/${id}`);
  };

  // FRAUD REACTION
  const showModalFraudReaction = (record) => {
    setDetailItemId(record.id);
    const id = record.id;
    router.push(`/Scenario/ScenarioGroupFraudReaction?id=${id}`);
  }

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
      await handleDeleteScenarioGroup(deleteItemId, setDeleteItemId, handleRead, setLoading, isDeleteCancel)
    } catch (error) {
      console.log(error);
    }
  }

// EDIT
const [isModalEditOpen, setIsModalEditOpen] = useState(false);
const [editFormData, setEditFormData] = useState([]);
const showModalEdit = (record) => {
    setIsModalEditOpen(true);
    setUpdateItemId(record.id);
    setEditFormData(record);
};
const isEditOK = () => {
    setIsModalEditOpen(false);
};
const isEditCancel = () => {
    setIsModalEditOpen(false);
}
const handleEdit = async(e) => {
  e.preventDefault();
  try {
    const form = {
      id: updateItemId,
      groupName:'',
      threshouldBlack:'',
      threshouldGrey:'',
      priority:'',
      isActive: null,
      isForcedReaction: null,
      userGroup:{
          id: 1
      }
    };
    setEditFormData(form);
    await handleEditScenarioGroup(editFormData, setUpdateItemId, handleRead, setLoading, isEditCancel)
  } catch (error) {
    console.log(error);
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
      getItem('Fraud Reaction', 'reaction'),
      getItem('Delete', 'delete'),
    ]),
  ];

  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      key: 'groupName',
    },
    {
      title: 'Threshould Black',
      dataIndex: 'threshouldBlack',
      key: 'threshouldBlack',
    },
    {
      title: 'Threshould Grey',
      dataIndex: 'threshouldGrey',
      key: 'threshouldGrey',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
    },
    {
        title: 'Group Name',
        dataIndex: 'group',
        key: 'group',
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
              } else if(e.key === 'reaction'){
                showModalFraudReaction(record)
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
      <HeadTitle title="Studio Group" />
      <HeadContent pageTitle="Studio Group" caption="A studio group is a set of rules." />
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
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Create Studio Group</h1>
              </div>
              <form className='font-poppins mt-12 font-medium'>
                <div className="text-sm">
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Group Name</label>
                      <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Threshould Black</label>
                      <input type="number" className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={threshouldBlack} onChange={(e) => setThreshouldBlack(e.target.value)}/>
                    </div>
                  </div>
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Threshould Grey</label>
                      <input type='number' className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={threshouldGrey} onChange={(e) => setThreshouldGrey(e.target.value)}/>
                    </div>
                    <div className="mt-4 w-1/2">
                    <label className=''>Priority</label>
                      <Slider  className='' min={0} max={10} value={priority} onChange={handleSliderChange}/>
                      <InputNumber
                        min={0}
                        max={10}
                        value={priority}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                    <div className="mt-4 w-full">
                      <label className="">Group Name</label>
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
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Edit Studio Group</h1>
              </div>
              <form className='font-poppins mt-12 font-medium'>
                <div className="text-sm">
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Group Name</label>
                      <input className="w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.groupName} onChange={(e) => setEditFormData({ ...editFormData, groupName: e.target.value })}/>
                    </div>
                    <div className="mt-4 w-1/2">
                      <label className="">Threshould Black</label>
                      <input type="number" className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.threshouldBlack} onChange={(e) => setEditFormData({ ...editFormData, threshouldBlack: e.target.value })}/>
                    </div>
                  </div>
                  <div className='flex gap-10'>
                    <div className="mt-4 w-1/2">
                      <label className="">Threshould Grey</label>
                      <input type='number' className="w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.threshouldGrey} onChange={(e) => setEditFormData({ ...editFormData, threshouldGrey: e.target.value })}/>
                    </div>
                    <div className='w-1/2'>
                      <label className=''>Priority</label>
                      <Slider  className='' min={0} max={10} onChange={handleSliderEdit} value={editFormData.priority} />
                      <InputNumber
                        min={0}
                        max={10}
                        value={editFormData.priority}
                        onChange={handleInputEdit}
                      />
                    </div>
                  </div>
                    <div className="mt-4 w-full">
                      <label className="">Institution</label>
                      <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='group' id='group' disabled>
                        {/* <option value="0" selected className=''>Select Field</option> */}
                        <option value="1">Group 1</option>
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

export default ScenarioGroup