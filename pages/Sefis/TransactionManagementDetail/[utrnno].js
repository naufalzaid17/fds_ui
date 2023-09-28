import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr: true});
const Card = dynamic(() => import('antd').then((antd) => antd.Card),{csr: true})
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
};
const detail = {
    textAlign: 'center',
    width: '50%'
}

const TransactionManagementDetail = () => {
    const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
    const [loading, setLoading] = useState(true);
    const [dataDetail, setDataDetail] = useState(null);
    const router = useRouter();
    const {utrnno} = router.query;

    useEffect(() => {
        if (utrnno) {
          getDetail();
        }
      }, [utrnno]);

    const getDetail = async() => {
        try {
        const id = Number(utrnno);
          const res = await axios.get(`http://${apiAddress}/transaction/findByUtrnno/${utrnno}`);
          console.log(res.data.responseData);
          const item = res.data.responseData;
        //   console.log(item);
          const dataDetail = Array.isArray(item) ? item : [item];
          setDataDetail(dataDetail);
          console.log(dataDetail[0]['entitytype']);
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
          <HeadTitle title="Transaction Management Detail"/>
          <HeadContent pageTitle="Transaction Management Detail" caption="More details about transaction management"/>
          <div className='flex justify-between mt-5'>
              <div className='flex flex-col md:flex-row'>
                  <span className='md:hidden'>
  
                  </span>
              </div>
              <div className='flex flex-col md:flex-row mr-20'>
                  <span className=''>
                      <button type="button" onClick={() => router.back()} className='bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white  md:px-7 py-2 ml-10 mt-5 rounded-lg font-medium border-[1px] border-secondary text-lg text-center'>
                          <FontAwesomeIcon icon={faReply}/>
                            Back
                      </button>
                  </span>
              </div>
          </div>
          <div className='px-10 mt-8'>
              <Card 
              title="Transaction Management Detail"
              headStyle={{
                  backgroundColor: '#005752',
                  color: '#FFFFFF',
                  fontSize: '1.5em',
                  fontWeight: 'bold'
              }}
              
              >

                {Array.isArray(dataDetail) && dataDetail.map((item) => (
                <React.Fragment key={item.utrnno}>
                    <div className='flex'> 
                        <Card.Grid style={gridStyle}>Utrnno</Card.Grid>
                            <Card.Grid hoverable={true} style={detail}>{item.utrnno}</Card.Grid>
                    </div>
                    <div className='flex'>
                        <Card.Grid style={gridStyle}>PID</Card.Grid>
                            <Card.Grid hoverable={true} style={detail}>{item.pid}</Card.Grid>
                    </div>
                    <div className='flex'>
                        <Card.Grid style={gridStyle}>Date In</Card.Grid>
                            <Card.Grid hoverable={true} style={detail}>{item.dateIn}</Card.Grid>
                    </div>
                    <div className='flex'>
                        <Card.Grid style={gridStyle}>Date Out</Card.Grid>
                            <Card.Grid hoverable={true} style={detail}>{item.dateOut}</Card.Grid>
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
          </div>
      </Layout>
    )
}

export default TransactionManagementDetail