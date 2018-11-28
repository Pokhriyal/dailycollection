import React, { Component } from 'react';
import { List } from 'antd';
import {baseUrl} from '../../constant';
import reqwest from 'reqwest';


class CustomerLoan extends Component {

    constructor(props){
        super(props)
        this.state ={
            loans:[]
        }
    }

    componentDidMount() {
        this.getInstallment = this.getInstallment.bind(this)
        this.viewInstallment = this.viewInstallment.bind(this)
        reqwest({
            url: `${baseUrl}getLoansByCustomerId/1/${this.props.match.params.customerId}`,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                this.setState({
                loans:    res.result.rows
                
                })
            },
          });
    }

    getInstallment(e){
        e.persist()
        let obj = this.state.loans.filter((loan)=>loan.loan_id == e.target.id )
        console.log(obj)
        this.props.changeState("singleLoanDetail" , obj[0] )
        this.props.history.push(`/collection/${e.target.id}`)
    }

    viewInstallment(e){
        e.persist()
        this.props.history.push(`/viewinstallment/${e.target.id}`)
    }



    render() {
        return (
            <div className="wrapper_class customers_loan">
                {/* <h3 style={{ margin: '16px 0' }}>Large Size</h3> */}
                <List
                size="large"
               // header={<div>Header</div>}
               // footer={<div>Footer</div>}
                bordered
                dataSource={this.state.loans}
                renderItem={item => (
                <List.Item  actions={[<a className="list_link" onClick={this.viewInstallment} id={item.loan_id}>View Installment</a>, <a className="list_link" onClick={this.getInstallment} id={item.loan_id}>Add Installment</a>]}>
                    <div className="customers_loan_block">
                        <h2>{item.repay_amount} </h2>
                        <span>{item.date_time}</span>
                    </div>
                </List.Item>)}
                />
            </div>
        );
    }
}



export default CustomerLoan;