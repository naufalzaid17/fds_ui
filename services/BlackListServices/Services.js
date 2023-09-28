import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { formatISO } from "date-fns";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetData(){
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRead = async () => {
        const res = await axios.get(`http://${apiAddress}/blacklist/list`).then(
            res => {
                setLoading(false);
                setListData(
                    res.data.responseData.map(row => ({
                        id: row.id,
                        dateIn: formatISO(new Date(row.dateIn), {representation: 'date'}),
                        dateOut: formatISO(new Date(row.dateIn), {representation: 'date'}),
                        value: row.value,
                        entityType: row.entityType,
                        group: row.userGroup.groupName,
                        reason: row.reason,
                        initiator: {
                        id: row.initiator.id
                        },
                        userGroup: {
                        id: row.userGroup.id
                        }
                    }))
                )
            }
        );
    };
    return {listData, handleRead}
}

export function GetFraudListType(){
    const [dataFraudList, setDataFraudList] = useState([]);
    const [loading, setLoading] =useState(true)
  
    const handleDataFraudList = async() => {
        const res = await axios.get(`http://${apiAddress}/fraudListType/list`);
        setLoading(false);
        setDataFraudList(
          res.data.responseData.map(row => ({
            typeId: row.typeId,
            entityType: row.entityType
          }))
        );
    };
    return {dataFraudList, handleDataFraudList};
}

export function AddBlackList(){
    const handleAdd = async(dataNew, setDateIn, setDateOut, setValue, setEntityType, setIdUserGroup, setReason, handleRead, setIsModalOpen) => {
        try {
            const res = await axios.post(`http://${apiAddress}/blacklist/add`, dataNew);
            setDateIn('');
            setDateOut('');
            setValue('');
            setEntityType('');
            setIdUserGroup('');
            setReason('');
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
            console.error(error)
        }
    }
    return handleAdd
}

export function EditBlackList(){
    const handledit = async(editFormData, updateItemId, setUpdateItemId, handleRead, setLoading, isEditCancel) => {
        try {
            const id = Number(updateItemId);
            const res = await axios.post(
                `http://${apiAddress}/blacklist/update`,
                editFormData,
                {
                  params: {
                    currentId: id,
                  },
                }
              );
              setUpdateItemId(null);
              setLoading(false);
              isEditCancel();
              handleRead();
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
    return handledit
}

export function DeleteBlackList(){
    const handleDelete = async(deleteItemId, setDeleteItemId, handleRead, setLoading, isDeleteCancel) => {
        try {
            const res = await axios.delete(`http://${apiAddress}/blacklist/delete/${deleteItemId}`);
            setDeleteItemId(null);
            setLoading(false);
            isDeleteCancel();
            handleRead();
            if (res.data.responseCode == 200) {
                message.open({
                  content: "Data Deleted Successfully",
                  type: "success",
                  duration: 3,
                });
              } else {
                message.open({
                  content: res.data.responseMessage,
                  type: "error",
                  duration: 3,
                });
              }
        } catch (error) {
            console.error(error)
        }
    }
    return handleDelete
}

export function GetDataFraud(id){
    const [dataFraud, setDataFraud] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleReadFraud = async() => {
        const res = await axios.get(`http://${apiAddress}/fraudReaction/listByBindingIdAndBindingType?bindingId=${id}&bindingType=blacklist`).then(
            res => {
            setLoading(false);
            setDataFraud(
                res.data.responseData.map(row => ({
                id: row.id,
                bindingId: row.bindingId,
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
    return {handleReadFraud, dataFraud}
}

export function AddDataFraud(){
    const handleAddFraud = async(dataNew, setBindingId, setBindingType, setPriority, setZone, setAction, setActionValue, setDescription, setIsModalCreateFraudOpen, handleReadFraud) => {
        try {
            const res = await axios.post(`http://${apiAddress}/fraudReaction/add`, dataNew);
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
            console.log(error);
        }
    }
    return handleAddFraud
}

export function EditDataFraud(){
    const handleEditFraud = async(editFormData, setUpdateItemIdFraud, handleReadFraud, setLoading, isEditFraudCancel) => {
        try {
            const res = await axios.post(`http://${apiAddress}/fraudReaction/update`, editFormData);
            isEditFraudCancel();
            setUpdateItemIdFraud(null);
            setLoading(false);
            handleReadFraud();
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
        }
    }
    return handleEditFraud
}

export function DeleteDataFraud(){
    const handleDeleteFraud = async(deleteItemIdFraud, setDeleteItemIdFraud, handleReadFraud, setLoading, isDeleteFraudCancel) => {
        try {
            const res = await axios.delete(`http://${apiAddress}/fraudReaction/delete/${deleteItemIdFraud}`);
            setDeleteItemIdFraud(null);
            setLoading(false);
            isDeleteFraudCancel();
            handleReadFraud();
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
            console.log(error);
        }
    }
    return handleDeleteFraud
}

export function DetailBlackList(id){
    const [dataDetail, setDataDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleDetailBlackList = async() => {
        try {
            const res = await axios.get(`http://${apiAddress}/blacklist/find/${id}`);
            console.log(res.data.responseData)
            const item = res.data.responseData;
            const dataDetail = Array.isArray(item) ? item : [item];
            setDataDetail(dataDetail);
            console.log(dataDetail[0]['entityType']);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    return {dataDetail, handleDetailBlackList}
}
