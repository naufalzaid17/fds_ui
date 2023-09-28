import  axios  from "axios";
import { useState } from "react";

const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;

export function GetData(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async() => {
        const res = await axios.get(`http://${apiAddress}/list_aid_label/getAll`).then(
          res => {
            setLoading(false);
            console.log(res.data.responseData);
            setData(
              res.data.responseData.map(row => ({
                id: row.id,
                aid: row.aid,
                label: row.label
              }))
            )
          }
        );
      };
    return {data, loading, getData};
}


export function AddAidParameterData(){

    const handleAddData = async (e) => {
        e.preventDefault();
        try {
          const dataNew ={
            aid,
            label 
          };
          const res = await axios.post(`http://${apiAddress}/list_aid_label/add`, dataNew);
          setAid('');
          setLabel('');
          setIsModalOpen('');
          getData();
          if(res.data.responseCode == 200){
            message.open({
                content: 'Data Added Succesfully',
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
      };

    return handleAddData;
}

export function UpdateAidParameterData(){

    const handleUpdateData = async (e) => {
        e.preventDefault();
        try {
          console.log(editFormData);
          const res = await axios.post(`http://${apiAddress}/list_aid_label/update`, editFormData);
          setUpdateItemId(null);
          getData();
          setLoading(false);
          isEditCancel();
          if(res.data.responseCode == 200){
            message.open({
                content: 'Data Updated Succesfully',
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
      };

    return handleUpdateData;
}

export function DeleteAidParameterData(){

    const handleDeleteData = async () => {
        try {
          setLoading(true);
          const res = await axios.delete(`http://${apiAddress}/list_aid_label/delete/${id}`);
          console.log(res);
          setSelectedRowKeys([]);
          setDeleteItemId(null);
          getData();
          setLoading(false);
          isDeleteCancel();
          if(res.data.responseCode == 200){
            message.open({
                content: 'Data Deleted Succesfully',
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

    return handleDeleteData;
}

