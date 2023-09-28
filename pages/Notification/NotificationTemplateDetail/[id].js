import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../../components/HeadTitle'),{csr: true});
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import { Card } from "antd";
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faReply}  from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { DetailNotificationTemplate } from "@/services/NotificationTemplateServices/Services";

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

const NotificationTemplateDetail = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {id} = router.query;
  const {dataDetail, handleDetail} = DetailNotificationTemplate(id);

  useEffect(() => {
      if (id) {
        handleDetail();
      }
    }, [id]);

  return (
    <Layout>
        <HeadTitle title="Notification Template Detail"/>
        <HeadContent pageTitle="Notification Template Detail" caption="More details about notification template"/>
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
            title="Notification Template Detail"
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
                      <Card.Grid style={gridStyle}>Subject</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.subject}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Description</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.description}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Notification Type</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.notificationType.notificationType}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Template</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.template}</Card.Grid>
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

export default NotificationTemplateDetail