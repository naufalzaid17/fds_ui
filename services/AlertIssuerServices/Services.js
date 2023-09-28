import { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { message } from "antd";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetData(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleRead = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://${apiAddress}/alert/issuer/list`);
          console.log(response.data.responseData);
          setData(response.data.responseData);
          console.log('Read Response:', data);
          setLoading(false);
        } catch (error) {
          console.error('Read Error:', error);
          setLoading(false);
        }
    };
    return { data, loading, handleRead };
}

export function LockCase(handleRead, setIsModalLockCaseOpen) {
  const [loading, setLoading] = useState(false);
  const handleLockCase = async (id) => {
    try {
      console.log(id);
      const dataNew = {
        id,
        lockedBy: 'Berliana'
      };
      console.log(dataNew);
      const res = await axios.post(`http://${apiAddress}/alert/issuer/lockCase`, dataNew);
      setLoading(false);
      setIsModalLockCaseOpen(false);
      handleRead();
      if (res.data.responseCode === 200) {
        message.success({
          content: 'Locked Case Successfully',
          type: 'success',
          duration: 3
        });
      } else {
        message.error({
          content: res.data.responseMessage,
          type: 'error',
          duration: 3
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleLockCase };
}

export function UnlockCase(handleRead, setIsModalLockCaseOpen) {
  const [loading, setLoading] = useState(false);
  const handleUnlockCase = async (id) => {
    try {
      console.log(id);
      const dataNew = {
        id,
        lockedBy: 'Berliana'
      };
      console.log(dataNew);
      const res = await axios.post(`http://${apiAddress}/alert/issuer/unlockCase`, dataNew);
      setLoading(false);
      setIsModalLockCaseOpen(false);
      handleRead();
      if (res.data.responseCode === 200) {
        message.success({
          content: 'Unlocked Case Successfully',
          type: 'success',
          duration: 3
        });
      } else {
        message.error({
          content: res.data.responseMessage,
          type: 'error',
          duration: 3
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleUnlockCase };
}

export function GetTransactionSummary(hpan){
  // console.log(hpan);
  const [dataTransaction, setDataTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleGetTransaction = async() =>{
    setLoading(true);
    try {
      const response = await axios.get(`http://${apiAddress}/alert/issuer/findByCard/${hpan}`);
      setDataTransaction(response.data.responseData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return {dataTransaction, handleGetTransaction}
}

export function GetInvestigationHistory(id){
  console.log(id);
  const [dataHistory, setDataHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleGetHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://${apiAddress}/caseHistory/find/${id}`);
      console.log(response.data.responseData);
      setDataHistory(response.data.responseData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return {dataHistory, handleGetHistory};
}

export function ClassifyAlert() {
  const handleClassyfiyAlert = async (formData, handleGetHistory, setforce, setallocate, setreply, setmenu, setClassificationComment) => {
    try {
      const res = await axios.post(`http://${apiAddress}/alert/issuer/classify`, formData);
      setClassificationComment('');
      setmenu(false);
      setallocate(false);
      setreply(false);
      setforce(false);

      handleGetHistory();

      if (res.data.responseCode === 200) {
        message.open({
          content: 'Classify Alert Success',
          type: 'success',
          duration: 3,
        });
      } else if (res.data.responseCode === 500) {
        message.open({
          content: res.data.responseMessage,
          type: 'error',
          duration: 3,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return handleClassyfiyAlert;
}

export function GetDetailIssuer(id, setLoading){
  const [dataDetail, setDataDetail] = useState([]);
  const handleDetail = async() => {
    try {
      const res = await axios.get(
        `http://${apiAddress}/alert/issuer/find/${id}`
      );
      const item = res.data.responseData;
      const dataDetail = Array.isArray(item) ? item : [item];
      setDataDetail(dataDetail);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  return{dataDetail, handleDetail}
}