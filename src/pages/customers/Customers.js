import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppLayout from "../../components/Layout";
const Customers = ()=>{
    const [billsData , setBillsData] = useState([])
    const dispatch = useDispatch();
    const getAllBills = async ()=>{
        try {
            dispatch({
                type:"SHOW_LOADING"
            })
            const {data} = await axios.get("/api/bills/getbills");
            setBillsData(data);
            dispatch({
                type:"HIDE_LOADING"
            })
            console.log(data);
    
        }catch(err){
            dispatch({
                type:"HIDE_LOADING"
            })
            console.log("err")
        }
    };
useEffect(()=>{
    getAllBills();
},[]);
const columns = [
    {
        title : "ID",
        dataIndex : "_id"
    },
    {
        title : "Customer Name",
        dataIndex : "customerName",
    },
    {
        title : "Contect Number",
        dataIndex : "customerPhone"
    },
    {
        title : "Customer Address",
        dataIndex : "customerAddress"
    }
]
    return(
        <AppLayout>
        <h2>All Customers</h2>
        <Table dataSource={billsData} columns={columns} bordered/>
        </AppLayout>
    )
}
export default Customers