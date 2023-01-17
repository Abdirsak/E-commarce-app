import { Button, Input , Form, message} from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerSubmit = async(value)=>{
        console.log(value)
        try {
            dispatch({
                type:"SHOW_LOADING"
            })
            await axios.post("/api/users/register",value);
            message.success("Registred Successfully!")
            navigate("/login")
            dispatch({
                type:"HIDE_LOADING"
            })
        }catch(err){
            dispatch({
                type:"HIDE_LOADING"
            })
            message.error("Error!")
            console.log(err.message)
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("auth")){
            localStorage.getItem("auth");
        navigate("/")
        }
    },[navigate])
    return(
        <div className="form">
            <h2 className="eCommerce">E Commerce App</h2>
            <p className="login">Register</p>
            <div className="form-group">
            <Form layout = "vertical" onFinish = {handlerSubmit} >
                <FormItem name="name" label = "Name">
                    <Input/>
                </FormItem>
                <FormItem name="userId" label = "User ID">
                    <Input/>
                    
                </FormItem>
                <FormItem name="password" label = "Password">
                    <Input type="password"/>
                </FormItem>
                <div className="form-btn-add">
                    <Button htmlType="submit" className="add-new">Register</Button>
                    <Link className="form-other" to="/login">Login Here!</Link>
                </div>
            </Form>
            </div>
        </div>
    )
}
export default Register