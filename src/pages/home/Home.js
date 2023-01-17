import AppLayout from "../../components/Layout";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Col, Row } from 'antd';
import Product from "../../components/Product";
import { useDispatch } from "react-redux";
const Home = ()=>{
    const dispatch = useDispatch()
    const [productData , setProductData] = useState([])
    const [selectedCategory , setSelectedCategory] = useState('Cold items');
    const categories = [
        {
            name : "Cold items",
            imageUrl : "https://cdn.vox-cdn.com/thumbor/JXp4IjK2sIu3cuF-kCbIvikVM20=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/19521773/retrofit_ductless.jpg",
        },
        {
            name : "Calculating items",
            imageUrl : "https://help.apple.com/assets/6349C6D021306137DD68CBD5/6349C6D721306137DD68CBF4/en_US/23628197c5c099a5855a530b8e1473a3.png",
        },
        {
            name : "Photographed items",
            imageUrl : "https://target.scene7.com/is/image/Target/GUEST_efc49323-de93-45c0-88db-cc19c4838dcf?wid=488&hei=488&fmt=pjpeg",
        },
        {
            name : "Timing items",
            imageUrl : "https://m.media-amazon.com/images/I/71k8Ui6VGML._AC_SX425_.jpg",
        },
        {
            name : "Heading Items",
            imageUrl : "https://m.media-amazon.com/images/I/41weI47e78L._AC_SY1000_.jpg",
        },
        {
            name : "Seen Items",
            imageUrl : "https://m.media-amazon.com/images/I/61fRsxL8VpL._UL1500_.jpg",
        }
        ,{
            name : "Telephones",
            imageUrl : "https://mobileimages.lowes.com/productimages/7b6696e1-7177-4108-8c04-ebe92e44d9e9/42501744.jpg",
        },
        {
            name : "Computer",
            imageUrl : "https://i.pcmag.com/imagery/reviews/02lcg0Rt9G3gSqCpWhFG0o1-2..v1656623239.jpg",
        },
        {
            name : "Display Items",
            imageUrl : "https://m.media-amazon.com/images/I/81tWF2si3SL._SX450_.jpg",
        },
        {
            name : "Assisting Items",
            imageUrl : "https://assets.reedpopcdn.com/steelseries-aerox-5-wireless-gaming-mouse.jpg/BROK/resize/1200x1200%3E/format/jpg/quality/70/steelseries-aerox-5-wireless-gaming-mouse.jpg",
        }
        ,{
            name : "Printing Items",
            imageUrl : "https://images.jdmagicbox.com/quickquotes/images_main/hp-1020-plus-laser-printer-376849576-2csab.png",
        },
        {
            name : "Network Items",
            imageUrl : "https://in-media.apjonlinecdn.com/catalog/product/0/1/01_hp_laser_108a_mirage_base_front.png",
        },
        {
            name : "Connecting Items",
            imageUrl : "https://m.media-amazon.com/images/I/71pjU76vfML._SL1500_.jpg",
        }
    ]
useEffect(()=>{
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
            console.log("err")
        }
    };
    getAllProducts();
},[dispatch])
    return (
        <AppLayout>
        <div className="category">
            {
                categories.map((categories) =>(
                    <div key={categories.name} className={`categoryFlex ${selectedCategory === categories.name && 'category-active'}`} onClick={()=>setSelectedCategory(categories.name)}>
                        <h3 className="categoryName">{categories.name}</h3>
                        <img src={categories.imageUrl} alt={categories.name} height={60} width={60}/>
                    </div>
                ))
            }
        </div>
            <Row>
                {productData.filter((i)=> i.category === selectedCategory).map((mproduct) => (
                    <Col xs={24} sm={6} md={12} lg={6}>
                        <Product key={mproduct.id} product = {mproduct}/>
                    </Col>
                ))}
            </Row>
        </AppLayout>
    )
}
export default Home