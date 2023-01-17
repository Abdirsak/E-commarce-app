import { Button, Input,Form, message} from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlerSubmit = async(value)=>{
        try {
            dispatch({
                type:"SHOW_LOADING"
            })
            const res = await axios.post("/api/users/login",value);
            console.log(res)
            if(res.data.message !== "Login Fail"){
                console.log(res.data)
                message.success("User Login Successfully!")
                localStorage.setItem("auth",JSON.stringify(res.data))
                navigate("/")
                dispatch({
                type:"HIDE_LOADING"
            })
            }
            else{
                dispatch({
                    type:"HIDE_LOADING"
                })
                message.error("failed to login!")
                navigate("/login")
            }
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
            <p className="login">Login</p>
            <div className="form-group">
            <Form layout="vertical" onFinish={handlerSubmit} >
                <FormItem name="userId" label = "User ID">
                    <Input/>
                </FormItem>
                <FormItem name="password" label = "Password">
                    <Input type="password"/>
                </FormItem>
                <div className="form-btn-add">
                    <Button htmlType="submit" className="add-new">Login</Button>
                    <Link className="form-other" to="/register">Register Here!</Link>
                </div>
            </Form>
            </div>
        </div>
    )
}
export default Login