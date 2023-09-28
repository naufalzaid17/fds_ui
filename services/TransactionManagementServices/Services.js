import axios from "axios";
import { useState } from "react";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetTransactionManagementData(){

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  

    const getData = async() => {
        await axios.get(`http://${apiAddress}/transaction/list`).then(
          res => {
            setLoading(false);
            setData(
              res.data.responseData.map(row => ({ 
                utrnno: row.utrnno,
                pid: row.pid,
                acct1: row.acct1,
                acct2: row.acct2,
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
                isAlerted: row.isAlerted,
                addtData: row.addtData,
                ruleInfo: row.ruleInfo
              }))
            )
          }
        )
      }

    return {getData, loading, data}
}