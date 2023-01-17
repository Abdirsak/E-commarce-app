import React ,{useState,useEffect} from "react";
import AppLayout from "../../components/Layout";
import { useDispatch } from "react-redux";
import axios from "axios";
import {DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import FormItem from "antd/es/form/FormItem";
const Products = ()=>{
    const dispatch = useDispatch();
    const [productData , setProductData] = useState([])
    const [popModal , setPopModal] = useState(false);
    const [editProduct , setEditProduct] = useState(false)

    const getAllProducts = async ()=>{
        try {
            dispatch({
                type:"SHOW_LOADING"
            })
            const {data} = await axios.get("/api/products/getproducts");
            setProductData(data);
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
    getAllProducts();
},[]);
const handlerDelete = async(record)=>{
    try {
        dispatch({
            type:"SHOW_LOADING"
        })
       await axios.post("/api/products/deleteproducts", {productId : record._id});
        message.success("Product Deleted Successfully!")
        getAllProducts();
        setPopModal(false)
        dispatch({
            type:"HIDE_LOADING"
        })
    }catch(err){
        dispatch({
            type:"HIDE_LOADING"
        })
        message.error("Error!")
        console.log("err")
    }
}
const columns = [
    {
        title : "Name",
        dataIndex : "name"
    },
    {
        title : "Image",
        dataIndex : "image",
        render:(image , record )=> <img src={image} alt={record.name} height={60} width={60} />
    },
    {
        title : "Price",
        dataIndex : "price"
    },
    {
        title : "Action",
        dataIndex : "_id",
        render:(id , record)=> 
        <div>
            <DeleteOutlined className='cart-action' onClick={()=>handlerDelete(record)}/>
            <EditOutlined className="cart-edit" onClick={()=> {setEditProduct(record);setPopModal(true)}}/>
        </div>
    }
]
    const handlerSubmit = async(value)=>{
        //console.log(value);
       if(editProduct === null){
        try {
            dispatch({
                type:"SHOW_LOADING"
            })
            const res = await axios.post("/api/products/addproducts",value);
            message.success("Product Added Successfully!")
            getAllProducts();
            setPopModal(false)
            dispatch({
                type:"HIDE_LOADING"
            })
        }catch(err){
            dispatch({
                type:"HIDE_LOADING"
            })
            message.error("Error!")
            console.log("err")
        }
       }else{
        try {
            dispatch({
                type:"SHOW_LOADING"
            })
           await axios.put("/api/products/updateproducts", {...value , productId : editProduct._id});
            message.success("Product Updated Successfully!")
            getAllProducts();
            setPopModal(false)
            dispatch({
                type:"HIDE_LOADING"
            })
        }catch(err){
            dispatch({
                type:"HIDE_LOADING"
            })
            message.error("Error!")
            console.log("err")
        }

       }
    };
    return (
    <AppLayout>
        <h2>All Products</h2>
        <Button className="add-new" onClick={()=> setPopModal(true)}>Add New</Button>
        <Table dataSource={productData} columns={columns} bordered/>
        {
            popModal && 
            <Modal title={`${editProduct !== null ? "Edit Product" : "Add New Product"}`} open={popModal} onCancel={()=>{setEditProduct(null); setPopModal(false)}} footer={false}>
            <Form layout="vertical" initialValues={editProduct} onFinish={handlerSubmit} >
                <FormItem name="name" label = "Name">
                    <Input/>
                </FormItem>
                <FormItem name="category" label = "Category">
                <Select>
                    <Select.Option value="Cold items">Cold Items</Select.Option>
                    <Select.Option value="Calculating items">Calculating Items</Select.Option>
                    <Select.Option value="Photographed items">Photographed Items</Select.Option>
                    <Select.Option value="Timing items">Timing Items</Select.Option>
                    <Select.Option value="Heading Items">Heading Items</Select.Option>
                    <Select.Option value="Seen Items">Seen Items</Select.Option>
                    <Select.Option value="Telephones">Telephones</Select.Option>
                    <Select.Option value="Computer">Computers</Select.Option>
                    <Select.Option value="Display Items">Display Items</Select.Option>
                    <Select.Option value="Assisting Items">Assisting Items</Select.Option>
                    <Select.Option value="Printing Items">Printing Items</Select.Option>
                    <Select.Option value="Network Items">Network Items</Select.Option>
                    <Select.Option value="Connecting Items">Connecting Items</Select.Option>
                </Select>
                </FormItem>
                <FormItem name="price" label = "Price">
                    <Input/>
                </FormItem>
                <FormItem name="image" label = "Image URL">
                    <Input/>
                </FormItem>
                <div className="form-btn-add">
                    <Button htmlType="submit" className="add-new">Add</Button>
                </div>
            </Form>
        </Modal>
        }
    </AppLayout>
    )
}
export default Products