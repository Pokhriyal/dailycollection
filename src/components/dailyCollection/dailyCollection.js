import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Radio, DatePicker  } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {baseUrl} from '../../constant';

const FormItem = Form.Item;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class DailyCollection extends Component {
radioChange = (e) =>{
    let root = this
    if(e.target.value == "1")
    {
        root.props.form.setFields({
            installmentAmount:{
                value:root.props.loanDetail.repay_amount/root.props.loanDetail.tenure
            }
        })
    }
    else if( e.target.value == "2")
    {
        root.props.form.setFields({
            installmentAmount:{
                value:root.props.loanDetail.penalty_amount
            }
        })
    }
    else if(e.target.value == "3"){
        root.props.form.setFields({
            installmentAmount:{
                value:0
            }
        })
    }
}
    handleSubmit = (e) => {
        e.preventDefault();
        let root=this;
        this.props.form.validateFields((err, values) => {
          if (!err) {

            axios.post(`${baseUrl}addInstallment`, {

                "loanId":this.props.match.params.loanId,
                "tenantId":1,
                "amount":values.installmentAmount,
                "installmentType":values.installmentType,
                "installmentDate":values.installmentDate,
                "sendMsg":values.msg
                })

                .then(function (response) {
                root.props.history.push(`/viewinstallment/${root.props.match.params.loanId}`);
                console.log(response);
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
        const dateFormat = 'DD/MM/YYYY';
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
        return (
            <div>

                <div className="header">
                    <span class="home">
                        Installment
                    </span>
                </div>

                <div className="wrapper_class">
                    <Form onSubmit={this.handleSubmit} className="login-form">

                        <FormItem>
                        {getFieldDecorator('installmentAmount', {
                            rules: [{ required: true, message: 'Please input your Installment Amount!' }],
                        })(
                            <Input placeholder="Installment" />
                        )}
                        </FormItem>

                        {/* <FormItem>
                        {getFieldDecorator('penalty', {
                            rules: [{ required: true, message: 'Please input your Penalty Amount!' }],
                        })(
                            <Input placeholder="Penalty" />
                        )}
                        </FormItem> */}

                        <FormItem
                            {...formItemLayout}
                            label="Installment Type"
                        >
                            {getFieldDecorator('installmentType')(
                            <RadioGroup onChange={this.radioChange } >
                                <Radio value="1">Installment</Radio>
                                <Radio value="2">Penalty</Radio>
                                <Radio value="3">Not Received</Radio>
                            </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem 
                        {...formItemLayout}
                            label="Installment Date"
                        >
                        {getFieldDecorator('installmentDate')(
                            <DatePicker defaultValue={moment()} format={dateFormat} />
                        )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('msg', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>Send SMS</Checkbox>
                        )}
                        </FormItem>

                        <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                        </FormItem>
                    </Form>
                </div>

            </div>

            
        );
    }
}

const WrappedNormalCollection = Form.create()(DailyCollection);


export default WrappedNormalCollection;