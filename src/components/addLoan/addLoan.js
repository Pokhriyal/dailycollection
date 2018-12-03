import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import {baseUrl} from '../../constant';


const FormItem = Form.Item;
const Option = Select.Option;


class AddCustomer extends Component {

    state = {
        rAmount:0
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let root=this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                axios.post(`${baseUrl}addLoan`, {

                    "customerId": this.props.match.params.customerId,
                    "tenantId":1,
                    "disburseAmount":values.disburseAmount,
                    "repayAmount":values.repayAmount,
                    "rate":values.rate,
                    "tenure":values.tenure,
                    "penaltyAmount":values.penaltyAmount
                })

                .then(function (response) {
                root.props.history.push(`/customerloan/${root.props.match.params.customerId}`);
                console.log(response);
                })
                .catch(function (error) {
                console.log(error);
                });
                console.log('Received values of form: ', values);
            }
        });
    }

    handleNumberChange = (value) => {
      
       let rAmount = this.props.form.getFieldValue('repayAmount');
       let dAmount = this.props.form.getFieldValue('disburseAmount');
       let rate = (  rAmount - dAmount) *100 /rAmount
        this.props.form.setFieldsValue({
            'rate':String(rate)
        })
      }


      handleRoi = (value) => {
      
        let rate = this.props.form.getFieldValue('rate');
        let dAmount = this.props.form.getFieldValue('disburseAmount');
        let rAmount = 100*dAmount / (100 - rate)
         this.props.form.setFieldsValue({
             'repayAmount':String(rAmount)
         })
       }

      


    render() {
        const { getFieldDecorator } = this.props.form;

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

        // const websiteOptions = autoCompleteResult.map(website => (
        // <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        // ));

        return (
            <div className="wrapper_class">
                <Form onSubmit={this.handleSubmit}>

                    <FormItem
                    {...formItemLayout}
                    label="Disburse Amount"
                    >
                    {getFieldDecorator('disburseAmount', {
                        rules: [{
                        required: false, message: 'Please input your Disburse Amount!',  whitespace: true
                        }],
                    })(
                        <Input />
                    )}
                    </FormItem>

                    <FormItem
                    {...formItemLayout}
                    label="Repay Amount"
                    >
                    {getFieldDecorator('repayAmount', {
                        rules: [{
                        required: false, message: 'Please input your Repay Amount!',  whitespace: true
                        }],
                    })(
                        <Input onBlur={this.handleNumberChange} />
                    )}
                    </FormItem>

                    <FormItem
                    {...formItemLayout}
                    label="ROI"
                    >
                    {getFieldDecorator('rate', {
                        rules: [{
                        required: false, message: 'Please input your ROI!',  whitespace: true
                        }],
                    })(
                        <Input onBlur={this.handleRoi}  />
                    )}
                    </FormItem>

                    <FormItem
                    {...formItemLayout}
                    label="Tenure"
                    >
                    {getFieldDecorator('tenure', {
                        initialValue: '100',
                        rules: [{
                        required: false, message: 'Please input your Tenure!',  whitespace: true
                        }],
                    })(
                        <Input  />
                    )}
                    </FormItem>

                    <FormItem
                    {...formItemLayout}
                    label="Penalty Amount"
                    >
                    {getFieldDecorator('penaltyAmount', {
                        rules: [{
                        required: false, message: 'Please input your Penalty Amount!',  whitespace: true
                        }],
                    })(
                        <Input />
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