import axios from "axios";
import { useState } from "react";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetMessagingData(){
    const [data, SetData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async() => {
        await axios.get(`http://${apiAddress}/msg_configuration/list`).then(
          res => {
            setLoading(false);
            SetData(
              res.data.responseData.map(row => ({
                configId: row.configId,
                name: row.name,
                description: row.description,
                message: row.msgType.name,
                msgType:{
                  msgId: row.msgType.msgId,
                  name: row.msgType.name
                }
              }))
            )
          }
        )
      }

    return {getData, data, loading}
}

export function AddMessagingData(){

    const handleAddData = async (e) => {
        e.preventDefault();
        try {
          const dataNew = {
            name,
            description,
            msgType: {
              msgId: msgType,
            }
          };
          console.log(dataNew);
          const res = await axios.post(`http://${apiAddress}/msg_configuration/add`, dataNew);
          setName('');
          setDescription('');
          setMsgType('');
          setIsModalOpen(false);
          getData();
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

    return handleAddData
}

export function UpdateMessagingData(){

    const handleUpdateData = async (e) => {
        e.preventDefault();
        try {
          console.log(editFormData);
          const res = await axios.post(`http://${apiAddress}/msg_configuration/update`, editFormData );
          setUpdateItemId(null);
          getData();
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

    return handleUpdateData
}

export function DeleteMessagingData(){


    const handleDeleteData = async () => {
        try {
          setLoading(true);
          const res = await axios.delete(`http://${apiAddress}/msg_configuration/delete/${configId}`);
          console.log(res);
          setSelectedRowKeys([]);
          setDeleteConfigId(null);
          getData();  
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

    return handleDeleteData
}