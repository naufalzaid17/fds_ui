import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { formatISO } from "date-fns";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetData(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const handleRead = async() => {
        const res = await axios.get(`http://${apiAddress}/ruleGroup/list`)
        .then(
          res => {
            console.log(res.data.responseData);
            setLoading(false);
            setData(
              res.data.responseData.map(row => ({
                id: row.id,
                groupName: row.groupName,
                threshouldBlack: row.threshouldBlack,
                threshouldGrey: row.threshouldGrey,
                priority: row.priority,
                isActive: row.isActive,
                isForcedReaction: row.isForcedReaction,
                userGroup:{
                    id: row.userGroup.id,
                    groupName: row.userGroup.groupName
                },
                group: row.userGroup.groupName
              }))
            )
          }
        );
    }
    return {data, handleRead}
}

export function AddScenarioGroup(){
    const handleAdd = async(dataNew, setGroupName, setThreshouldBlack, setThreshouldGrey, setPriority, setIsModalOpen, handleRead) => {
        try{
            const res = await axios.post(`http://${apiAddress}/ruleGroup/add`, dataNew);
            setGroupName('');
            setThreshouldBlack('');
            setThreshouldGrey('');
            setPriority('');
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
        }catch (error){
            console.error(error);
        }
    }
    return handleAdd
}

export function EditScenarioGroup(){
    const handleEdit = async(editFormData, setUpdateItemId, handleRead, setLoading, isEditCancel) => {
        try{
          const res= await axios.post(`http://${apiAddress}/ruleGroup/update`, editFormData)
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
        }catch (error) {
          console.error(error);
          setLoading(false);
        }
    }
    return handleEdit
}

export function DeleteScenarioGroup(){
    const handleDelete = async(deleteItemId, setDeleteItemId, handleRead, setLoading, isDeleteCancel) => {
        try{
            setLoading(true);
            const res = await axios.delete(`http://${apiAddress}/ruleGroup/delete/${deleteItemId}`);
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

export function GetScenarioGroupFraud(){
    const [dataFraud, setDataFraud] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleReadFraud = async() => {
        const res = await axios.get(`http://${apiAddress}/ruleGroupReaction/list`).then(
            res => {
              setLoading(false);
              setDataFraud(
                res.data.responseData.map(row => ({
                  id: row.id,
                  bindingIdTable: row.bindingId.id,
                  bindingId:{
                    id: row.bindingId.id
                  },
                  bindingType: row.bindingType,
                  priority: row.priority,
                  zone: row.zone,
                  action: row.action,
                  actionValue: row.actionValue,
                  description: row.description,
                }))
              )
            }
        )
    }
    return {dataFraud, handleReadFraud}
}

export function AddScenarioGroupFraud(){
    const handleAddFraud = async(dataNew, setBindingId, setBindingType, setPriority, setZone, setAction, setActionValue, setDescription, setIsModalCreateFraudOpen, handleReadFraud) => {
        try {
            const res = await axios.post(`http://${apiAddress}/ruleGroupReaction/add`, dataNew);
            setBindingId('');
            setBindingType('');
            setPriority('');
            setZone('');
            setAction('');
            setActionValue('');
            setDescription('');
            setIsModalCreateFraudOpen(false);
            handleReadFraud();
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
    return handleAddFraud
}

export function EditScenarioGroupFraud(){
    const handleEditFraud = async(editFormData, setUpdateItemIdFraud, setLoading, handleReadFraud, isEditFraudCancel) => {
        try {
            console.log(editFormData);
            const res = await axios.post(`http://${apiAddress}/ruleGroupReaction/update`, editFormData);
            setUpdateItemIdFraud(null);
            handleReadFraud();
            setLoading(false);
            isEditFraudCancel();
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
            setLoading(false); 
        }
    }
    return handleEditFraud
}

export function DeleteScenarioGroupFraud(){
    const handleDeleteFraud = async(deleteItemIdFraud, setDeleteItemIdFraud, handleReadFraud, setLoading, isDeleteFraudCancel) => {
        try {
            setLoading(true);
            const res = await axios.delete(`http://${apiAddress}/ruleGroupReaction/delete/${deleteItemIdFraud}`);
            setDeleteItemIdFraud(null);
            handleReadFraud();
            setLoading(false);
            isDeleteFraudCancel();
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
    return handleDeleteFraud
}