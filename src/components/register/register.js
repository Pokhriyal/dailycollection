import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Upload, Modal } from 'antd';
import axios from 'axios';
import {baseUrl} from '../../constant';


const FormItem = Form.Item;
const Option = Select.Option;


class AddCustomer extends Component {

    state = {
    // confirmDirty: false,
    // autoCompleteResult: [],
    };

    handleSubmit = (e) => {

    
        e.preventDefault();
        let root=this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post(`${baseUrl}addTenant`, {

                "name":values.name,
                "address": values.address,
                "gst": values.gst,
                "isActive": 1,
                "mobile": values.phone,
                "pwd": values.password
                })

                .then(function (response) {
                root.props.history.push("/");
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
        // const { autoCompleteResult } = this.state;

        const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
        };
        const tailFormItemLayout = {
        wrapperCol: {
            xs: {
            span: 24,
            offset: 0,
            },
            sm: {
            span: 20,
            offset: 4,
            },
        },
        };
        const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '91',
        })(
        <Select style={{ width: 70 }}>
            <Option value="91">+91</Option>
            <Option value="41">+41</Option>
        </Select>
        );

        // const websiteOptions = autoCompleteResult.map(website => (
        // <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        // ));

        return (
            <div className="wrapper_class">
                <Form onSubmit={this.handleSubmit}>

                    <FormItem
                    {...formItemLayout}
                    label="Name"
                    >
                    {getFieldDecorator('name', {
                        rules: [{
                        required: true, message: 'Please input your Name!',  whitespace: true
                        }],
                    })(
                        <Input />
                    )}
                    </FormItem>


                    <FormItem
                    {...formItemLayout}
                    label="Address"
                    >
                    {getFieldDecorator('address', {
                        rules: [{
                        required: true, message: 'Please input your Address!',
                        }],
                    })(
                        <Input />
                    )}
                    </FormItem>


                    <FormItem
                    {...formItemLayout}
                    label="GST"
                    >
                    {getFieldDecorator('gst', {
                       
                    })(
                        <Input />
                    )}
                    </FormItem>

                    <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                    >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                    </FormItem>

                    <FormItem
                    {...formItemLayout}
                    label="Password"
                    >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input type="password" placeholder="Password" />
                    )}
                    </FormItem>

                    

                    
                    {/* <FormItem
                    {...formItemLayout}
                    label="Habitual Residence"
                    >
                    {getFieldDecorator('residence', {
                        initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                        rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
                    })(
                        <Cascader options={residences} />
                    )}
                    </FormItem> */}
                    
                    {/* <FormItem
                    {...formItemLayout}
                    label="Website"
                    >
                    {getFieldDecorator('website', {
                        rules: [{ required: true, message: 'Please input website!' }],
                    })(
                        <AutoComplete
                        dataSource={websiteOptions}
                        onChange={this.handleWebsiteChange}
                        placeholder="website"
                        >
                        <Input />
                        </AutoComplete>
                    )}
                    </FormItem> */}

                    {/* <FormItem
                    {...formItemLayout}
                    label="Captcha"
                    extra="We must make sure that your are a human."
                    >
                    <Row gutter={8}>
                        <Col span={12}>
                        {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: 'Please input the captcha you got!' }],
                        })(
                            <Input />
                        )}
                        </Col>
                        <Col span={12}>
                        <Button>Get captcha</Button>
                        </Col>
                    </Row>
                    </FormItem> */}

                    <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create()(AddCustomer);



export default WrappedRegistrationForm;