import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { formatISO } from "date-fns";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetData(){
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRead = async () => {
      const res = await axios.get(`http://${apiAddress}/sanctionList/list`).then(
          res => {
            setLoading(false);
            setListData(
              res.data.responseData.map(row => ({
                listId: row.listId,
                listName: row.listName,
                group: row.userGroup.groupName,
                entity: row.entityType.entityType,
                userGroup:{
                  id: row.userGroup.id
                },
                entityType:{
                  typeId: row.entityType.typeId,
                  entityType: row.entityType.entityType
                }
              }))
            )
          }
      );
  };
  return { listData,  handleRead };
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

export function AddFraudList(){
  const handleAdd = async(dataNew, setListName, setEntityType, setIdUserGroup, setIsModalOpen, handleRead) => {
      try {
          const res = await axios.post(`http://${apiAddress}/sanctionList/add`, dataNew);
          setListName('');
          setEntityType('');
          setIdUserGroup('');
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

export function EditFraudList(){
  const handleEdit = async(editFormData, updateItemId, setUpdateItemId, handleRead, setLoading, isEditCancel) => {
      try {
          console.log(editFormData);
          const res = await axios.post(`http://${apiAddress}/sanctionList/update`, editFormData, {
            params: {
              currentListName: updateItemId,
            }
          });
          isEditCancel();
          setUpdateItemId(null);
          setLoading(false);
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
            setLoading(false);
        }
  }
  return handleEdit
}

export function DeleteFraudList(){
  const handleDelete = async(listId, setLoading, setItemListId, isDeleteCancel, handleRead) => {
      try {
          console.log(listId);
          const res = await axios.delete(`http://${apiAddress}/sanctionList/delete/${listId}`);
          console.log(res);
          setItemListId(null);
          setLoading(false);
          isDeleteCancel(true);
          handleRead();
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

export function GetDetailFraudList(id, setLoading){
  const [item, setItem] = useState([]);
  const handleDetail = async() => {
    await axios.get(`http://${apiAddress}/fraudListValue/listFraudValueById?listId=${id}`).then(
      res => {
        setLoading(false);
        setItem(
          res.data.responseData.map(row => ({
              id: row.id,
              author: row.author,
              value: row.value,
              creationDate: formatISO(new Date(row.creationDate), {representation: 'date'}),
              listName: row.listId.listName,
              valueId: row.listId.listId,
              listId:{
                listId: row.listId.listId,
                listName: row.listId.listName,
                userGroup:{
                  id: row.listId.userGroup.id,
                  groupName: row.listId.userGroup.groupName
                },
                entityType:{
                  typeId: row.listId.entityType.typeId,
                  entityType: row.listId.entityType.entityType
                }
              }
            }))
        )
      }
    );
  }
  return {item, handleDetail}
}

export function AddFraudListValue(){
  const handleAddValue = async(dataNew, handleDetail, setValue, setIsModalOpen) => {
    try {
      console.log(dataNew);
      const res = await axios.post(`http://${apiAddress}/fraudListValue/add`, dataNew);
      setValue('');
      setIsModalOpen(false);
      handleDetail();
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
  return handleAddValue
}

export function EditFraudListValue(){
  const handleEditValue = async(handleDetail, editFormData, updateItemId, setUpdateItemId, setLoading, isEditCancel) => {
    try {
      console.log(editFormData);
      const res = await axios.post(`http://${apiAddress}/fraudListValue/update?currentValue=${updateItemId
      }`, editFormData);
      setUpdateItemId(null);
      handleDetail();
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
      setLoading(false);
    }
  }
  return handleEditValue
}

export function DeleteFraudListValue() {
  const handleDeleteValue = async(deleteItemId, setDeleteItemId, handleDetail, setLoading, isDeleteCancel) => {
    try {
      setLoading(true);
      const res = await axios.delete(`http://${apiAddress}/fraudListValue/delete/${deleteItemId}`);
      setDeleteItemId(null);
      handleDetail();
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
  return handleDeleteValue
}