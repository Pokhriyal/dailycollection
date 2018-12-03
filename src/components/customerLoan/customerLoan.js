import React, { Component } from 'react';
import { List, Tabs, Icon  } from 'antd';
import {baseUrl} from '../../constant';
import reqwest from 'reqwest';
import {Link } from 'react-router-dom';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}


class CustomerLoan extends Component {

    constructor(props){
        super(props)
        this.state ={
            loans:[],
            closeLoans:[]
        }
    }

    componentDidMount() {
        this.getInstallment = this.getInstallment.bind(this)
        this.viewInstallment = this.viewInstallment.bind(this)
        this.viewCloseInstallment = this.viewCloseInstallment.bind(this)
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

        reqwest({
            url: `${baseUrl}getClosedLoansByCustomerId/1/${this.props.match.params.customerId}`,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                this.setState({
                    closeLoans:    res.result.rows
                
                })
            },
        });
    }

    getInstallment(e){
        e.persist()
        let obj = this.state.loans.filter((loan)=>loan.loan_id == e.target.id )

        this.props.changeState("singleLoanDetail" , obj[0] )
        this.props.history.push(`/collection/${e.target.id}`)
    }

    viewInstallment(e){
        e.persist()
        let obj = this.state.loans.filter((loan)=>loan.loan_id == e.target.id )

        this.props.changeState("singleLoanDetail" , obj[0] )
        this.props.history.push(`/viewinstallment/${e.target.id}`)
    }

    viewCloseInstallment(e){
        e.persist()
        let obj = this.state.closeLoans.filter((loan)=>loan.loan_id == e.target.id )

        this.props.changeState("singleLoanDetail" , obj[0] )
        this.props.history.push(`/viewinstallment/${e.target.id}`)
    }



    render() {
        return (

            <div>
                    <div className="header">
                        <span class="home">
                            <Link to='/home'><Icon style={{ fontSize: '24px', color: '#fff' }}  type="arrow-left" /></Link>
                            Loan
                        </span>

                        <span class="adduser">
                        {/* <Link to='/addcustomer'><Icon style={{ fontSize: '24px', color: '#fff' }} type="plus" /></Link> */}
                        <Link to='/'><Icon style={{ fontSize: '24px', color: '#fff' }} type="poweroff" /></Link>
                        </span>
                    </div>

                    <div className="wrapper_class customers_loan">
                        {/* <h3 style={{ margin: '16px 0' }}>Large Size</h3> */}

                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Active Loans" key="1">
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
                            </TabPane>
                            <TabPane tab="Close Loans" key="2">
                                <List
                                    size="large"
                                // header={<div>Header</div>}
                                // footer={<div>Footer</div>}
                                    bordered
                                    dataSource={this.state.closeLoans}
                                    renderItem={item => (
                                    <List.Item  actions={[<a className="list_link" onClick={this.viewCloseInstallment} id={item.loan_id}>View Installment</a>]}>
                                        <div className="customers_loan_block">
                                            <h2>{item.repay_amount} </h2>
                                            <span>{item.date_time}</span>
                                        </div>
                                    </List.Item>)}
                                />
                            </TabPane>
                        </Tabs>

                        
                    </div>
            </div>
            
        );
    }
}



export default CustomerLoan;