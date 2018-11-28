import React, { Component } from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';

import {baseUrl} from '../../constant'
import reqwest from 'reqwest';



class CustomerList extends Component {
  
    state = {
        // initLoading: true,
        // loading: false,
        // data: [],
        // list: [],
        customers: [],
        }
  

    componentDidMount() {
        this.getPlan = this.getPlan.bind(this)
        this.addLoan = this.addLoan.bind(this)
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

    getPlan(e)
    {
        e.persist()
        // debugger;
        this.props.history.push("/customerloan/" + e.target.id )
    }

    addLoan(e)
    {
        e.persist()
        // debugger;
        this.props.history.push("/addloan/" + e.target.id )
    }

    render() {
        const { customers } = this.state;
      
        return (
        <List
            className="demo-loadmore-list customer_link"
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={customers}
            renderItem={
                item => (
                <List.Item actions={[<a className="list_link" onClick={this.getPlan} id={item.customer_id} >Loans</a>, <a  className="list_link" onClick={this.addLoan} id={item.customer_id}>Add Loan</a>]}>
                    <div className="list_view">
                        <h4>
                        {item.customer_name} <br/>
                        <span>{item.customer_address}</span>
                        </h4>
                    </div>
                    
                </List.Item>
            )}
        />
        );
    }
}

export default CustomerList;
