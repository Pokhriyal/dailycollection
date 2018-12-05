import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Upload, Modal } from 'antd';
import axios from 'axios';
import {baseUrl} from '../../constant';
import { Route, Switch, Link, Redirect } from 'react-router-dom';


const FormItem = Form.Item;
const Option = Select.Option;


class UpdateCustomer extends Component {

    state = {
    // confirmDirty: false,
    // autoCompleteResult: [],
    };

    handleSubmit = (e) => {

       

        e.preventDefault();
        let root=this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post(`${baseUrl}updateCustomer`, {

                "name":values.name,
                "tenantId":1,
                "customerId":this.props.selectedCustomer.customer_id,
                "address":values.address,
                "image":"",
                "mobile":values.phone,
                "nickName": values.nickname,
                "email": values.email,
                "agreement":"",
                "prefix": values.prefix
                })

                .then(function (response) {
                root.props.history.push("/home");
                })
                .catch(function (error) {
                console.log(error);
                });
                console.log('Received values of form: ', values);
            }
        });

    }

    // handleCancel = () => this.setState({ previewVisible: false })

    // handlePreview = (file) => {
    //     this.setState({
    //     previewImage: file.url || file.thumbUrl,
    //     previewVisible: true,
    //     });
    // }

    // handleChange = ({ fileList }) => this.setState({ fileList })

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );

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
            <div>
                <div className="header">
                    <span class="home">
                        <Link to='/home'><Icon style={{ fontSize: '24px', color: '#fff' }}  type="arrow-left" /></Link>
                        <Link to='/addcustomer'>Update Customer</Link>
                    </span>

                    <span class="adduser">
                    {/* <Link to='/addcustomer'><Icon style={{ fontSize: '24px', color: '#fff' }} type="plus" /></Link> */}
                    <Link to='/'><Icon style={{ fontSize: '24px', color: '#fff' }} type="poweroff" /></Link>
                    </span>
                </div>

                <div className="wrapper_class">

                <Form onSubmit={this.handleSubmit}>

                    <FormItem
                    {...formItemLayout}
                    label="Name"
                    >
                    {getFieldDecorator('name', {
                        initialValue: this.props.selectedCustomer.customer_name,
                        rules: [{
                        required: true, message: 'Please input your Name!',  whitespace: true 
                        }],
                    })(
                        <Input />
                    )}
                    </FormItem>

                    <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    >
                    {getFieldDecorator('email', {
                        initialValue: this.props.selectedCustomer.customer_email,
                        rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                        //required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                    </FormItem>

                    <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                        Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                        </span>
                    )}
                    >
                    {getFieldDecorator('nickname', {
                        initialValue: this.props.selectedCustomer.customer_nickname,
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(
                        <Input />
                    )}
                    </FormItem>

                    <FormItem
                    {...formItemLayout}
                    label="Address"
                    >
                    {getFieldDecorator('address', {
                        initialValue: this.props.selectedCustomer.customer_address,
                        rules: [{
                        required: true, message: 'Please input your Address!',
                        }],
                    })(
                        <Input />
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
                    <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                    >
                    {getFieldDecorator('phone', {
                        initialValue: this.props.selectedCustomer.customer_mobile,
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                    </FormItem>
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

                    {/* <FormItem {...tailFormItemLayout}>

                    {getFieldDecorator('customerpic', {
                        rules: [{ required: true, message: 'Please input your Photo!' }],
                    })(
                        <div className="clearfix">
                            <Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            >
                            {fileList.length >= 3 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    )}
                   
                    
                    </FormItem> */}

                    {/* <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                    </FormItem> */}
                    <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Update</Button>
                    </FormItem>
                </Form>
                </div>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create()(UpdateCustomer);



export default WrappedRegistrationForm;