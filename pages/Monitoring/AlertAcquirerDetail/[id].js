import dynamic from "next/dynamic";
import React from "react";
const Layout = dynamic(() => import('../../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../../components/HeadTitle'),{csr:true});
const Spin = dynamic(() => import('antd').then((antd) => ({ default: antd.Spin })), { csr: true });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card } from "antd";
import { GetDetailAcquirer } from "@/services/AlertAcquirerServices/Services";


const gridStyle = {
  width: "50%",
  textAlign: "left",
  fontWeight: "bold",
};
const detail = {
  textAlign: "center",
  width: "50%",
};

const AlertAcquirerDetail = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const {dataDetail, handleDetail} = GetDetailAcquirer(id, setLoading);

  useEffect(() => {
    handleDetail();
  }, [id]);


  return (
    <Layout>
      <HeadTitle title="Alert Acquirer Detail" />
      <HeadContent pageTitle="Alert Acquirer Detail" caption="More details about aler acquirer detail" />
      <div className="flex flex-col gap-8 pt-6">
      <div className='flex justify-between'>
            <div className='flex flex-col md:flex-row'>
                <button type="button" onClick={() => router.back()} className='bg-secondary md:w-full w-36  hover:bg-opacity-90 text-white px-7 py-2 mt-5 rounded-lg font-medium border-[1px] border-secondary text-xs text-center'>
                    <FontAwesomeIcon icon={faReply}/>
                      &nbsp; Back
                </button>
            </div>
      </div>
      <div className="w-full">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin tip="Loading" size="large">
              <div className="content-loading" />
            </Spin>
          </div>
        ): (
          <Card
          title="Alert Acquirer Detail"
          headStyle={{
            backgroundColor: "#005752",
            color: "#FFFFFF",
            fontSize: "1.5em",
            fontWeight: "bold",
          }}
        >
          {Array.isArray(dataDetail) &&
            dataDetail.map((item) => (
              <React.Fragment key={item.id}>
                 <div className="flex">
                  <Card.Grid style={gridStyle}>ID</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.ID}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Classified Comment</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.CLASSIFIED_COMMENT}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>PRC_CODE</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.PRC_CODE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Last Update Date</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.LAST_UPDATE_DATE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Post Data Code</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.POST_DATA_CODE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>STAN</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.STAN}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Is Actioned</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.IS_ACTIONED}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Iss Instit Code</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.ISS_INSTIT_CODE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Is Forwarded</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.IS_FORWARDED}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Sysdate</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.sysdate}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>ACCT 2</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.acct2}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Classified Date</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.CLASSIFIED_DATE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>ACCT 1</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.ACCT1}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Currency</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.CURRENCY}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Time</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.TTIME}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Capt Date</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.CAPT_DATE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Terminal ID</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.TERMINAL_ID}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Acct Balance</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.ACCT_BALANCE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Classification Type</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.CLASSIFICATION_TYPE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Des Instit Code</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.DES_INSTIT_CODE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Forwarded To</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.FORWARDED_TO}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Fraud Flags</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.FRAUD_FLAGS}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Is Alerted</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.IS_ALERTED}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Case HPAN</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.case_hpan}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Locked By</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.LOCKED_BY}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>PID</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.PID}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Amount</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.AMOUNT}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>ACQ Instit Code</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.ACQ_INSTIT_CODE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Action Type</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.ACTION_TYPE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Ref Num</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.REF_NUM}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Action Date</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.ACTION_DATE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Case Comment</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.CASE_COMMENT}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Response Code</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.RESP_CODE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Fee Amount</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.FEE_AMOUNT}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Terminal Address</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.TERMINAL_ADDRESS}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Acquirer</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.ACQUIRER}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Is Classified</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.IS_CLASSIFIED}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Transaction Type</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.TRANS_TYPE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>HPAN</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.HPAN}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>UTRNNO</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.UTRNNO}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Is Locked</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.IS_LOCKED}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Merchant Type</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.MERCHANT_TYPE}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Rescponse Code Description</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.RESP_CODE_DESC}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Udate</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.udate}
                  </Card.Grid>
                </div>
                <div className="flex">
                  <Card.Grid style={gridStyle}>Case Utrnno</Card.Grid>
                  <Card.Grid hoverable={true} style={detail}>
                    {item.CASE_UTRNNO}
                  </Card.Grid>
                </div>
              </React.Fragment>
            ))}
        </Card>
        )}
      </div>
      </div>
    </Layout>
  );
};

export default AlertAcquirerDetail;
