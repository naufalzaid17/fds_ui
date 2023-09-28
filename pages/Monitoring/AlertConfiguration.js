import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr: true});
const Search = dynamic(() => import('../../components/search'),{csr: true})
const Filter = dynamic(() => import('../../components/filter'),{csr: true})

const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const DatePicker = dynamic(() => import('antd').then((antd) => antd.DatePicker),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const ConfigProvider = dynamic(() => import('antd').then((antd) => antd.ConfigProvider),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Tag = dynamic(() => import('antd').then((antd) => antd.Tag),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const Form = dynamic(() => import('antd').then((antd) => antd.Form),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Slider = dynamic(() => import('antd').then((antd) => antd.Slider),{csr: true})
const InputNumber = dynamic(() => import('antd').then((antd) => antd.InputNumber),{csr: true})
const Tabs = dynamic(() => import('antd').then((antd) => antd.Tabs),{csr: true})

import { MoreOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

const onChange = (key) => {
  console.log(key);
};
const TabPane = Tabs.TabPane;



const AlertDetails = () => {
  const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const [allocate, setallocate] = useState(false);
  const [reply, setreply] = useState(false);
  const [menu, setmenu] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [PRC_CODE, setPRC_CODE] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [value, setValue] = useState("");
  const [entityType, setEntityType] = useState("");
  const [idUserGroup, setIdUserGroup] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [detailItemId, setDetailItemId] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const showModalDetail = (record) => {
    setDetailItemId(record.id);
    const id = record.id;
    router.push(`/Monitoring/Alert/${id}`);
  }; 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`http://${apiAddress}/alert/acquirer/list`)
      .then((res) => {
        setLoading(false);
        setData(
          res.data.responseData.map((row) => ({
            classifiedComment: row.CLASSIFIED_COMMENT,
            prc_code: row.PRC_CODE,
            last_update_date: row.LAST_UPDATE_DATE,
            postDataCode: row.POST_DATA_CODE,
            stan: row.STAN,
            isActioned: row.IS_ACTIONED,
            issInstitCode: row.ISS_INSTIT_CODE,
            isForwarded: row.IS_FORWARDED,
            sysdate: row.sysdate,
            acct2: row.ACCT2,
            classifiedDate: row.CLASSIFIED_DATE,
            acct1: row.ACCT1,
            currency: row.CURRENCY,
            time: row.TTIME,
            captDate: row.CAPT_DATE,
            terminalId: row.TERMINAL_ID,
            acctBalance: row.ACCT_BALANCE,
            classificationType: row.CLASSIFICATION_TYPE,
            desInstitCode: row.DES_INSTIT_CODE,
            forwardedTo: row.FORWARDED_TO,
            fraudFlags: row.FRAUD_FLAGS,
            isAlerted: row.IS_ALERTED,
            caseHpan: row.case_hpan,
            lockedBy: row.LOCKED_BY,
            pid: row.PID,
            amount: row.AMOUNT,
            acqInstitCode: row.ACQ_INSTIT_CODE,
            actionType: row.ACTION_TYPE,
            refNum: row.REF_NUM,
            actionDate: row.ACTION_DATE,
            caseComment: row.CASE_COMMENT,
            respCode: row.RESP_CODE,
            feeAmount: row.FEE_AMOUNT,
            terminalAddress: row.TERMINAL_ADDRESS,
            acquirer: row.ACQUIRER,
            id: row.ID,
            isClassified: row.IS_CLASSIFIED,
            transType: row.TRANS_TYPE,
            hpan: row.HPAN,
            utrnno: row.UTRNNO,
            isLocked: row.IS_LOCKED,
            merchantType: row.MERCHANT_TYPE,
            respCodeDesc: row.RESP_CODE_DESC,
            udate: row.udate,
            caseUtrnno: row.CASE_UTRNNO,
          }))
        );
      });
  };

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
      [getItem("Edit", "edit"), 
      getItem("Delete", "delete"),
      getItem("Detail", "detail")]
    ),
  ];

  const columns = [
    {
      title: "PRC_CODE",
      dataIndex: "prc_code",
      key: "prc_code",
    },
    {
      title: "Last update",
      dataIndex: "last_update_date",
      key: "last_update_date",
    },
    {
      title: "Stan",
      dataIndex: "stan",
      key: "stan",
    },
    {
      title: "sysdate",
      dataIndex: "sysdate",
      key: "sysdate",
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
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Menu
              onClick={(e) => {
                if (e.key === "edit") {
                  showModalEdit(record);
                } else if (e.key === "delete") {
                  showModalDelete(record);
                } else if (e.key === "detail") {
                  // <WhiteListDetail showModalDetail={showModalDetail(record)}/>
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
      <div className="font-poppins bg-white h-full flex rounded-md">
        <div className="px-5 w-full h-full">
          <Tabs>
            <TabPane tab="Transaction Summary" key="1">
              <div className="">
                <div className="pt-5">
                  <Table
                    columns={columns}
                    dataSource={data}
                    size="small"
                    pagination={{
                      position: ["bottomCenter"],
                      defaultPageSize: 5,
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Investigation History" key="2" className="py-4">
              <div className="w-full h-full border-[1px] border-secondary p-6 rounded-md flex flex-col ">
                <div className="h-5/6 flex flex-col gap-4 overflow-auto">
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
                          <span className="">Alert has been clasify</span>
                        </div>
                        <span className="text-[0.75rem]">
                          Clasify succes asedjasdlas
                        </span>
                      </div>
                    </div>
                  </div>
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
                          <span className="">Alert has been clasify</span>
                        </div>
                        <span className="text-[0.75rem]">
                          Clasify succes asedjasdlas
                        </span>
                      </div>
                    </div>
                  </div>
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
                          <span className="">Alert has been clasify</span>
                        </div>
                        <span className="text-[0.75rem]">
                          Clasify succes asedjasdlas
                        </span>
                      </div>
                    </div>
                  </div>
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
                          <span className="">Alert has been clasify</span>
                        </div>
                        <span className="text-[0.75rem]">
                          Clasify succes asedjasdlas
                        </span>
                      </div>
                    </div>
                  </div>
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
                          <span className="">Alert has been clasify</span>
                        </div>
                        <span className="text-[0.75rem]">
                          Clasify succes asedjasdlas
                        </span>
                      </div>
                    </div>
                  </div>
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
                          <span className="">Alert has been clasify</span>
                        </div>
                        <span className="text-[0.75rem]">
                          Clasify succes asedjasdlas
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-1/6 flex items-center">
                  <div className="relative w-full">
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 -translate-y-1/2 pl-3 hover:cursor-pointer"
                      onClick={() => [setmenu(!menu), setallocate(false), setreply(false)]}
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
                      className="w-full bg-[#F2F2F2] py-3 rounded text-sm px-14"
                      placeholder="Comment..."
                      onClick={() => [setmenu(false), setallocate(false)]}
                    />
                      <div className={`reply ${reply ? "active" : "inactive"}`}>
                           tes
                      </div>
                  </div>
                  <div className={`chat ${menu ? "active" : "inactive"}`}>
                    <div
                      className="chat-menu"
                      onClick={() => [setmenu(!menu), setallocate(!allocate)]}
                    >
                      <Image
                        src="/images/bebek.jpg"
                        alt=""
                        width={25}
                        height={25}
                      />
                      <span>Allocate</span>
                    </div>
                    <div className="chat-menu">
                      <Image
                        src="/images/bebek.jpg"
                        alt=""
                        width={25}
                        height={25}
                      />
                      <span>Force</span>
                    </div>
                  </div>

                  <div className={`menu ${allocate ? "active" : "inactive"}`}>
                    <div className="flex justify-center font-medium">
                      <span className="font-poppins text-base">Allocate</span>
                    </div>

                    <div className="flex gap-10">
                      <div
                        className="rounded-md shadow-lg w-28 h-28 border-[1px] border-secondary flex items-center justify-center flex-col hover:scale-110 hover:transition hover:duration-300 gap-2"
                        onClick={() => [setmenu(false), setallocate(false), setreply(!reply)]}
                      >
                        <Image
                          src="/images/bebek.jpg"
                          alt=""
                          width={35}
                          height={35}
                        />
                        <span className="font-poppins text-sm font-medium text-secondary">
                          Positif
                        </span>
                      </div>
                      <div
                        className="rounded-md shadow-lg w-28 h-28 border-[1px] border-secondary flex items-center justify-center flex-col hover:scale-110 hover:transition hover:duration-300 gap-2"
                        onClick={() => [setmenu(false), setallocate(false),setreply(!reply)]}
                      >
                        <Image
                          src="/images/bebek.jpg"
                          alt=""
                          width={35}
                          height={35}
                        />
                        <span className="font-poppins text-sm font-medium text-secondary">
                          Suspicious
                        </span>
                      </div>
                      <div
                        className="rounded-md shadow-lg w-28 h-28 border-[1px] border-secondary flex items-center justify-center flex-col hover:scale-110 hover:transition hover:duration-300 gap-2"
                        onClick={() => [setmenu(false), setallocate(false), setreply(!reply)]}
                      >
                        <Image
                          src="/images/bebek.jpg"
                          alt=""
                          width={35}
                          height={35}
                        />
                        <span className="font-poppins text-sm font-medium text-secondary">
                          Negative
                        </span>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AlertDetails