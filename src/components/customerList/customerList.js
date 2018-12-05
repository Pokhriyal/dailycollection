import React, { Component } from 'react';
import { List, Icon, Input, notification } from 'antd';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import {baseUrl} from '../../constant'
import reqwest from 'reqwest';



class CustomerList extends Component {
  
    state = {
        // initLoading: true,
        loading: true,
        // data: [],
        // list: [],
        customers: [],
        items: []
        }
  

    componentDidMount() {
        this.getPlan = this.getPlan.bind(this)
        this.addLoan = this.addLoan.bind(this)
        this.filterList = this.filterList.bind(this)
        this.updateDetail = this.updateDetail.bind(this)
        reqwest({
            url: `${baseUrl}getCustomers/1`,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                console.log(res)
                this.setState({
                    customers: res.result.rows,
                    items:  res.result.rows,
                    loading:false
                })
                // root.props.history.push("/home");
                if(res.error)
                {
                   
                    notification['error']({
                        message: 'Login',
                        description: `Invalid Username and Password`,
                    });
                } else{
                    this.props.history.push("/home");
                }
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

    filterList(event){
        
        var updatedList = this.state.customers;
        updatedList = updatedList.filter(function(item){
          return item.customer_name.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
      }

    updateDetail(e){
        e.persist()
        console.log(e.currentTarget);
        let obj = this.state.customers.filter((customer)=>customer.customer_id == e.currentTarget.id )

        this.props.changeState("selectedCustomer" , obj[0] )
        this.props.history.push(`/updatecustomer`)
    }

    render() {
        const { items } = this.state;
        const Search = Input.Search;
        return (
            <div>
                <div className="header">
                    <span class="home"><Link to='/home'>Customers List</Link></span>

                    <span class="adduser">
                    <Link to='/addcustomer'><Icon style={{ fontSize: '24px', color: '#fff' }} type="plus" /></Link>
                    <Link to='/'><Icon style={{ fontSize: '24px', color: '#fff' }} type="poweroff" /></Link>
                    </span>
                </div>

                <div>
                    <Search
                    placeholder="input search text"
                    onChange={this.filterList}
                    size="large"
                    />
                </div>

                <div>
                {this.state.loading? <div className="gl_loader" > <Icon type="loading" style={{ fontSize: 24 }} spin /> </div> : null }
                </div>
             
                <List
                    className="demo-loadmore-list customer_link"
                    // loading={initLoading}
                    itemLayout="horizontal"
                    // loadMore={loadMore}
                    dataSource={items.sort(function(a, b){
                        if(a.customer_name < b.customer_name) { return -1; }
                        if(a.customer_name > b.customer_name) { return 1; }
                        return 0;
                    })}
                    renderItem={
                        item => (
                        <List.Item actions={[<a className="list_link" onClick={this.getPlan} id={item.customer_id} >Loans</a>, <a  className="list_link" onClick={this.addLoan} id={item.customer_id}>Add Loan</a>]}>
                            <div className="list_view">
                            <a onClick={this.updateDetail} id={item.customer_id} style={{display:'block'}}>
                                <h4>
                                {item.customer_name}
                                <span>{item.customer_address}</span>
                                </h4>
                                </a>
                            </div>
                            
                        </List.Item>
                    )}
                />
        </div>
        );
    }
}

export default CustomerList;
