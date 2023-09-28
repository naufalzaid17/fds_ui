import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../../components/layout/Layout'),{ssr:true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{ssr:true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{ssr:true});
const Search = dynamic(() => import('../../components/search'),{csr:true});
const Filter = dynamic(() => import('../../components/filter'),{csr:true});
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const Tag = dynamic(() => import('antd').then((antd) => antd.Tag),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import { MoreOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import GetData from '@/services/TransactionMonitoringServices/Services';

const TransactionMonitoring = () => {
  const [detailItemId, setDetailItemId] = useState('');
  const {data, loading, handleRead} = GetData();
  useEffect(() => {
    handleRead();
  }, []);

  // Detail
  const router = useRouter();
  const showModalDetail = (record) => {
    setDetailItemId(record.utrnno);
    const utrnno = record.utrnno;
    router.push(`/Monitoring/TransactionDetail/${utrnno}`);
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
    getItem('Detail', 'detail'),
  ]),
];

const columns = [
  {
    title: 'Transaction Date',
    dataIndex: 'sysdate',
    key: 'sysdate',
  },
  {
    title: 'Transaction Type',
    dataIndex: 'transType',
    key: 'transType',
  },
  {
    title: 'Utrnno',
    dataIndex: 'utrnno',
    key: 'utrnno',
  },
  {
    title: 'HPAN',
    dataIndex: 'hpan',
    key: 'hpan',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Currency Code',
    dataIndex: 'currency',
    key: 'currency',
  },
  {
    title: 'Response Code',
    dataIndex: 'respCode',
    key: 'respCode',
  },
  {
    title: 'Reference Number',
    dataIndex: 'refNum',
    key: 'refNum',
  },
  {
    title: 'Fraud Flag',
    key: 'fraudFlags',
    dataIndex: 'fraudFlags',
    render: (fraudFlags) => (
      <>
        {fraudFlags === 'FRAUD' ? (
          <Tag color='red' text="Fraud" key={fraudFlags} className='text-red'>
            FRAUD
          </Tag>
        ) : fraudFlags === 'SUSPICIOUS' ? (
          <Tag color='yellow' text="Fraud" key={fraudFlags} className='text-yellow-600'>
            SUSPICIOUS
          </Tag>
        ) : (
          <Tag color='blue' text="Not Fraud" key={fraudFlags} className='text-blue'>
            NOT FRAUD
          </Tag>
        )}
    </>
    ),
  },
  {
    title: 'Alert Flag',
    key: 'alerted',
    dataIndex: 'alerted',
    render: (alerted) => (
      <>
      {alerted === false ? (
        <Tag color='red' text="Not Alerted" key={alerted} className='text-red'>
          NOT ALERTED
        </Tag>
      ) : (
        <Tag color='blue' text="Alerted" key={alerted}>
          ALERTED
        </Tag>
      )
      }
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
            {if (e.key === 'detail'){
              showModalDetail(record)
            }}}
            style={{
              border: 'none'
            }}
            defaultSelectedKeys={['detail']}
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
      <HeadTitle title="Transaction Monitoring"/>
      <HeadContent pageTitle="Transaction Monitoring" caption="Monitors 100% of transactions online in real time."/>
      <div className="flex flex-col gap-8 pt-6 w-full">
      <div className='flex justify-between'>
        <div className='flex flex-col md:flex-row'>
          <Search/>
          <span className='md:hidden'>
          </span>
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          <Filter/>
          <div className="mt-[21px] md:mt-0">
            <Filter/>
          </div>
        </div>
      </div>
      <main className='h-full'>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin tip="Loading" size="large">
              <div className="content-loading" />
            </Spin>
          </div>
        ): (
          <Table columns={columns} dataSource={data}  size="small" pagination={{
            position: ['bottomCenter'], defaultPageSize: 15,
          }} />
        )}
      </main>
      </div>
    </Layout>
  )
}

export default TransactionMonitoring