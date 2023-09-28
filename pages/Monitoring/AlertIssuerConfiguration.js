import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr:true});
const Search = dynamic(() => import('../../components/search'),{csr:true});
const Filter = dynamic(() => import('../../components/filter'),{csr:true});
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Tag = dynamic(() => import('antd').then((antd) => antd.Tag),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Tabs = dynamic(() => import('antd').then((antd) => antd.Tabs),{csr: true})
import { MoreOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from 'axios';
import { GetTransactionSummary, GetInvestigationHistory, ClassifyAlert } from '@/services/AlertAcquirerServices/Services';
const TabPane = Tabs.TabPane;


const AlertIssuerConfiguration = () => {
  const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const [force, setforce] = useState(false);
  const [allocate, setallocate] = useState(false);
  const [reply, setreply] = useState(false);
  const [menu, setmenu] = useState(false);
  const [data, setData] = useState([]);
  const [classType, setClassType] = useState('');
  const [classifiedComment, setClassificationComment] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();
  const { id, issuer, hpan } = router.query;
  const [selectedKeyForce, setSelectedKeyForce] = useState(null);
  const {dataTransaction, handleGetTransaction} = GetTransactionSummary(hpan);
  const {dataHistory, handleGetHistory} = GetInvestigationHistory(id);
  const handleClassifyAlert = ClassifyAlert();

  useEffect(() => {
    handleGetTransaction();
  }, []);

  useEffect(() => {
    handleGetHistory();
  }, []);

  const handleClassify = async(e) => {
    e.preventDefault();
    try {
      const classificationType = selectedKey;
      const formData = {
        id,
        issuer,
        classificationType,
        classifiedComment
      }
      console.log(formData);
      await handleClassifyAlert(formData, handleGetHistory, setforce, setallocate, setreply, setmenu, setClassificationComment);
      handleGetHistory();
    } catch (error) {
      console.log(error);
    }
  }

  const showModalDetail = (record) => {
    setDetailItemId(record.UTRNNO);
    const utrnno = record.UTRNNO;
    router.push(`/Monitoring/TransactionDetail/${utrnno}`);
  };

  const [selectedKey, setSelectedKey] = useState(null);
  const [desc, setDesc] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const handleCardClick = (key, item) => {
    setSelectedKey(key);
    setDesc(item.desc);
    setIsClicked(true);
    console.log(item);
  }
  const dataClassify = [
    {
        key: 1,
        value: 30,
        desc: 'POSITIVE'
    },
    {
        key: 2,
        value: 20,
        desc: 'SUSPICIOUS'
    },
    {
        key: 3,
        value: 10,
        desc: 'NEGATIVE'
    }
  ];

  function handleInputChange(e) {
    const inputValue = e.target.value;
    setClassificationComment(inputValue);
    setIsButtonDisabled(inputValue.trim() === '' || !isClicked);
  }

  const [isModalAlertCommentOpen, setIsModalAlertCommentOpen] = useState(false);
  const showModalAlertComment = () => {
    setIsModalAlertCommentOpen(true);
  }
  const modalAlertCommentCancel = () => {
    setIsModalAlertCommentOpen(false);
  }

  const [isModalAlertForwardOpen, setIsModalAlertForwardOpen] = useState(false);
  const showModalAlertForward = () => {
    setIsModalAlertForwardOpen(true);
  }
  const modalAlertForwardCancel = () => {
    setIsModalAlertForwardOpen(false);
  }

  const [isModalAlertListCardOpen, setIsModalAlertListCardOpen] = useState(false);
  const showModalAlertListCard = () => {
    setIsModalAlertListCardOpen(true);
  }
  const modalAlertListCardCancel = () => {
    setIsModalAlertListCardOpen(false);
  }

  const [isModalAlertListAccountOpen, setIsModalAlertListAccountOpen] = useState(false);
  const showModalAlertListAccount = () => {
    setIsModalAlertListAccountOpen(true);
  }
  const modalAlertListAccountCancel = () => {
    setIsModalAlertListAccountOpen(false);
  }

  const [isModalAlertListMerchantOpen, setIsModalAlertListMerchantOpen] = useState(false);
  const showModalAlertListMerchant = () => {
    setIsModalAlertListMerchantOpen(true);
  }
  const modalAlertListMerchantCancel = () => {
    setIsModalAlertListMerchantOpen(false);
  }

  const [isModalAlertListTerminalOpen, setIsModalAlertListTerminalOpen] = useState(false);
  const showModalAlertListTerminal = () => {
    setIsModalAlertListTerminalOpen(true);
  }
  const modalAlertListTerminalCancel = () => {
    setIsModalAlertListTerminalOpen(false);
  }

  const [isModalAlertRemoveCardOpen, setIsModalAlertRemoveCardOpen] = useState(false);
  const showModalAlertRemoveCard = () => {
    setIsModalAlertRemoveCardOpen(true);
  }
  const modalAlertRemoveCardCancel = () => {
    setIsModalAlertRemoveCardOpen(false);
  }

  const [isModalAlertRemoveAccountOpen, setIsModalAlertRemoveAccountOpen] = useState(false);
  const showModalAlertRemoveAccount = () => {
    setIsModalAlertRemoveAccountOpen(true);
  }
  const modalAlertRemoveAccountCancel = () => {
    setIsModalAlertRemoveAccountOpen(false);
  }

  const [isModalAlertRemoveMerchantOpen, setIsModalAlertRemoveMerchantOpen] = useState(false);
  const showModalAlertRemoveMerchant = () => {
    setIsModalAlertRemoveMerchantOpen(true);
  }
  const modalAlertRemoveMerchantCancel = () => {
    setIsModalAlertRemoveMerchantOpen(false);
  }

  const [isModalAlertRemoveTerminalOpen, setIsModalAlertRemoveTerminalOpen] = useState(false);
  const showModalAlertRemoveTerminal = () => {
    setIsModalAlertRemoveTerminalOpen(true);
  }
  const modalAlertRemoveTerminalCancel = () => {
    setIsModalAlertRemoveTerminalOpen(false);
  }

  const [isModalAlertPutCardInWhitelistOpen, setIsModalAlertPutCardInWhitelistOpen] = useState(false);
  const showModalAlertPutCardInWhitelist = () => {
    setIsModalAlertPutCardInWhitelistOpen(true);
  }
  const modalAlertPutCardInWhitelistCancel = () => {
    setIsModalAlertPutCardInWhitelistOpen(false);
  }

  const [isModalAlertPutAccountInWhitelistOpen, setIsModalAlertPutAccountInWhitelistOpen] = useState(false);
  const showModalAlertPutAccountInWhitelist = () => {
    setIsModalAlertPutAccountInWhitelistOpen(true);
  }
  const modalAlertPutAccountInWhitelistCancel = () => {
    setIsModalAlertPutAccountInWhitelistOpen(false);
  }

  const [isModalAlertPutMerchantInWhitelistOpen, setIsModalAlertPutMerchantInWhitelistOpen] = useState(false);
  const showModalAlertPutMerchantInWhitelist = () => {
    setIsModalAlertPutMerchantInWhitelistOpen(true);
  }
  const modalAlertPutMerchantInWhitelistCancel = () => {
    setIsModalAlertPutMerchantInWhitelistOpen(false);
  }

  const [isModalAlertPutTerminalInWhitelistOpen, setIsModalAlertPutTerminalInWhitelistOpen] = useState(false);
  const showModalAlertPutTerminalInWhitelist = () => {
    setIsModalAlertPutTerminalInWhitelistOpen(true);
  }
  const modalAlertPutTerminalInWhitelistCancel = () => {
    setIsModalAlertPutTerminalInWhitelistOpen(false);
  }

  const [isModalAlertPutCardInBlacklistOpen, setIsModalAlertPutCardInBlacklistOpen] = useState(false);
  const showModalAlertPutCardInBlacklist = () => {
    setIsModalAlertPutCardInBlacklistOpen(true);
  }
  const modalAlertPutCardInBlacklistCancel = () => {
    setIsModalAlertPutCardInBlacklistOpen(false);
  }

  const [isModalAlertPutAccountInBlacklistOpen, setIsModalAlertPutAccountInBlacklistOpen] = useState(false);
  const showModalAlertPutAccountInBlacklist = () => {
    setIsModalAlertPutAccountInBlacklistOpen(true);
  }
  const modalAlertPutAccountInBlacklistCancel = () => {
    setIsModalAlertPutAccountInBlacklistOpen(false);
  }

  const [isModalAlertPutMerchantInBlacklistOpen, setIsModalAlertPutMerchantInBlacklistOpen] = useState(false);
  const showModalAlertPutMerchantInBlacklist = () => {
    setIsModalAlertPutMerchantInBlacklistOpen(true);
  }
  const modalAlertPutMerchantInBlacklistCancel = () => {
    setIsModalAlertPutMerchantInBlacklistOpen(false);
  }

  const [isModalAlertPutTerminalInBlacklistOpen, setIsModalAlertPutTerminalInBlacklistOpen] = useState(false);
  const showModalAlertPutTerminalInBlacklist = () => {
    setIsModalAlertPutTerminalInBlacklistOpen(true);
  }
  const modalAlertPutTerminalInBlacklistCancel = () => {
    setIsModalAlertPutTerminalInBlacklistOpen(false);
  }

  const handleForceClick = (key, item) => {
    setSelectedKeyForce(key);
    console.log(key);
    if(key === 1){
      showModalAlertComment();
    }else if(key === 2){
      showModalAlertForward();
    }else if(key === 3){
      showModalAlertListCard();
    }else if(key === 4){
      showModalAlertListAccount();
    }else if(key === 5){
      showModalAlertListMerchant();
    }else if(key === 6){
      showModalAlertListTerminal();
    }else if(key === 7){
      showModalAlertRemoveCard();
    }else if(key === 8){
      showModalAlertRemoveAccount();
    }else if(key === 9){
      showModalAlertRemoveMerchant();
    }else if(key === 10){
      showModalAlertRemoveTerminal();
    }else if(key === 11){
      showModalAlertPutCardInWhitelist();
    }else if(key === 12){
      showModalAlertPutAccountInWhitelist();
    }else if(key === 13){
      showModalAlertPutMerchantInWhitelist();
    }else if(key === 14){
      showModalAlertPutTerminalInWhitelist();
    }else if(key === 15){
      showModalAlertPutCardInBlacklist();
    }else if(key === 16){
      showModalAlertPutAccountInBlacklist();
    }else if(key === 17){
      showModalAlertPutMerchantInBlacklist();
    }else if(key === 18){
      showModalAlertPutTerminalInBlacklist();
    }
    setDesc(item.desc);
    setIsClicked(true);
    console.log(item);
  }

  const dataForce =[
    {
      key: 1,
      desc: 'Add Alert Comment'
    },
    {
      key: 2,
      desc: 'Forward To'
    },
    {
      key: 3,
      desc: 'Add Card to List'
    },
    {
      key: 4,
      desc: 'Add Account to List'
    },
    {
      key: 5,
      desc: 'Add Merchant to List'
    },
    {
      key: 6,
      desc: 'Add Terminal to List'
    },
    {
      key: 7,
      desc: 'Remove Card From List'
    },
    {
      key: 8,
      desc: 'Remove Account From List'
    },
    {
      key: 9,
      desc: 'Remove Merchant From List'
    },
    {
      key: 10,
      desc: 'Remove Terminal From List'
    },
    {
      key: 11,
      desc: 'Put Card in Whitelist'
    },
    {
      key: 12,
      desc: 'Put Account in Whitelist'
    },
    {
      key: 13,
      desc: 'Put Merchant in Whitelist'
    },
    {
      key: 14,
      desc: 'Put Terminal in Whitelist'
    },
    {
      key: 15,
      desc: 'Put Card in Blacklist'
    },
    {
      key: 16,
      desc: 'Put Account in Blacklist'
    },
    {
      key: 17,
      desc: 'Put Merchant in Blacklist'
    },
    {
      key: 18,
      desc: 'Put Terminal in Blacklist'
    },

  ]

  function getItem(icon, key, children, type) {
    return {
      icon,
      key,
      children,
      type,
    };
  }

  const items = [
    {
      type: "divider",
    },
    getItem(
      <MoreOutlined
        style={{
          fontSize: "28px",
          border: "none",
        }}
      />,
      "sub1",
      [getItem("Detail", "detail")]
    ),
  ];

  const columns = [
    {
      title: "Transaction Date",
      dataIndex: "sysdate",
      key: "sysdate",
    },
    {
      title: "Last update",
      dataIndex: "last_update_date",
      key: "last_update_date",
    },
    {
      title: "HPAN",
      dataIndex: "hpan",
      key: "hpan",
    },
    {
      title: "Utrnno",
      dataIndex: "utrnno",
      key: "utrnno",
    },
    {
      title: "currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
        title: 'time',
        dataIndex: 'time',
        key: 'time'
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
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
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Menu
              onClick={(e) => {
                if (e.key === "detail") {
                  showModalDetail(record);
                }
              }}
              style={{
                border: "none",
              }}
              defaultSelectedKeys={["edit"]}
              defaultOpenKeys={[""]}
              mode="horizontal"
              items={items}
              triggerSubMenuAction="click"
            />
          </Space>
        );
      },
    },
  ];

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Layout>
    <HeadTitle title="Alert Issuer Configuration"/>
    <HeadContent pageTitle="Alert Issuer Configuration" caption="More details and actions for alert Issuer."/>
      <div className='flex justify-between mb-4'>
        <div className='flex flex-col md:flex-row'>
            <button type="button" onClick={() => router.back()} className='bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white px-7 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
                <FontAwesomeIcon icon={faReply}/>
                &nbsp; Back
            </button>
        </div>
      </div>
      <div className="font-poppins bg-white h-full flex rounded-md">
        <div className="px-5 w-full h-full">
          <Tabs>
            <TabPane tab="Transaction Summary" key="1">
              <div className="">
                <div className="pt-5">
                  <Table
                    columns={columns}
                    dataSource={dataTransaction}
                    size="small"
                    pagination={{
                      position: ["bottomCenter"],
                      defaultPageSize: 10,
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Investigation History" key="2" className="py-4">
              <div className="w-full h-full border-[1px] border-secondary p-6 rounded-md flex flex-col ">
                <div className="h-[30rem] flex flex-col gap-4 overflow-y-auto">
                  {Array.isArray(dataHistory) && dataHistory.map((item) => (
                    <>
                      <div className="p-2 border-l-4 rounded-md border-fourd w-fit pr-8">
                        <div className="rounded-xl">
                          <div className="text-[1rem] flex flex-col rounded-xl px-1">
                            <div className="flex items-center gap-2 text-fourd font-poppins ">
                              <span className="text-[0.9rem] font-semibold">
                                Admin
                              </span>
                              <span className="text-[0.6rem]">
                                09/12/2004:21123
                              </span>
                            </div>
                            <div className="flex flex-col text-[0.6rem]">
                              <span className="">Clasify Alert </span>
                              <span className="">Alert has been clasify Succesfully</span>
                            </div>
                            <span className="text-[0.75rem]">
                              {item.CLASSIFICATION_TYPE === 10 ? (
                                <>
                                  {item.info}
                                </>
                              ) : item.CLASSIFICATION_TYPE === 20 ? (
                                <>
                                  {item.info}
                                </>
                              ) : (
                                <>
                                  {item.info}
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <form>
                    <div className="w-full h-full pt-8 flex items-center">
                        <div className="relative w-full">
                            <svg
                            width="35"
                            height="35"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-1/2 -translate-y-1/2 pl-3 hover:cursor-pointer"
                            onClick={() => [setmenu(!menu), setallocate(false), setreply(false), setforce(false)]}
                            >
                            <g clipPath="url(#clip0_182_4921)">
                                <path
                                d="M12 21.0708C16.9706 21.0708 21 17.0414 21 12.0708C21 7.10024 16.9706 3.0708 12 3.0708C7.02944 3.0708 3 7.10024 3 12.0708C3 17.0414 7.02944 21.0708 12 21.0708Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                />
                                <path
                                d="M9 12.0708H15"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                />
                                <path
                                d="M12 9.0708V15.0708"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_182_4921">
                                <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                    transform="translate(0 0.0708008)"
                                />
                                </clipPath>
                            </defs>
                            </svg>
                            <input
                              type="text"
                              className="w-full bg-[#F2F2F2] py-3 rounded text-sm px-12"
                              placeholder="Comment..."
                              value={classifiedComment}
                              onChange={handleInputChange}
                              onClick={() => [setmenu(false), setallocate(false), setforce(false)]}
                            />
                            <div className={`reply ${reply ? "active" : "inactive"}`}>
                                <h3>Classify Alert</h3>
                                <p>With classification type: {selectedKey} - {desc}</p>
                            </div>
                        </div>
                        <button className="bg-primary text-white px-5 py-3 rounded" onClick={handleClassify} disabled={isButtonDisabled}>Send</button>
                        <div className={`menu ${allocate ? "active" : "inactive"}`}>
                            <div className="flex justify-center font-medium">
                            <span className="font-poppins text-base">Allocate</span>
                            </div>
                            <div className="flex gap-10">
                                {dataClassify.map((item) => (
                                    <>
                                        <div
                                            className="rounded-md shadow-lg w-28 h-28 border-[1px] border-secondary flex items-center justify-center flex-col hover:scale-110 hover:transition hover:duration-300 gap-2 cursor-pointer"
                                            onClick={() => [setmenu(false), setallocate(false), setreply(!reply), handleCardClick(item.value, item), setforce(false)]} id={item.key} 
                                        >
                                          {item.key === 1 ? (
                                            <Image
                                              src="/images/smile.png"
                                              alt=""
                                              width={35}
                                              height={35}
                                            />
                                          ) : item.key === 2 ? (
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
                                            <span className="font-poppins text-sm font-medium text-secondary" id="1">
                                            {item.desc}
                                            </span>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                        <div className={`chat ${menu ? "active" : "inactive"}`}>
                            <div
                            className="chat-menu cursor-pointer"
                            onClick={() => [setmenu(!menu), setallocate(!allocate)]}
                            >
                              <Image
                                  src="/images/alert.jpg"
                                  alt=""
                                  width={25}
                                  height={25}
                              />
                              <span>Allocate</span>
                            </div>
                            <div className="chat-menu cursor-pointer" onClick={() => [setmenu(!menu), setforce(!force)]}>
                              <Image
                                  src="/images/alert.jpg"
                                  alt=""
                                  width={25}
                                  height={25}
                              />
                              <span>Force</span>
                            </div>
                        </div>  
                          <div className={`takeforce ${force ? "active" : "inactive"}`}>
                            <div className="flex justify-center font-medium">
                            <span className="font-poppins text-base">Force</span>
                            </div>
                            <div className="grid grid-cols-3 gap-10">
                                {dataForce.map((item) => (
                                    <>
                                        <div
                                            className="rounded-md shadow-lg w-36 h-28 border-[1px] border-secondary flex items-center justify-center flex-col hover:scale-110 hover:transition hover:duration-300 gap-2 cursor-pointer"
                                            onClick={() => [setmenu(false), setallocate(false), handleForceClick(item.key, item), setforce(false)]} id={item.key} 
                                        >
                                            <Image
                                              src="/images/rules.jpg"
                                              alt=""
                                              width={35}
                                              height={35}
                                            />
                                            <span className="font-poppins text-sm text-center font-medium text-secondary" id="1">
                                            {item.desc}
                                            </span>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
            {/* MODAL ALERT COMMENT */}
            <Modal
        open={isModalAlertCommentOpen}
        // onOk={rejectRule}
        onCancel={modalAlertCommentCancel}
        closable
        okText="OK"
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Add Alert Comment</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT FORWARD */}
      <Modal
        open={isModalAlertForwardOpen}
        // onOk={rejectRule}a
        onCancel={modalAlertForwardCancel}
        closable
        okText="OK"
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Forward Alert</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
                <div className="mt-4">
                    <label className="">Username</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700">
                      <option value='0'>Select Username</option>
                      <option value='1'>Berliana</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT ADD CARD TO LIST */}
      <Modal
        open={isModalAlertListCardOpen}
        // onOk={rejectRule}
        onCancel={modalAlertListCardCancel}
        closable
        okText="OK"
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Add Card to List</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
                <div className="mt-4">
                    <label className="">List</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700">
                      <option value='0'>Select List</option>
                      <option value='1'>TestList</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT ADD ACCOUNT TO LIST */}
      <Modal
        open={isModalAlertListAccountOpen}
        // onOk={rejectRule}
        onCancel={modalAlertListAccountCancel}
        closable
        okText="OK"
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Add Account to List</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
                <div className="mt-4">
                    <label className="">List</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700">
                      <option value='0'>Select List</option>
                      <option value='1'>TestList</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT ADD MERCHANT TO  LIST*/}
      <Modal
        open={isModalAlertListMerchantOpen}
        // onOk={rejectRule}
        onCancel={modalAlertListMerchantCancel}
        closable
        okText="OK"
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Add Merchant to List</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
                <div className="mt-4">
                    <label className="">List</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700">
                      <option value='0'>Select List</option>
                      <option value='1'>TestList</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT ADD TERMINAL TO  LIST*/}
      <Modal
        open={isModalAlertListTerminalOpen}
        // onOk={rejectRule}
        onCancel={modalAlertListTerminalCancel}
        closable
        okText="OK"
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Add Terminal to List</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
                <div className="mt-4">
                    <label className="">List</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700">
                      <option value='0'>Select List</option>
                      <option value='1'>TestList</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT REMOVE CARD FROM  LIST*/}
      <Modal
        open={isModalAlertRemoveCardOpen}
        // onOk={rejectRule}
        onCancel={modalAlertRemoveCardCancel}
        closable
        okText="OK"
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Remove Card from List</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
                <div className="mt-4">
                    <label className="">List</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700">
                      <option value='0'>Select List</option>
                      <option value='1'>TestList</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT REMOVE ACCOUNT FROM  LIST*/}
      <Modal
        open={isModalAlertRemoveAccountOpen}
        // onOk={rejectRule}
        onCancel={modalAlertRemoveAccountCancel}
        closable
        okText="OK"
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Remove Account from List</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
                <div className="mt-4">
                    <label className="">List</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700">
                      <option value='0'>Select List</option>
                      <option value='1'>TestList</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT REMOVE MERCHANT FROM  LIST*/}
      <Modal
        open={isModalAlertRemoveMerchantOpen}
        // onOk={rejectRule}
        onCancel={modalAlertRemoveMerchantCancel}
        closable
        okText="OK"
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Remove Merchant from List</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
                <div className="mt-4">
                    <label className="">List</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700">
                      <option value='0'>Select List</option>
                      <option value='1'>TestList</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT REMOVE TERMINAL FROM  LIST*/}
      <Modal
        open={isModalAlertRemoveTerminalOpen}
        // onOk={rejectRule}
        onCancel={modalAlertRemoveTerminalCancel}
        closable
        okText="OK"
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Remove Terminal from List</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
                <div className="mt-4">
                    <label className="">List</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700">
                      <option value='0'>Select List</option>
                      <option value='1'>TestList</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT PUT CARD IN WHITELIST*/}
      <Modal
        open={isModalAlertPutCardInWhitelistOpen}
        // onOk={rejectRule}
        onCancel={modalAlertPutCardInWhitelistCancel}
        closable
        okText="OK"
        width={700}
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Put Card in Whitelist</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Entity Type</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value='hpan' readOnly/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Date In</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Date Out</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Reason</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">User Group</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly>
                        <option value='it_group'>IT GROUP</option>
                    </select>
                </div>
              </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT PUT ACCOUNT IN WHITELIST*/}
      <Modal
        open={isModalAlertPutAccountInWhitelistOpen}
        // onOk={rejectRule}
        onCancel={modalAlertPutAccountInWhitelistCancel}
        closable
        okText="OK"
        width={700}
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Put Account in Whitelist</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Entity Type</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value='hpan' readOnly/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Date In</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Date Out</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Reason</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">User Group</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly>
                        <option value='it_group'>IT GROUP</option>
                    </select>
                </div>
              </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT PUT MERCHANT IN WHITELIST*/}
      <Modal
        open={isModalAlertPutMerchantInWhitelistOpen}
        // onOk={rejectRule}
        onCancel={modalAlertPutMerchantInWhitelistCancel}
        closable
        okText="OK"
        width={700}
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Put Merchant in Whitelist</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Entity Type</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value='hpan' readOnly/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Date In</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Date Out</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Reason</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">User Group</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly>
                        <option value='it_group'>IT GROUP</option>
                    </select>
                </div>
              </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT PUT TERMINAL IN WHITELIST*/}
      <Modal
        open={isModalAlertPutTerminalInWhitelistOpen}
        // onOk={rejectRule}
        onCancel={modalAlertPutTerminalInWhitelistCancel}
        closable
        okText="OK"
        width={700}
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Put Terminal in Whitelist</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Entity Type</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value='hpan' readOnly/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Date In</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Date Out</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Reason</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">User Group</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly>
                        <option value='it_group'>IT GROUP</option>
                    </select>
                </div>
              </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT PUT CARD IN BLACKLIST*/}
      <Modal
        open={isModalAlertPutCardInBlacklistOpen}
        // onOk={rejectRule}
        onCancel={modalAlertPutCardInBlacklistCancel}
        closable
        okText="OK"
        width={700}
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Put Card in Blacklist</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Entity Type</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value='hpan' readOnly/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Date In</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Date Out</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Reason</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">User Group</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly>
                        <option value='it_group'>IT GROUP</option>
                    </select>
                </div>
              </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT PUT ACCOUNT IN BLACKLIST*/}
      <Modal
        open={isModalAlertPutAccountInBlacklistOpen}
        // onOk={rejectRule}
        onCancel={modalAlertPutAccountInBlacklistCancel}
        closable
        okText="OK"
        width={700}
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Put Account in Blacklist</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Entity Type</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value='hpan' readOnly/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Date In</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Date Out</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Reason</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">User Group</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly>
                        <option value='it_group'>IT GROUP</option>
                    </select>
                </div>
              </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT PUT MERCHANT IN BLACKLIST*/}
      <Modal
        open={isModalAlertPutMerchantInBlacklistOpen}
        // onOk={rejectRule}
        onCancel={modalAlertPutMerchantInBlacklistCancel}
        closable
        okText="OK"
        width={700}
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Put Merchant in Blacklist</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Entity Type</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value='hpan' readOnly/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Date In</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Date Out</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Reason</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">User Group</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly>
                        <option value='it_group'>IT GROUP</option>
                    </select>
                </div>
              </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
      {/* MODAL ALERT PUT TERMINAL IN BLACKLIST*/}
      <Modal
        open={isModalAlertPutTerminalInBlacklistOpen}
        // onOk={rejectRule}
        onCancel={modalAlertPutTerminalInBlacklistCancel}
        closable
        okText="OK"
        width={700}
      >
        <div className="text-center text-secondary font-bold text-lg font-poppins">
          <h1>Put Terminal in Blacklist</h1>
        </div>
        <form className='font-poppins mt-5 font-medium'>
            <div className="text-sm">
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Values</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value={hpan} readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Entity Type</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" value='hpan' readOnly/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Date In</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">Date Out</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" type="date"/>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-4 w-1/2">
                    <label className="">Reason</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly/>
                </div>
                <div className="mt-4 w-1/2">
                    <label className="">User Group</label>
                    <select className="minimal w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700" readOnly>
                        <option value='it_group'>IT GROUP</option>
                    </select>
                </div>
              </div>
                <div className="mt-4">
                    <label className="">Comment</label>
                    <input className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded-lg py-2 px-2 focus:outline-green-700"/>
                </div>
            </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default AlertIssuerConfiguration