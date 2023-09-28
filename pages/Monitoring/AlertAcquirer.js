import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr:true});
const Search = dynamic(() => import('../../components/search'),{csr:true});
const Filter = dynamic(() => import('../../components/filter'),{csr:true});
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Tag = dynamic(() => import('antd').then((antd) => antd.Tag),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import { MoreOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { GetData, LockCase, UnlockCase } from '@/services/AlertAcquirerServices/Services';

const AlertAcquirer = () => {
  const [isModalLockCaseOpen, setIsModalLockCaseOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const {data, loading, handleRead} = GetData();
  const {handleLockCase} = LockCase(handleRead, setIsModalLockCaseOpen);
  const { handleUnlockCase } = UnlockCase(handleRead, setIsModalLockCaseOpen);
  useEffect(() => {
    handleRead();
  }, []);

// DETAIL
const router = useRouter();
const showModalDetail = (record) => {
  const id = record.ID;
  router.push(`/Monitoring/AlertAcquirerDetail/${id}`);
};

//  CONFIGURATION
const showModalConfiguration = (record) => {
  console.log(record);
  const id = record.ID;
  const acquirer = record.ACQUIRER;
  const terminalId = record.TERMINAL_ID;
  router.push(`/Monitoring/AlertAcquirerConfiguration?id=${id}&acquirer=${acquirer}&terminalId=${terminalId}`);
};


// LOCK CASE
const showModalLockedCase = (record) => {
  setSelectedRecord(record);
  setIsModalLockCaseOpen(true);
};
const handleLockCaseClick = () => {
  if (selectedRecord && selectedRecord.ID) {
    handleLockCase(selectedRecord.ID);
  }
};

const handleModalLockCaseCancel = () => {
  setIsModalLockCaseOpen(false);
};

// UNLOCK CASE
const showModalUnlockedCase = (record) => {
  setSelectedRecord(record);
  setIsModalLockCaseOpen(true);
};
const handleUnlockCaseClick = () => {
  console.log(selectedRecord);
  if (selectedRecord && selectedRecord.ID) {
    handleUnlockCase(selectedRecord.ID);
  }
};


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
    getItem('Alert Configuration', 'configuration'),
    getItem('Detail', 'detail')
  ]),
];

const columns = [
  {
    title: 'Type',
    dataIndex: 'TRANS_TYPE',
    key: 'TRANS_TYPE',
  },
  {
    title: 'Utrnno',
    dataIndex: 'UTRNNO',
    key: 'UTRNNO',
  },
  {
    title: 'Hpan',
    dataIndex: 'HPAN',
    key: 'HPAN',
  },
  {
    title: 'Acquirer',
    dataIndex: 'ACQUIRER',
    key: 'ACQUIRER',
  },
  {
    title: 'Reference Number',
    dataIndex: 'REF_NUM',
    key: 'REF_NUM',
  },
  {
    title: 'Amount',
    dataIndex: 'AMOUNT',
    key: 'AMOUNT',
  },
  {
    title: 'Date',
    dataIndex: 'sysdate',
    key: 'sysdate',
  },
  {
    title: 'Response Code',
    key: 'respCode',
    dataIndex: 'respCode',
    render: (respCode) => (
      <>
      {respCode === '00' ? (
        <Tag color='blue' text="Non Locked" key={respCode} className='text-red'>
          APPROVE
        </Tag>
      ) : (
        <Tag color='red' text="Locked" key={respCode}>
          REJECT
        </Tag>
      )
      }
    </>
    ),
  },
  {
    title: 'Alert Flag',
    key: 'isAlerted',
    dataIndex: 'isAlerted',
    render: (isAlerted) => (
      <>
      {isAlerted === true ? (
        <Tag color='blue' text="Non Locked" key={isAlerted} className='text-red'>
          TRUE
        </Tag>
      ) : (
        <Tag color='red' text="Locked" key={isAlerted}>
          FALSE
        </Tag>
      )
      }
    </>
    ),
  },
  {
    title: 'Locked',
    key: 'IS_LOCKED',
    dataIndex: 'IS_LOCKED',
    render: (IS_LOCKED, record) => (
      <>
        {IS_LOCKED === 1 ? (
          <button onClick={() => showModalLockedCase(record)}> 
            <Tag color='blue' text="Non Locked" key={IS_LOCKED} className='text-red'>
              TRUE
            </Tag>
          </button>
        ) : (
          <button onClick={() => showModalUnlockedCase(record)}>
            <Tag color='red' text="Locked" key={IS_LOCKED}>
              FALSE
            </Tag>
          </button>
        )}
      </>
    ),
  },
  {
    title: 'Classified',
    key: 'IS_CLASSIFIED',
    dataIndex: 'IS_CLASSIFIED',
    render: (IS_CLASSIFIED, record) => (
      <>
        {IS_CLASSIFIED === 0 ? (
            <Tag color='blue' text="Non Locked" key={IS_CLASSIFIED} className='text-red'>
              TRUE
            </Tag>
        ) : (
            <Tag color='red' text="Locked" key={IS_CLASSIFIED}>
              FALSE
            </Tag>
        )}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      return(
        <Space size="middle">
          <Menu
            onClick={(e) => 
            {if (e.key === 'configuration'){
              showModalConfiguration(record)
            }else if(e.key === 'detail'){
              showModalDetail(record)
            }}}
            style={{
              border: 'none'
            }}
            defaultSelectedKeys={['edit']}
            defaultOpenKeys={['']}
            mode='horizontal'
            items={items}
            triggerSubMenuAction='click'
          >
          </Menu>
        </Space>
      )
    }
  }
];


return (
  <Layout>
    <HeadTitle title="Alert Acquirer"/>
    <HeadContent pageTitle="Alert Acquirer" caption="Responsible for checking transactions from the bank’s terminals."/>
    <div className="flex flex-col gap-8 pt-6">
    <div className='flex justify-between'>
      <div className='flex flex-col md:flex-row'>
        <Search/>
      </div>
      <div className='flex flex-col md:flex-row gap-5'>
        <Filter/>
        <div className="mt-[21px] md:mt-0">
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
          <Table columns={columns} dataSource={data}  size="small" pagination={{
            position: ['bottomCenter'], defaultPageSize: 10,
          }} />
        )}
    </main>
    {/* MODAL LOCKED & UNLOCKED CASE */}
    {selectedRecord && (
    <>
      {selectedRecord.IS_LOCKED === 0 ? (
        <Modal
          open={isModalLockCaseOpen}
          onOk={handleLockCaseClick}
          onCancel={handleModalLockCaseCancel}
          closable
          okText="OK"
        >
          <div className="text-center text-secondary font-bold text-lg font-poppins">
            <h1>Lock Case</h1>
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
          open={isModalLockCaseOpen}
          onOk={handleUnlockCaseClick}
          onCancel={handleModalLockCaseCancel}
          closable
          okText="OK"
        >
          <div className="text-center text-secondary font-bold text-lg font-poppins">
            <h1>UnLock Case</h1>
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


export default AlertAcquirer;