import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export default function GetData(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleRead = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://${apiAddress}/transaction/list`);
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

export function GetDetailTransaction(utrnno, setLoading){
  const [dataDetail, setDataDetail] = useState([]);
  const handleDetail = async() => {
    try {
        const id = Number(utrnno);
        const res = await axios.get(`http://${apiAddress}/transaction/findByUtrnno/${id}`);
        console.log(res.data.responseData);
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

export function AssignFlag(){
  const handleAssignFlag = async(setLoading, setIsModalAssignOpen, dataNew, handleDetail) => {
    try {
      console.log(dataNew);
      const res = await axios.post(`http://${apiAddress}/transaction/assignFlag`, dataNew);
      setLoading(true);
      setIsModalAssignOpen(false);
      handleDetail();
      if(res.data.responseCode == 200){
          message.open({
              content: 'Assign Flag to Transaction Success',
              type:'success',
              duration: 3
          }); 
      }else if(res.data.responseCode == 500){
          console.log('err');
          message.open({
              content: res.data.responseMessage,
              type: 'error',
              duration: 3
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return handleAssignFlag
}