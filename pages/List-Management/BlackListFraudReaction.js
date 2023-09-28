import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr:true});
const Search = dynamic(() => import('../../components/search'),{csr:true});
const Filter = dynamic(() => import('../../components/filter'),{csr:true});
import { MoreOutlined } from '@ant-design/icons'
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
const Slider = dynamic(() => import('antd').then((antd) => antd.Slider),{csr: true})
const InputNumber = dynamic(() => import('antd').then((antd) => antd.InputNumber),{csr: true})
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faPlus}  from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { GetDataFraud, AddDataFraud, EditDataFraud, DeleteDataFraud } from '@/services/BlackListServices/Services';


const BlackListFraudReaction = () => {
const [loading, setLoading] = useState(false);
const [bindingType, setBindingType] = useState('');
const [bindingId, setBindingId] = useState('');
const [priority, setPriority] = useState(5);
const [zone, setZone] = useState('');
const [action, setAction] = useState('');
const [actionValue, setActionValue] = useState('');
const [description, setDescription] = useState(''); 
const [deleteItemIdFraud, setDeleteItemIdFraud] = useState(null);
const [updateItemIdFraud, setUpdateItemIdFraud] = useState(null);
const router = useRouter();
const id = router.query.id;
const {dataFraud, handleReadFraud} = GetDataFraud(id);
const handleAddFraud = AddDataFraud();
const handleEditFraud = EditDataFraud();
const handleDeleteFraud = DeleteDataFraud();
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
  if (id) {
    handleReadFraud();
  }
}, [id]);

// CREATE
const [isModalCreateFraudOpen, setIsModalCreateFraudOpen] = useState(false);
const showModalCreate = () => {
  setIsModalCreateFraudOpen(true);
};
const isCreateFraudOK = () => {
  setIsModalCreateFraudOpen(false);
};
const isCreateFraudCancel = () => {
  setIsModalCreateFraudOpen(false);
};
const handleAdd = async(e) => {
  e.preventDefault();
  try {
    const dataNew = {
      bindingId: id,
      bindingType: "blacklist",
      priority,
      zone,
      action,
      actionValue,
      description
    };
    await handleAddFraud(dataNew, setBindingId, setBindingType, setPriority, setZone, setAction, setActionValue, setDescription, setIsModalCreateFraudOpen, handleReadFraud)
  } catch (error) {
    console.log(error);
  }
}

// DELETE
const [isModalDeleteFraudOpen, setIsModalDeleteFraudOpen] = useState(false);
const showModalDeleteFraud = (record) => {
    setIsModalDeleteFraudOpen(true);
    setDeleteItemIdFraud(record.id);
};
const isDeleteFraudCancel = () => {
  setIsModalDeleteFraudOpen(false);
};
const handleDelete = async(e) => {
  e.preventDefault();
  try {
    await handleDeleteFraud(deleteItemIdFraud, setDeleteItemIdFraud, handleReadFraud, setLoading, isDeleteFraudCancel)
  } catch (error) {
    console.log(error);
  }
}


// EDIT
const [isModalEditFraudOpen, setIsModalEditFraudOpen] = useState(false);
const [editFormData, setEditFormData] = useState([]);
const showModalEditFraud = (record) => {
  setIsModalEditFraudOpen(true);
  setUpdateItemIdFraud(record.id);
  setEditFormData(record);
  console.log(record);
};
const isEditFraudOK = () => {
  setIsModalEditFraudOpen(false);
};
const isEditFraudCancel = () => {
  setIsModalEditFraudOpen(false);
};
const handleEdit = async(e) => {
  e.preventDefault();
  try {
    const form = {
      bindingId: id,
      bindingType: 'blacklist',
      priority: '',
      zone: '',
      action: '',
      actionValue: '',
      description: ''
    };
    setEditFormData(form);
    await handleEditFraud(editFormData, setUpdateItemIdFraud, handleReadFraud, setLoading, isEditFraudCancel)
  } catch (error) {
    console.log(error);
  }
}

// TABLE CONFIG FRAUD
function getItem(icon, key, children, type){
    return{
      icon, 
      key,
      children,
      type
    }
}
const itemsFraud = [
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
const columnsFraud = [
{
  title: 'Binding Id',
  dataIndex: 'bindingId',
  key: 'bindingId',
},
{
  title: 'Binding Type',
  dataIndex: 'bindingType',
  key: 'bindingType',
},
{
  title: 'Priority',
  dataIndex: 'priority',
  key: 'priority',
},
{
  title: 'Zone',
  dataIndex: 'zone',
  key: 'zone',
},
{
  title: 'Action',
  dataIndex: 'action',
  key: 'action',
},
{
  title: 'Action Value',
  dataIndex: 'actionValue',
  key: 'actionValue',
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
            showModalEditFraud(record)
          } else if(e.key === 'delete') {
            showModalDeleteFraud(record)
          } 
        }}
        style={{
          border: 'none',
        }}
        defaultSelectedKeys={['edit']}
        defaultOpenKeys={['']}
        mode='horizontal'
        items={itemsFraud}
        triggerSubMenuAction = 'click'
      />
    </Space>
    )
},
}
];
  return (
    <Layout>
        {/* Fraud reaction */}
        <HeadTitle title="Fraud Reaction"/>
        <HeadContent pageTitle="Fraud Reaction" caption="Fraud Reaction enables to configure actions performed by the SVFM system depending on the risk value obtained from triggered rules."/>
        <div className="flex flex-col gap-8 pt-6">
            <div className='flex justify-between'>
                <Search/>
                <div className='flex flex-col md:flex-row md:gap-5'>
                    <div className='mt-5 md:mt-0'>
                        <button onClick={showModalCreate} className='flex gap-2 bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
                            <FontAwesomeIcon icon={faPlus}/>
                              Add New Record
                        </button>
                </div>
          <Filter/>
          <div className="mt-[21px] md:mt-0">
            <Filter/>
          </div>
        </div>
      </div>
      {/* Modal create */}
      <Modal open={isModalCreateFraudOpen} onOk={isCreateFraudOK} onCancel={isCreateFraudCancel} closable={true} width={800} footer={[
        <Button key="cancel" onClick={isCreateFraudCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" htmlType="submit" onClick={handleAdd}>
          Submit
        </Button>,
        ]}>
          <div className="text-center text-secondary font-bold text-xl font-poppins">
            <h1>Create Fraud Reaction</h1>
          </div>
          <form className='font-poppins mt-8 font-medium' onSubmit={handleAdd} autoComplete='off'>
              <div className="text-md">
                  <div className='flex gap-10 mt-5'>
                      <div className="w-1/2">
                          <label className="">Zone</label>
                          <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='group' value={zone
                          } onChange={(e)=> setZone(e.target.value)} id='group'>
                            <option value="0" selected className=''>Select Field</option>
                            <option value="grey">Grey</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                          </select>
                      </div>
                      <div className='w-1/2'>
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
                  <div className='flex gap-10 mt-5'>
                      <div className="mt-1 w-1/2">
                          <label className="">Action</label>
                          <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='action' value={action
                          } onChange={(e)=> setAction(e.target.value)} id='action'>
                            <option value="0" selected className=''>Select Field</option>
                            <option value="Create Alert">CREATE_ALERT</option>
                            <option value="Set Response Code">SET_RESPCODE</option>
                            <option value="SMS Notification">SMS_NOTIFICATION</option>
                            <option value="Email Notification">EMAIL_NOTIFICATION</option>
                            <option value="Put attribute to black list">Put attribute to black list</option>
                            <option value="Put attribute to list">Put attribute to list</option>
                            <option value="Put attribute to white list">Put attribute to white list</option>
                          </select>
                      </div>
                      <div className="mt-1 w-1/2">
                          <label className="">Action Value</label>
                          <input className="w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={actionValue} onChange={(e)=> setActionValue(e.target.value)}/>
                      </div>
                  </div>
                  <div className="mt-5 w-full">
                      <label className="">Description</label>
                      <textarea className='w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700' value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                  </div>
              </div>
          </form>
      </Modal>


      {/* Modal Edit */}
      <Modal 
        open={isModalEditFraudOpen}
        centered
        onOk={isEditFraudOK}
        onCancel={isEditFraudCancel}
        closable={true}
        width={800}
        footer={[
          <Button key="cancel" onClick={isEditFraudCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" onClick={handleEdit}>
            Submit
          </Button>,
      ]}
      >
      <div className="text-center text-secondary font-bold text-xl font-poppins">
        <h1>Edit Fraud Reaction</h1>
      </div>
      <form className='font-poppins mt-8 font-medium' autoComplete='off'>
        <div className="text-md">
            <div className='flex gap-10 mt-5'>
                <div className="w-1/2">
                    <label className="">Zone</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='group' value={editFormData.zone} onChange={(e) => setEditFormData({ ...editFormData, zone: e.target.value })} id='group'>
                      <option value="0" selected className=''>Select Field</option>
                      <option value="grey">Grey</option>
                      <option value="black">Black</option>
                      <option value="white">White</option>
                    </select>
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
            <div className='flex gap-10 mt-5'>
                <div className="mt-1 w-1/2">
                    <label className="">Action</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" name='action' value={editFormData.action
                    } onChange={(e) => setEditFormData({ ...editFormData, action: e.target.value })} id='action'>
                      <option value="0" selected className=''>Select Field</option>
                      <option value="Create Alert">CREATE_ALERT</option>
                      <option value="Set Response Code">SET_RESPCODE</option>
                      <option value="SMS Notification">SMS_NOTIFICATION</option>
                      <option value="Email Notification">EMAIL_NOTIFICATION</option>
                      <option value="Put attribute to black list">Put attribute to black list</option>
                      <option value="Put attribute to list">Put attribute to list</option>
                      <option value="Put attribute to white list">Put attribute to white list</option>
                    </select>
                </div>
                <div className="mt-1 w-1/2">
                    <label className="">Action Value</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={editFormData.actionValue} onChange={(e) => setEditFormData({ ...editFormData, actionValue: e.target.value })}/>
                </div>
            </div>
            <div className="mt-5 w-full">
                <label className="">Description</label>
                <textarea className='w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700' value={editFormData.description} onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}></textarea>
            </div>
        </div>
      </form>
      </Modal>  

      {/* Modal Delete */}
      <Modal open={isModalDeleteFraudOpen} onOk={handleDelete} onCancel={isDeleteFraudCancel} closable={true} okText="OK">
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
      <main className=''>
      {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin tip="Loading" size="large">
              <div className="content-loading" />
            </Spin>
          </div>
        ): (
          <Table columns={columnsFraud} dataSource={dataFraud}  size="small" pagination={{
            position: ['bottomCenter'], defaultPageSize: 10,
          }} />
        )}
      </main>
        </div>
    </Layout>
  )
}

export default BlackListFraudReaction