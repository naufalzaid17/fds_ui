import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../../../components/layout/Layout'),{csr:true});
const Tabs = dynamic(() => import('antd').then((antd) => antd.Tabs),{csr: true})
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
const message= dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
import { Card } from 'antd';
import Image from "next/image";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
const HeadContent = dynamic(() => import('../../../components/HeadContent'),{csr:true});
const HeadTitle = dynamic(() => import('../../../components/HeadTitle'),{csr:true});
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faReply}  from '@fortawesome/free-solid-svg-icons';
import { GetDetailTransaction, AssignFlag } from '@/services/TransactionMonitoringServices/Services';

const TabPane = Tabs.TabPane;

const gridStyle = {
    width: '50%',
    height: '100%',
    textAlign: 'left',
    fontWeight: 'bold'
};
const detail = {
    textAlign: 'center',
    width: '50%'
}

const TransactionDetail = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [flag, setflag] = useState(false);
    const {utrnno} = router.query;
    const {dataDetail, handleDetail} = GetDetailTransaction(utrnno, setLoading)
    const handleAssignFlag = AssignFlag();

    useEffect(() => {
        handleDetail();
    }, [utrnno]);
    const [isModalAssignOpen, setIsModalAssignOpen] = useState(false);
    const showModalAssign = () => {
        setIsModalAssignOpen(true);
        console.log(utrnno);
    }
    const handleModalAssignCancel = () => {
        setIsModalAssignOpen(false);
    }

    const handleAssign = async(e) => {
        e.preventDefault();
        try {
            const fraudFlags = selectedKey;
            const dataNew = {
                utrnno,
                fraudFlags,
            };
            await handleAssignFlag(setLoading, setIsModalAssignOpen, dataNew, handleDetail)
        } catch (error) {
            console.log(error);
        }
    }
     
    const dataFlag = [
        {
            key: 'NOT_FRAUD',
            value: 'NOT_FRAUD',
            desc: 'NOT FRAUD'
        },
        {
            key: 'SUSPICIOUS',
            value: 'SUSPICIOUS',
            desc: 'SUSPICIOUS'
        },
        {
            key: 'FRAUD',
            value: 'FRAUD',
            desc: 'FRAUD'
        }
    ];
    
    const [selectedKey, setSelectedKey] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const handleCardClick = (key, item) => {
        setSelectedKey(key);
        setIsClicked(true);
        console.log(item);
    }
    return (
        <Layout>
            <HeadTitle title="Transaction Detail" />
            <HeadContent pageTitle="Transaction Detail" caption="More details about transaction" />
            <div className="flex flex-col gap-5">
                <div className='flex justify-between'>
                <div className='flex flex-col md:flex-row'>
                    <button type="button" onClick={() => router.back()} className='flex gap-2 bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white px-7 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
                        <FontAwesomeIcon icon={faReply}/>
                          Back
                    </button>
                </div>
                </div>
            <div className="h-full w-full font-poppins flex flex-col gap-5">
                <div className="w-full h-full bg-white rounded-md">
                    <Tabs className="w-full h-full">
                        <TabPane tab="Information" key="1" className="px-4 font-poppins">
                         <div className="flex h-full">
                             <div className="w-3/4 flex flex-col gap-5">
                                 <div className="flex gap-12 px-2 border-[1px] justify-between border-secondary rounded-md">
                                     <div className="flex flex-col gap-4">
                                            <span className="text-black text-opacity-50 text-[0.7rem]">
                                                 Card Number
                                            </span>
                                         <span className="font-semibold">
                                                 5161061835813510
                                            </span>
                                     </div>
                                     <div className="flex-col flex gap-4">
                                            <span className="text-black text-opacity-50 text-[0.7rem]">
                                                 Bank Name
                                             </span>
                                         <span className="font-semibold">
                                                 Bank BCA
                                             </span>
                                     </div>
                                     <div className="flex-col flex gap-4">
                                            <span className="text-black text-opacity-50 text-[0.7rem]">
                                                 Card Holder
                                             </span>
                                         <span className="font-semibold">
                                                 Reyna Jett
                                             </span>
                                     </div>
                                     <div className="flex-col flex gap-4">
                                            <span className="text-black text-opacity-50 text-[0.7rem]">
                                                 Expiration Date
                                             </span>
                                         <span className="font-semibold">
                                                 08/23
                                             </span>
                                     </div>

                                 </div>
                                 <div className="flex h-full">
                                     <div className="w-full mb-7">
                                         <Card
                                             title="Transaction Detail"
                                             headStyle={{
                                                 backgroundColor: '#005752',
                                                 color: '#FFFFFF',
                                                 fontSize: '1.5em',
                                                 fontWeight: 'bold',
                                                 height: '100%'
                                             }}
                                         >
                                            {Array.isArray(dataDetail) && dataDetail.map((item) => (
                                                <>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Fraud Flag</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.fraudFlags}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Transaction Date</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.sysdate}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Utrnno</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.utrnno}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Amount</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.amount}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Transaction Type</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.transType}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Currency</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.currency}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Reference Number</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.refNum}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Response Code</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.respCode}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Response Code Desc</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.respCodeDesc}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Stan</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.stan}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Merchant Type</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.merchantType}</Card.Grid>
                                                    </div>
                                                    <div className='flex'>
                                                        <Card.Grid style={gridStyle}>Terminal Id</Card.Grid>
                                                            <Card.Grid hoverable={true} style={detail}>{item.terminalId}</Card.Grid>
                                                    </div>
                                                </>
                                            ))}
                                         </Card>
                                     </div>


                                     <div className="w-2/5 h-full px-1">
                                         <div className="py-3 flex flex-col gap-1 rounded-md px-2 bg-secondary text-white">
                                             <span className='font-bold'>Actions</span>
                                             {/* <p className="text-[0.6rem]">Lorem aoasfasfkafasfkalf</p> */}
                                         </div>
                                         <button>
                                         <div className="px-5 py-4 hover:scale-125 hover:transition-transform hover:delay-100 hover:duration-300">
                                            <div className="flex gap-2">
                                                <Image src="/images/assign.jpg" alt="" width={35} height={35} />
                                                <div className="text-xs">
                                                    <span>White List Entity</span>
                                                    <p className="text-black text-opacity-50 text-[0.6rem]">Assign transaction to white list</p>
                                                </div>
                                            </div>
                                         </div>
                                         </button>
                                         <button>
                                         <div className="px-5 py-4 hover:scale-125 hover:transition-transform hover:delay-100 hover:duration-300">
                                            <div className="flex gap-2">
                                                <Image src="/images/assign.jpg" alt="" width={35} height={35} />
                                                <div className="text-xs">
                                                    <span>Black List Entity</span>
                                                    <p className="text-black text-opacity-50 text-[0.6rem]">Assign transaction to black list</p>
                                                </div>
                                            </div>
                                         </div>
                                         </button>
                                         <button>
                                         <div className="px-5 py-4 hover:scale-125 hover:transition-transform hover:delay-100 hover:duration-300">
                                            <div className="flex gap-2">
                                                <Image src="/images/assign.jpg" alt="" width={35} height={35} />
                                                <div className="text-xs">
                                                    <span>Fraud List Entity</span>
                                                    <p className="text-black text-opacity-50 text-[0.6rem]">Assign transaction to fraud list</p>
                                                </div>
                                            </div>
                                         </div>
                                         </button>
                                         <button onClick={showModalAssign}>
                                         <div className="px-5 py-4 hover:scale-125 hover:transition-transform hover:delay-100 hover:duration-300">
                                            <div className="flex gap-2">
                                                <Image src="/images/assign.jpg" alt="" width={35} height={35} />
                                                <div className="text-xs">
                                                    <span>Assign Flag</span>
                                                    <p className="text-black text-opacity-50 text-[0.6rem]">Assign flag to transaction</p>
                                                </div>
                                            </div>
                                         </div>
                                         </button>
                                     </div>
                                 </div>
                             </div>
                                 <div className="w-1/4 h-full px-2">
                                     <div className="bg-secondary flex flex-col gap-1 py-2 text-white rounded-md px-2 border-b-2 border-b-secondary">
                                         <span>History</span>
                                         <p className="text-[0.6rem] text-opacity-50">Lorem aoasfasfkafasfkalf</p>
                                     </div>
                                     <div className="bg-secondary p-2 mt-8 border-l-4 rounded-md border-fourd">

                                         <div className="rounded-xl bg-third">
                                             <div className="text-[1rem] flex flex-col rounded-xl px-1">
                                                 <div className="flex gap-2 text-[0.7rem] text-fourd">
                                                     <span>Admin</span>
                                                     <span>09/12/2004:21123</span>
                                                 </div>
                                                 <div className="flex flex-col text-[0.6rem] text-white">
                                                     <span className="">Clasify Alert </span>
                                                     <span className="">Alert has been clasify</span>
                                                 </div>
                                             </div>
                                         </div>
                                         <span className="text-white text-[0.75rem]">Clasify succes asedjasdlas</span>
                                     </div>
                                 </div>
                         </div>

                        </TabPane>
                        <TabPane tab="Additional Data" key="2">
                            <div className="flex h-full px-10 mt-3">
                                <div className="w-full mb-7">
                                    <Card
                                        title="Transaction Detail"
                                        headStyle={{
                                            backgroundColor: '#005752',
                                            color: '#FFFFFF',
                                            fontSize: '1.5em',
                                            fontWeight: 'bold',
                                            height: '100%'
                                        }}
                                    >
                                    {Array.isArray(dataDetail) && dataDetail.map((item) => (
                                        <>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Fraud Flag</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.fraudFlags}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Transaction Date</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.sysdate}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Utrnno</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.utrnno}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Amount</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.amount}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Transaction Type</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.transType}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Currency</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.currency}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Reference Number</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.refNum}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Response Code</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.respCode}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Response Code Desc</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.respCodeDesc}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Stan</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.stan}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Merchant Type</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.merchantType}</Card.Grid>
                                            </div>
                                            <div className='flex'>
                                                <Card.Grid style={gridStyle}>Terminal Id</Card.Grid>
                                                    <Card.Grid hoverable={true} style={detail}>{item.terminalId}</Card.Grid>
                                            </div>
                                        </>
                                    ))}
                                    </Card>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Rule Info" key="3">

                        </TabPane>
                    </Tabs>
                </div>
            </div>
            {/* MODAL ASSIGN FLAG */}
            <Modal open={isModalAssignOpen} onOk={handleAssign} onCancel={handleModalAssignCancel} closable={true} width={600} footer={[
                <Button key="cancel" onClick={handleModalAssignCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" htmlType="submit" onClick={handleAssign}>
                    Submit
                </Button>,
                ]}>
                <div className="text-center text-secondary font-bold text-lg font-poppins">
                    <h1>Assign Alert Flag</h1>
                </div>
                <form className='font-poppins mt-12 font-medium'>
                    <div className="text-sm">
                    <div className='flex gap-14 justify-center mb-8'>
                        {dataFlag.map((item) => (
                        <>
                            <div
                                className={`card-flag ${selectedKey === item.key  ? "active" : "inactive"}`}
                                onClick={() => [setflag(!selectedKey),handleCardClick(item.key, item)]}
                                id={item.key}
                            >
                                {item.key === 'NOT_FRAUD' ? (
                                <Image
                                    src="/images/smile.png"
                                    alt=""
                                    width={35}
                                    height={35}
                                />
                                ) : item.key === 'SUSPICIOUS' ? (
                                <Image
                                    src="/images/thinking.png"
                                    alt=""
                                    width={35}
                                    height={35}
                                />
                                ) : (
                                <Image
                                    src="/images/sad.png"
                                    alt=""
                                    width={35}
                                    height={35}
                                />
                                )}
                                <span className="font-poppins text-sm font-medium" id="1">
                                {item.desc}
                                </span>
                            </div>
                        </>
                        ))}
                    </div> 
                    </div>
                </form>
            </Modal>
            </div>
        </Layout>
    )
}


export default TransactionDetail