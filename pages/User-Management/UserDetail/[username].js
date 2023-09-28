import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr: true});
const Card = dynamic(() => import('antd').then((antd) => antd.Card),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faReply}  from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { parseISO, format } from 'date-fns'

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

const UserDetail = () => {
    const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const [loading, setLoading] = useState(true);
  const [dataDetail, setDataDetail] = useState(null);
  const router = useRouter();
  const {username} = router.query;

  useEffect(() => {
    console.log(username);
      if (username) {
        getDetail();
      }
    }, [username]);

  const getDetail = async() => {
      try {
        console.log('a');
        const res = await axios.get(`http://${apiAddress}/user/find/${username}`);
        const item = res.data.responseData;
        const dataDetail = Array.isArray(item) ? item : [item];
        setDataDetail(dataDetail);
        setLoading(false);
        console.log(dataDetail);
      } catch (error) {
        console.error(error);
      }
     }
  

  return (
    <Layout>
        <HeadTitle title="User Detail"/>
        <HeadContent pageTitle="User Detail" caption="More details about User"/>
        <div className="flex flex-col gap-8">
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
            <Card 
            title="User Detail"
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
                      <Card.Grid style={gridStyle}>Name</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.name}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Email</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.email}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>User Id</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.userId}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Username</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.username}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Institution</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.institution.name}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Status</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.isActive}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Is Not Locked</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.isNotLocked}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Join Date</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{format(parseISO(item.joinDate), "dd MMMM yyyy")}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Last Login Date</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.lastLoginDate}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Role</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.role.name}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>Type</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.type.typeName}</Card.Grid>
                  </div>
                  <div className='flex'>
                      <Card.Grid style={gridStyle}>User Group</Card.Grid>
                          <Card.Grid hoverable={true} style={detail}>{item.userGroup.groupName}</Card.Grid>
                  </div>
              </React.Fragment>
              ))}
            </Card>
        </div>
        </div>
    </Layout>
  )
}

export default UserDetail