import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetData(){
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleRead = async() => {
        const res = await axios.get(`http://${apiAddress}/recipientGroup/list`).then(
            res => {
              setLoading(false);
              setListData(
                res.data.responseData.map(row => ({
                  groupId: row.groupId,
                  notificationType:{
                    id: row.notificationType.id,
                    notificationType: row.notificationType.notificationType
                  },
                  type: row.notificationType.notificationType,
                  groupName: row.groupName
                }))
              )
            }
        )
    }
    return {listData, handleRead}
}

export function GetNotificationType(){
    const [dataNotification, setDataNotification] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleNotificationType = async() => {
      await axios.get(`http://${apiAddress}/notificationType/list`).then(
        res => {
          setLoading(false);
          setDataNotification(
            res.data.responseData.map(row => ({
              id: row.id,
              notificationType: row.notificationType
            }))
          )
        }
      )
    }
    return {dataNotification, handleNotificationType}
}

export function AddContactGroup(){
    const handleAdd = async(dataNew, setNotificationType, setGroupName, setIsModalOpen, handleRead) => {
        try{
            const res = await axios.post(`http://${apiAddress}/recipientGroup/addRecipientGroup`, dataNew);
            setNotificationType('');
            setGroupName('');
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
        }catch(error){
            console.error(error);
        }
    }
    return handleAdd
}

export function EditContactGroup(){
    const handleEdit = async(editFormData, updateItemId, setUpdateItemId, handleRead, setLoading, isEditCancel) => {
        try {
            console.log(editFormData);
            const res = await axios.post(`http://${apiAddress}/recipientGroup/updateRecipientGroup?currentId=${updateItemId}`, editFormData, {
              params:{
                currentId: updateItemId
              }
            });
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
            console.error(error);
        }
    }
    return handleEdit
}

export function DeleteContactGroup(){
    const handleDelete = async(deleteItemId, setDeleteItemId, handleRead, setLoading, isDeleteCancel) => {
        try {
            setLoading(true);
            const res = await axios.delete(`http://${apiAddress}/recipientGroup/delete/${deleteItemId}`);
            setDeleteItemId(null);
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