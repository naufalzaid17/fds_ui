import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../../components/HeadTitle'),{csr: true});
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import { Card } from "antd";
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faReply}  from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { parseISO, format } from 'date-fns'
import { DetailBlackList } from "@/services/BlackListServices/Services";

const gridStyle = {
    width: '50%',
    textAlign: 'left',
    fontWeight: 'bold',
};
const detail = {
    textAlign: 'center',
    width: '50%'
}

const BlackListDetail = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {id} = router.query;
    const {handleDetailBlackList, dataDetail} = DetailBlackList(id);

    useEffect(() => {
      handleDetailBlackList();
    }, []);

    return (
      <Layout>
          <HeadTitle title="Black List Detail"/>
          <HeadContent pageTitle="Black List Detail" caption="More details about Black List."/>
          <div className="flex flex-col gap-8 pt-6">
              <div className='flex justify-between'>
                  <div className='flex flex-col'>
                  <span className=''>
                      <button type="button" onClick={() => router.back()} className='flex gap-2 bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white px-7 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
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
            title="Black List Detail"
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
                      <Card.Grid style={gridStyle}>Entity Type</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.entityType}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Value</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.value}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Date In</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{format(parseISO(item.dateIn), "dd MMMM yyyy")}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Date Out</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{format(parseISO(item.dateIn), "dd MMMM yyyy")}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>userGroup</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.userGroup.groupName}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Initiator Name</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.initiator.name}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Initiator Email</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.initiator.email}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Reason</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.reason}</Card.Grid>
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

export default BlackListDetail