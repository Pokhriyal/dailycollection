import React, { Component } from 'react';
import { List } from 'antd';

const data = [
    '10000',
    '20000',
    '50000',
    '100000',
  ];
  

class CustomerLoan extends Component {

    render() {
        return (
            <div>
                <h3 style={{ margin: '16px 0' }}>Large Size</h3>
                <List
                size="large"
               // header={<div>Header</div>}
               // footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </div>
        );
    }
}



export default CustomerLoan;