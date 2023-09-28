import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetData(){
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleRead = async() => {
        const res = await axios.get(`http://${apiAddress}/recipientSetup/list`).then(
            res => {
              setLoading(false);
              setListData(
                res.data.responseData.map(row => ({
                  recipientId: row.recipientId,
                  notificationType:{
                    id: row.notificationType.id,
                    notificationType: row.notificationType.notificationType
                  },
                  type: row.notificationType.notificationType,
                  firstName: row.firstName,
                  lastName: row.lastName,
                  contactValue: row.contactValue
                }))
              )
            }
        );
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

export function AddContactSetup(){
    const handleAdd = async(dataNew, setNotificationType, setFirstName, setLastName, setContactValue, setIsModalOpen, handleRead) => {
        try {
            const res = await axios.post(`http://${apiAddress}/recipientSetup/addRecipientSetup`, dataNew);
            setNotificationType();
            setFirstName();
            setLastName();
            setContactValue();
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

export function EditContactSetup(){
    const handleEdit = async(editFormData, updateItemId, setUpdateItemId, handleRead, setLoading, isEditCancel) => {
        try {
            const res = await axios.post(`http://${apiAddress}/recipientSetup/updateRecipientSetup`, editFormData, {
              params: {
                currentId: updateItemId,
              }
            }); 
            setUpdateItemId(null);
            handleRead();
            setLoading(false);
            isEditCancel();
            if(res.data.responseCode == 200){
              message.open({
                  content: 'Data Updateed Successfully',
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
    return handleEdit
}

export function DeleteContactSetup(){
    const handleDelete = async(deleteItemId, setDeleteItemId, handleRead, setLoading, isDeleteCancel) => {
        try {
            const res = await axios.delete(`http://${apiAddress}/recipientSetup/delete/${deleteItemId}`);
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