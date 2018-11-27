import React, { Component } from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';

import {baseUrl} from '../../constant'
import reqwest from 'reqwest';

const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;


class CustomerList extends Component {

    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        customers: [],
        }

    componentDidMount() {
        reqwest({
            url: `${baseUrl}getCustomers/1`,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                console.log(res)
                this.setState({customers:  res.result.rows})
  
            },
          });
    }





    render() {
        const { customers } = this.state;
       
    
        return (
        <List
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={customers}
            renderItem={
                item => (
                <List.Item actions={[<a>edit</a>, <a>more</a>]}>
            {item.customer_name}
            {item.customer_mobile}
                </List.Item>
            )}
        />
        );
    }
}

export default CustomerList;
