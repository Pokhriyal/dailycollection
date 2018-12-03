import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert, notification, Spin  } from 'antd';
import { Link} from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../../constant';
import reqwest from 'reqwest';
import moment from 'moment';

const FormItem = Form.Item;


class Login extends Component {

    constructor(props){
        super(props)
        this.state = { loading: false }
    }

    handleSubmit = (e) => {
        e.preventDefault();
     
        let root=this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loading:true
                })
                axios.post(`${baseUrl}validate`, {
                "mobile":values.mobileNo,
                "password": values.password
                })

                .then(function (response) {
                root.setState({
                    loading:false
                })
                // root.props.history.push("/home");
                if(response.data.error)
                {
                   
                    notification['error']({
                        message: 'Login',
                        description: `Invalid Username and Password`,
                    });
                } else{
                    root.props.history.push("/home");
                }
               
                })
                .catch(function (error) {
                console.log(error);
                });
                console.log('Received values of form: ', values);
            }
        });

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            
            <div className="wrapper_class login_wraper">
            {this.state.loading? <div className="gl_loader" > <Icon type="loading" style={{ fontSize: 24 }} spin /> </div> : null }
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                    {getFieldDecorator('mobileNo', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Mobile No" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                   
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
    
                    Or <Link to='/register'>register now!</Link>
                    </FormItem>
                </Form>
            </div>
 
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm;