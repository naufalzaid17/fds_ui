import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { formatISO } from "date-fns";


const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetData(){
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRead = async() => {
        const res = await axios.get(`http://${apiAddress}/msg_configuration/list`).then(
            res => {
              setLoading(false);
              setListData(
                res.data.responseData.map(row => ({
                  configId: row.configId,
                  name: row.name,
                  description: row.description,
                  message: row.msgType.name,
                  msgType:{
                    msgId: row.msgType.msgId,
                    name: row.msgType.name
                  },
                  hasHeader: row.hasHeader
                }))
              )
            }
        )
    };
    return {listData, handleRead}
}

export function AddDictionaries(){
    const handleAdd = async(dataNew, setName, setDescription, setMsgType, setIsModalOpen, handleRead) => {
        console.log(dataNew);
        try {
            const res = await axios.post(`http://${apiAddress}/msg_configuration/add`, dataNew);
            setName('');
            setDescription('');
            setMsgType('');
            setIsModalOpen(false);
            handleRead();
            if(res.data.responseCode == 200){
              message.open({
                  content: 'Data Added Successfully',
                  type:'success',
                  duration: 3
              });
          }else{
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
    return handleAdd
}

export function EditDictionaries(){
    const handleEdit = async(editFormData, setUpdateItemId, handleRead, setLoading, isEditCancel) => {
        try {
            const res = await axios.post(`http://${apiAddress}/msg_configuration/update`, editFormData );
            setUpdateItemId(null);
            handleRead();
            setLoading(false);
            isEditCancel();
            if(res.data.responseCode == 200){
              message.open({
                  content: 'Data Updated Successfully',
                  type:'success',
                  duration: 3
              });
            }else{
                message.open({
                    content: res.data.responseMessage,
                    type: 'error',
                    duration: 3
                });
            }
          } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return handleEdit
}

export function DeleteDictionaries(){
    const handleDelete = async(configId, setDeleteConfigId, handleRead, setLoading, isDeleteCancel) => {
        try {
            setLoading(true);
            const res = await axios.delete(`http://${apiAddress}/msg_configuration/delete/${configId}`);
            setDeleteConfigId(null);
            handleRead();  
            setLoading(false);
            isDeleteCancel();
            if(res.data.responseCode == 200){
              message.open({
                  content: 'Data Deleted Successfully',
                  type:'success',
                  duration: 3
              });
            }else{
                message.open({
                    content: res.data.responseMessage,
                    type: 'error',
                    duration: 3
                });
            }
          } catch (error) {
              console.error(error);
              setLoading(false);
        }
    }
    return handleDelete
}
