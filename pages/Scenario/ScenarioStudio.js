import dynamic from 'next/dynamic'
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
const Tag = dynamic(() => import('antd').then((antd) => antd.Tag),{csr: true})
import { MoreOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faPlus}  from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from 'axios'
import ScenarioStudioDetail from './ScenarioStudioDetail/[id]'
import { formatISO } from 'date-fns'

const ScenarioStudio = () => {
const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const router = useRouter();
  const addRule = () => {
    router.push('/Scenario/ScenarioBuilder');
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailItemId, setDetailItemId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [comment, setComment] = useState(null);

  // Modal Detail
  const showModalDetail = (record) => {
    console.log(record);
    setLoading(false);
    setDetailItemId(record.ruleId)
    const ruleId = record.ruleId;
    router.push(`/Scenario/ScenarioStudioDetail/${ruleId}`);
  };

  const showModalEdit = (record) => {
    
  }

  // Modal Delete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const showModalDelete = (record) => {
    // console.log(record.ruleId);
      setIsModalDeleteOpen(true);
      setDeleteItemId(record.ruleId);
      // console.log(deleteItemId);
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
    const res = await axios.get(`http://${apiAddress}/rule/list`)
    .then(
      res => {
        // console.log(res.data.responseData);
        setLoading(false);
        setData(
          res.data.responseData.map(row => ({
            ruleId: row.ruleId,
            ruleName: row.ruleName,
            isActive: row.isActive,
            dateFrom: formatISO(new Date(row.dateFrom), {representation: 'date'}),
            dateTo: formatISO(new Date(row.dateTo), {representation: 'date'}),
            status: row.status,
          }))
        )
      }
    );
  };

  const handleDeleteData = async () => {
    try {
      console.log(deleteItemId);
      setLoading(true);
      const res = await axios.delete(`http://${apiAddress}/rule/delete/${deleteItemId}`);
      console.log(res);
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
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
  }

  // ACTIVE 
const [isModalActiveOpen, setIsModalActiveOpen] = useState(false);
const showModalActive = (record) => {
  setSelectedRecord(record);
  setIsModalActiveOpen(true);
};

const handleModalActiveCancel = () => {
  setIsModalActiveOpen(false);
};

const showModalNonActive = (record) => {
  setSelectedRecord(record);
  setIsModalActiveOpen(true);
};
const activeRule = async () => {
  try{
    console.log(selectedRecord);
    const ruleId = selectedRecord.ruleId;
    const initiator = 'Berlin';

    const res = await axios.post(`http://${apiAddress}/rule/activation?ruleId=${ruleId}&initiator=${initiator}&comment=${comment}`);
    setComment('');
    setIsModalActiveOpen(false);
    getData();
    if(res.data.responseCode == 200){
      message.open({
          content: 'Request activation rule success',
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
const nonActiveRule = async () => {
  try{
    console.log(selectedRecord);
    const ruleId = selectedRecord.ruleId;
    const initiator = 'Berlin';
    const res = await axios.post(`http://${apiAddress}/rule/deactivation?ruleId=${ruleId}&initiator=${initiator}&comment=${comment}`);
    setComment('');
    setIsModalActiveOpen(false);
    getData();
    if(res.data.responseCode == 200){
      message.open({
          content: 'Request activation rule success',
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


const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
const showModalAccept = (record) => {
  setSelectedRecord(record);
  setIsModalApproveOpen(true);
}
const handleModalApproveCancel = () => {
  setIsModalApproveOpen(false);
}

const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
const showModalReject = (record) => {
  setSelectedRecord(record);
  setIsModalRejectOpen(true);
}
const handleModalRejectCancel = () => {
  setIsModalApproveOpen(false);
}
const approveRule = async() =>{
  try{
    console.log(selectedRecord);
    const ruleId = selectedRecord.ruleId;
    const initiator = 'Berlin';

    const res = await axios.post(`http://${apiAddress}/rule/approval?ruleId=${ruleId}&initiator=${initiator}&comment=${comment}`);
    setComment('');
    setIsModalApproveOpen(false);
    getData();
    if(res.data.responseCode == 200){
      message.open({
          content: 'Approve rule success',
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
const rejectRule = async() => {
  try{
    console.log(selectedRecord);
    const ruleId = selectedRecord.ruleId;
    const initiator = 'Berlin';

    const res = await axios.post(`http://${apiAddress}/rule/rejection?ruleId=${ruleId}&initiator=${initiator}&comment=${comment}`);
    setComment('');
    setIsModalRejectOpen(false);
    getData();
    if(res.data.responseCode == 200){
      message.open({
          content: 'Rejection rule success',
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

  // table
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
      getItem('Approve Rule', 'accept'),
      getItem('Reject Rule', 'reject')
    ]),
  ];
  const columns = [
    {
      title: 'Rule Name',
      dataIndex: 'ruleName',
      key: 'ruleName',
    },
    {
      title: 'Date From',
      dataIndex: 'dateFrom',
      key: 'dateFrom',
    },
    {
      title: 'Date To',
      dataIndex: 'dateTo',
      key: 'dateTo',
    },
    {
      title: 'Active',
      key: 'isActive',
      dataIndex: 'isActive',
      render: (isActive, record) => (
        <>
          {isActive === true ? (
            <button onClick={() => showModalActive(record)}> 
              <Tag color='blue' text="Non Locked" key={isActive} className='text-red'>
                TRUE
              </Tag>
            </button>
          ) : (
            <button onClick={() => showModalNonActive(record)}>
              <Tag color='red' text="Locked" key={isActive}>
                FALSE
              </Tag>
            </button>
          )}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
                console.log(record);
                <ScenarioStudioDetail id={record.id}/>
                showModalDetail(record)
              }else if(e.key === 'accept'){
                showModalAccept(record);
              }else if(e.key === 'reject'){
                showModalReject(record)
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
        <HeadTitle title="Scenario Studio"/>
        <HeadContent pageTitle="Scenario Studio" caption="List of rules that combines several checks to implement a specific business requirement for transaction assessment."/>
      <div className="flex flex-col gap-8 pt-6">
        <div className='flex justify-between'>
          <div className='flex flex-col md:flex-row'>
            <Search/>
            <span className='md:hidden'>
            <button onClick={addRule} className='bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
            <FontAwesomeIcon icon={faPlus}/>
                  Add New Record
            </button>
            </span>
          </div> 
          <div className='flex flex-col md:flex-row md:gap-5'>
            <span className='hidden md:block'>
              <div className='mt-5 md:mt-0'>
                <button onClick={addRule} className='bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
                <FontAwesomeIcon icon={faPlus}/>
                      Add New Record
                </button>
          </div>
            </span>
              <Filter/>
            <div className='mt-[21px] md:mt-0'>
               <Filter/>
            </div>
          </div> 
        </div>
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
          {/* MODAL LOCKED & UNLOCKED CASE */}
          {selectedRecord && (
          <>
            {selectedRecord.isActive === false ? (
              <Modal
                open={isModalActiveOpen}
                onOk={activeRule}
                onCancel={handleModalActiveCancel}
                closable
                okText="OK"
              >
                <div className="text-center text-secondary font-bold text-lg font-poppins">
                  <h1>Active Rule</h1>
                </div>
                <form className='font-poppins mt-5 font-medium'>
                    <div className="text-sm">
                        <div className="mt-4">
                            <label className="">Comment</label>
                            <input className=" w-full border-secondary border-[1px]  mt-[11px] md:mt-2 rounded py-2 px-2 focus:outline-green-600" value={comment} onChange={(e)=> setComment(e.target.value)}/>
                        </div>
                    </div>
                </form>
              </Modal>
            ) : (
              <Modal
                open={isModalActiveOpen}
                onOk={nonActiveRule}
                onCancel={handleModalActiveCancel}
                closable
                okText="OK"
              >
                <div className="text-center text-secondary font-bold text-lg font-poppins">
                  <h1>Deactive Rule</h1>
                </div>
                <form className='font-poppins mt-5 font-medium'>
                    <div className="text-sm">
                        <div className="mt-4">
                            <label className="">Comment</label>
                            <input className=" w-full border-secondary border-[1px]  mt-[11px] md:mt-2 rounded py-2 focus:outline-green-600" value={comment} onChange={(e)=> setComment(e.target.value)}/>
                        </div>
                    </div>
                </form>
              </Modal>
            )}
          </>
          )}
          {/* MODAL APPROVE */}
            <Modal
              open={isModalApproveOpen}
              onOk={approveRule}
              onCancel={handleModalApproveCancel}
              closable
              okText="OK"
            >
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Approve Rule</h1>
              </div>
              <form className='font-poppins mt-5 font-medium'>
                  <div className="text-sm">
                      <div className="mt-4">
                          <label className="">Comment</label>
                          <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={comment} onChange={(e)=> setComment(e.target.value)}/>
                      </div>
                  </div>
              </form>
            </Modal>
            {/* MODAL REJECT */}
            <Modal
              open={isModalRejectOpen}
              onOk={rejectRule}
              onCancel={handleModalRejectCancel}
              closable
              okText="OK"
            >
              <div className="text-center text-secondary font-bold text-lg font-poppins">
                <h1>Reject Rule</h1>
              </div>
              <form className='font-poppins mt-5 font-medium'>
                  <div className="text-sm">
                      <div className="mt-4">
                          <label className="">Comment</label>
                          <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={comment} onChange={(e)=> setComment(e.target.value)}/>
                      </div>
                  </div>
              </form>
            </Modal>
        </div>
    </Layout>
    )
}

export default ScenarioStudio