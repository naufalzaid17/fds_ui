import axios from "axios";
import { useState } from "react";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetTransactionTypeData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getData = async() => {
        await axios.get(`http://${apiAddress}/transDataAttr/list`).then(
          res => {
            setLoading(false);
            setData(
              res.data.responseData.map(row => ({ 
                attrId: row.attrId,
                attribute: row.attribute,
                fieldTag: row.fieldTag,
                addtData: row. addtData,
                description: row.description,
                config: row.configId
              }))
            )
          }
        )
      }

    return {data, loading, getData}
}

export function AddTransactionTypeData(){

    const handleAddData = async (e) => {
        e.preventDefault();
        try {
          const dataNew = {
            attribute,
            fieldTag,
            description,
            addtData: true,
            configId:{
              configId
            }
          };
          console.log(dataNew);
          const res = await axios.post(`http://${apiAddress}/transDataAttr/add`, dataNew);
          setAttrId('');
          setAttribute('');
          setFieldTag('');
          setDescription('');
          setConfigId('');
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

export function UpdateTransactionTypeData(){

    const handleUpdateData = async (e) => {
        e.preventDefault();
        try {
          console.log(editFormData)
          await axios.post(`http://${apiAddress}/transDataAttr/update`, editFormData);
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


export function DeleteTransactionTypeData(){

    const handleDeleteData = async () => {
        try {
          // console.log(listId);
          setLoading(true);
          const res = await axios.delete(`http://${apiAddress}/transDataAttr/delete/${attrId}`);
          console.log(res);
          setSelectedRowKeys([]);
          setAttrId(null);
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