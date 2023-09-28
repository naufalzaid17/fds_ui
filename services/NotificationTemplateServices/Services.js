import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetData(){
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleRead = async() => {
        const res = await axios.get(`http://${apiAddress}/notificationTemplate/list`).then(
            res => {
              setLoading(false);
              setListData(
                res.data.responseData.map(row => ({
                  id: row.id,
                  subject : row.subject,
                  description : row.description,
                  template : row.template,
                  notification : row.notificationType.notificationType,
                  notificationType:{
                    id: row.notificationType.id
                  }
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

export function AddNotificationTemplate(){
    const handleAdd = async(dataNew, setSubject, setDescription, setTemplate, setIdNotificationType, setIsModalOpen, handleRead) => {
        try {
            const res = await axios.post(`http://${apiAddress}/notificationTemplate/add`, dataNew);
            setSubject('');
            setDescription('');
            setTemplate('');
            setIdNotificationType('');
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

export function EditNotificationTemplate(){
    const handleEdit = async(editFormData, setUpdateItemId, setIsModalEditOpen, handleRead, setLoading) => {
        try {
            const res = await axios.post(`http://${apiAddress}/notificationTemplate/update`, editFormData);
            setUpdateItemId(null);
            setIsModalEditOpen(false);
            handleRead();
            setLoading(false);
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

export function DeleteNotificationTemplate(){
    const handleDelete = async(deleteItemId, setDeleteItemId, handleRead, setLoading, isDeleteCancel) => {
        try{
            const res = await axios.delete(`http://${apiAddress}/notificationTemplate/delete/${deleteItemId}`);
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
        }catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    return handleDelete
}

export function DetailNotificationTemplate(id){
    const [dataDetail, setDataDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleDetail = async() => {
        try {
            const res = await axios.get(`http://${apiAddress}/notificationTemplate/find/${id}`);
            const item = res.data.responseData;
            const dataDetail = Array.isArray(item) ? item : [item];
            setDataDetail(dataDetail);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    return {dataDetail, handleDetail}
}