import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class DailyCollection extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                
                    <FormItem>
                    {getFieldDecorator('installmentAmount', {
                        rules: [{ required: true, message: 'Please input your Installment Amount!' }],
                    })(
                        <Input placeholder="Installment" />
                    )}
                    </FormItem>

                    <FormItem>
                    {getFieldDecorator('penalty', {
                        rules: [{ required: true, message: 'Please input your Penalty Amount!' }],
                    })(
                        <Input placeholder="Penalty" />
                    )}
                    </FormItem>

                    <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Submit
                    </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedNormalCollection = Form.create()(DailyCollection);


export default WrappedNormalCollection;