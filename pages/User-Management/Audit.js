import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr: true});
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Tag = dynamic(() => import('antd').then((antd) => antd.Tag),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import React, {useEffect, useState} from 'react'
import Search from '@/components/search'
import Filter from '@/components/filter'
import axios from 'axios'

const Audit = () => {
  const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async() => {
    await axios.get(`http://${apiAddress}/user/audit/list`).then(
        res => {
          console.log(res.data.responseData);
          setLoading(false);
          setData(
              res.data.responseData.map(row => ({
                id: row.auditId,
                // username: row.user.username,
                captureDate: row.captureDate,
                remoteAddress: row.remoteAddress,
                hostAddress: row.host,
                method: row.method,
                status: row.status,
                userAgent: row.userAgent,
              }))
          )
        }
    )
  }

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Capture Date',
      dataIndex: 'captureDate',
      key: 'captureDate',
    },
    {
      title: 'Remote Address',
      dataIndex: 'remoteAddress',
      key: 'remoteAddress',
    },
    {
      title: 'Host Address',
      dataIndex: 'hostAddress',
      key: 'hostAddress',
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Agent',
      dataIndex: 'userAgent',
      key: 'userAgent',
    },
  ];
  return (
    <Layout>
      <HeadTitle title="Audit"/>
      <HeadContent pageTitle="Audit" caption="Captured data from the host based on the IP address"/>
        <div className="flex flex-col gap-8 pt-6">
      <div className='flex justify-between'>
          <div className='flex flex-col md:flex-row'>
            <Search/>
            <span className='md:hidden'>
            </span>
          </div>
          <div className='flex flex-col md:flex-row md:gap-5'>
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
          <Table columns={columns} dataSource={data}  size="small" pagination={{
            position: ['bottomCenter'], defaultPageSize: 10,
          }} />
        )}
        </main>
        </div>
    </Layout>
  )
}

export default Audit