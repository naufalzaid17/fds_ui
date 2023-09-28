import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../../components/HeadTitle'),{csr: true});
const Card = dynamic(() => import('antd').then((antd) => antd.Card),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faReply}  from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState, useEffect } from 'react'

const gridStyle = {
    width: '50%',
    textAlign: 'left',
    fontWeight: 'bold',
    border: 'none'
};
const detail = {
    textAlign: 'center',
    width: '50%'
}

const ScenarioStudioDetail = () => {
  const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const [loading, setLoading] = useState(true);
  const [dataDetail, setDataDetail] = useState(null);
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
      if (id) {
        getDetail();
      }
    }, [id]);

  const getDetail = async() => {
      try {
        const res = await axios.get(`http://${apiAddress}/rule/findRuleByRuleId?ruleId=${id}`);
      //   console.log(res.data.responseData);
        const item = res.data.responseData;
      //   console.log(item);
        const dataDetail = Array.isArray(item) ? item : [item];
        setDataDetail(dataDetail);
      //   setData(dataDetail);
      //   console.log(dataDetail);
        setLoading(false);
      //   console.log(data);
      //   return res.data.responseData
      } catch (error) {
        console.error(error);
      }
     }
  

  return (
    <Layout>
        <HeadTitle title="Scenario Studio Detail"/>
        <HeadContent pageTitle="Scenario Studio Detail" caption="More details about rule"/>
        <div className="flex flex-col gap-8 pt-6">
        <div className='flex justify-between'>
          <div className='flex flex-col'>
          <span className=''>
              <button type="button" onClick={() => router.back()} className='bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white px-7 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
                  <FontAwesomeIcon icon={faReply}/>
                    Back
              </button>
          </span>
          </div>
        </div>
        <div className=''>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin tip="Loading" size="large">
              <div className="content-loading" />
            </Spin>
          </div>
        ): (
            <Card 
            title="Scenario Studio Detail"
            headStyle={{
                backgroundColor: '#005752',
                color: '#FFFFFF',
                fontSize: '1.5em',
                fontWeight: 'bold'
            }}
            
            >

              {Array.isArray(dataDetail) && dataDetail.map((item) => (
              <React.Fragment key={item.id}>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Rule Name</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.ruleName}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Description</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.description}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Risk Value</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.riskValue}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Date From</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.dateFrom}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Date To</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.dateTo}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Priority</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.priority}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Type</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.type}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Author</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.author}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Status</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.status}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>State</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.state}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Rule Group</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.ruleGroup.groupName}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Formula</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.sformula}</Card.Grid>
                  </div>
              </React.Fragment>
              ))}
            </Card>
        )}
        </div>
        </div>
    </Layout>
  )
}

export default ScenarioStudioDetail