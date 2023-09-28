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
const Form = dynamic(() => import('antd').then((antd) => antd.Form),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Tag = dynamic(() => import('antd').then((antd) => antd.Tag),{csr: true})
const Spin = dynamic(() => import('antd').then((antd) => antd.Spin),{csr: true})
import { MoreOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faPlus}  from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import axios from 'axios';

const TableMonitoring = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [utrnno, setUtrnno] = useState('');
  const [pid, setPid] = useState('');
  const [acc1, setAcc1] = useState('');
  const [acc2, setAcc2] = useState('');
  const [acqInstitCode, setAcqInstitCode] = useState('');
  const [issInstitCode, setIssInstitCode] = useState('');
  const [desInstitCode, setDesInstitCode] = useState('');
  const [amount, setAmount] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [acctBalance, setAccountBalance] = useState('');
  const [currency, setCurrency] = useState('');
  const [hpan, setHpan] = useState('');
  const [transType, setTransType] = useState('');
  const [posDataCode, setPosDataCode] = useState('');
  const [prcCode, setPrcCode] = useState('');
  const [refNum, setRefNum] = useState('');
  const [respCode, setRespCode] = useState('');
  const [respCodeDesc, setRespCodeDesc] = useState('');
  const [stan, setStan] = useState('');
  const [merchantType, setMerchantType] = useState('');
  const [sysdate, setSysdate] = useState('');
  const [terminalId, setTerminalId] = useState('');
  const [terminalAddress, setTerminalAddress] = useState('');
  const [fraudFlags, setFraudFlags] = useState('');
  const [addtData, setAddtData] = useState('');
  const [ruleInfo, setRuleInfo] = useState('');
  const [alerted, setAlerted] = useState('');
  const [detailItemId, setDetailItemId] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("http://192.168.0.109:8181/transaction/list").then(
      res => {
        setLoading(false);
        setData(
          res.data.responseData.map(row => ({
            utrnno: row.utrnno,
            pid: row.pid,
            acc1: row.acc1,
            acc2: row.acc2,
            acqInstitCode: row.acqInstitCode,
            issInstitCode: row.issInstitCode,
            desInstitCode: row.desInstitCode,
            amount: row.amount,
            feeAmount: row.feeAmount,
            acctBalance: row.acctBalance,
            currency: row.currency,
            hpan: row.hpan,
            transType: row.transType,
            posDataCode: row.posDataCode,
            prcCode: row.prcCode,
            refNum: row.refNum,
            respCode: row.respCode,
            respCodeDesc: row.respCodeDesc,
            stan: row.stan,
            merchantType: row.merchantType,
            sysdate: row.sysdate,
            terminalId: row.terminalId,
            terminalAddress: row.terminalAddress,
            fraudFlags: row.fraudFlags,
            addtData: row.addtData,
            ruleInfo: row.ruleInfo,
            alerted: row.isAlerted,
          }))
        )
      }
    )
  };


  // Modal Detail
  const router = useRouter();
  const showModalDetail = (record) => {
    setDetailItemId(record.utrnno);
    const utrnno = record.utrnno;
    router.push(`/Monitoring/TransactionDetail/${utrnno}`);
  };
function getItem(icon, key, children, type) {
  return {
    icon,
    key,
    children,
    type
  }
};
  
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
    title: 'Transaction Date',
    dataIndex: 'sysdate',
    key: 'sysdate',
  },
  {
    title: 'Transaction Type',
    dataIndex: 'transType',
    key: 'transType',
  },
  {
    title: 'Utrnno',
    dataIndex: 'utrnno',
    key: 'utrnno',
  },
  {
    title: 'HPAN',
    dataIndex: 'hpan',
    key: 'hpan',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Currency Code',
    dataIndex: 'currency',
    key: 'currency',
  },
  {
    title: 'Response Code',
    dataIndex: 'respCode',
    key: 'respCode',
  },
  {
    title: 'Reference Number',
    dataIndex: 'refNum',
    key: 'refNum',
  },
  {
    title: 'Fraud Flag',
    key: 'fraudFlags',
    dataIndex: 'fraudFlags',
    render: (fraudFlags) => (
      <>
      {fraudFlags === 0 ? (
        <Tag color='red' text="Not Fraud" key={fraudFlags} className='text-red'>
          NOT FRAUD
        </Tag>
      ) : (
        <Tag color='blue' text="Fraud" key={fraudFlags}>
          FRAUD
        </Tag>
      )
      }
    </>
    ),
  },
  {
    title: 'Alert Flag',
    key: 'alerted',
    dataIndex: 'alerted',
    render: (alerted) => (
      <>
      {alerted === false ? (
        <Tag color='red' text="Not Alerted" key={alerted} className='text-red'>
          NOT ALERTED
        </Tag>
      ) : (
        <Tag color='blue' text="Alerted" key={alerted}>
          ALERTED
        </Tag>
      )
      }
    </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      return(
        <Space size="middle">
          <Menu
            onClick={(e) => 
            {if (e.key === 'detail'){
              showModalDetail(record)
            }}}
            style={{
              border: 'none'
            }}
            defaultSelectedKeys={['detail']}
            defaultOpenKeys={['']}
            mode='horizontal'
            items={items}
            triggerSubMenuAction='click'
          >
          </Menu>
        </Space>
      )
    }
  }
];
  return (
      <div className="w-full -mt-4">
      <main className='h-full'>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin tip="Loading" size="large">
              <div className="content-loading" />
            </Spin>
          </div>
        ): (
          <Table columns={columns} dataSource={data}  size="small" pagination={{
            position: ['bottomCenter'], defaultPageSize: 5,
          }} />
        )}
      </main>
      </div>
  )
}

export default TableMonitoring