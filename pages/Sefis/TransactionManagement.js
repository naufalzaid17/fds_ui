import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr: true});
const Search = dynamic(() => import('../../components/search'),{csr: true})
const Filter = dynamic(() => import('../../components/filter'),{csr: true})
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const DatePicker = dynamic(() => import('antd').then((antd) => antd.DatePicker),{csr: true})
const Space = dynamic(() => import('antd').then((antd) => antd.Space),{csr: true})
const Table = dynamic(() => import('antd').then((antd) => antd.Table),{csr: true})
const Menu = dynamic(() => import('antd').then((antd) => antd.Menu),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import { MoreOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { GetTransactionManagementData } from "@/services/TransactionManagementServices/Services";

const TransactionManagement = () => {
  const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const [id, setDeleteItemId] = useState("");
  const [attrId, setAttrId] = useState("");
  const [attribute, setAttribute] = useState("");
  const [fieldTag, setFieldTag] = useState("");
  const [addtData, setAddtData] = useState("");
  const [description, setDescription] = useState("");
  const [configId, setConfigId] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); 
  const [updateItemId, setUpdateItemId] = useState(null);
  const [detailItemId, setDetailItemId] = useState(null);
  const router = useRouter();
  const { getData, loading, data} = GetTransactionManagementData();

  const showModalDetail = (record) => {
    setDetailItemId(record.utrnno);
    const utrnno = record.utrnno;
    router.push(`/Monitoring/TransactionDetail/${utrnno}`);
  };
  useEffect(() => {
    getData();
  }, []);



  function getItem(icon, key, children, type){
    return{
      icon, 
      key,
      children,
      type
    }
  }

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
      getItem('Detail', 'detail')
      ]),
  ];

  const columns = [
    {
      title: "utrnno",
      dataIndex: "utrnno",
      key: "utrnno",
    },
    {
      title: "Sysdate",
      dataIndex: "sysdate",
      key: "sysdate",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Response Code Description",
      dataIndex: "respCodeDesc",
      key: "respCodeDesc",
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

  return (
    <Layout>
      <HeadTitle title="Transaction Management" />
      <HeadContent
        pageTitle="Transaction Management"
        caption="A list of transaction management"
      />
      <div className="flex flex-col gap-8 pt-6">
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row">
          <Search />
        </div>
        <div className="flex flex-col md:flex-row mr-5">
          <span className="hidden md:block">
          </span>
          <Filter />
          <div className="mt-[21px] md:mt-0">
            <Filter />
          </div>
        </div>
      </div>
      <main className="">
      {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin tip="Loading" size="large">
              <div className="content-loading" />
            </Spin>
          </div>
        ): (
          <Table
          columns={columns}
          dataSource={data}
          size="small"
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: 10,
          }}
        />
        )}
      </main>
      </div>
    </Layout>
  );
};

export default TransactionManagement;