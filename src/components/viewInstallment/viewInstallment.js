import React, { Component } from 'react';
import { List } from 'antd';
import axios from 'axios';
import {baseUrl} from '../../constant';
import reqwest from 'reqwest';
import moment from 'moment';



class ViewInstallment extends Component {


    constructor(props){
        super(props)
        this.loanClose= this.loanClose.bind(this);
        this.state ={
            loans:[]
        }
    }

    componentDidMount() {
     
        reqwest({
            url: `${baseUrl}getInstallments/1/${this.props.match.params.loanId}`,
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


    loanClose(e){
        axios.post(`${baseUrl}closeLoan`, {

            "loanId":this.props.loanDetail.loan_id,
            "tenantId":1
        })

        .then((response)=> {
        this.props.history.push(`/`);
        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });
       
    }

    render() {
        

        let typeObj = {
            1:{color: "#01b901"},
            2:{color: "#FF9800"},
            3:{color:"red"}
        }
        let installmentTotal = 0, penaltyTotal = 0;
        for(var i = 0, j=this.state.loans.length; i<j; i++ ){
                let obj = this.state.loans[i]
                if(obj.installment_type === 1) 
                {
                    installmentTotal+= obj.amount 
                }
                else if(obj.installment_type === 2)
                {
                    penaltyTotal+=obj.amount
                }
        }
        return (
            <div>

            <div className="header">
                <span class="home">
                    Loan Summary
                </span>
            </div>
            <div className="summary_info">
                <div>{this.props.loanDetail.repay_amount}</div>
                <div className="right_action_summary">
                    {this.props.loanDetail.repay_amount - installmentTotal} &nbsp;&nbsp;
                    <span>
                    <button onClick={this.loanClose}>Loan Close</button>
                    </span>
                </div>
            </div>
            <div className="summaryTable wrapper_class">
                <table>
                    <thead>
                        <tr>
                            <th>Sr</th>
                            <th>Date</th>
                            <th>Installment</th>
                            <th>Penality</th>
                            <th>NR</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.loans.map((loan, index)=> {
                               return( <tr style={typeObj[loan.installment_type]}>
                                    <td>{index +1}</td>
                                    <td>{moment(loan.date_time).format('DD/MM/YYYY')}</td>
                                    <td>{loan.installment_type===1 ? loan.amount : '-'}</td>
                                    <td>{loan.installment_type===2 ? loan.amount : '-'}</td>
                                    <td>{loan.installment_type===3 ? loan.amount : '-'}</td>

                                </tr>)
                            }) 
                        }
                        
                    </tbody>

                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>{installmentTotal}</td>
                            <td>{penaltyTotal}</td>
                            <td>00.00</td>

                        </tr>
                    </tfoot>
                </table>
            </div>
                



               {/* <List
                    itemLayout="horizontal"
                    dataSource={this.state.loans}
                    renderItem={item => (
                    <List.Item>
                       <div style={typeObj[item.installment_type]} className="installment_summary">
                            <b> {item.amount} </b> <small> {item.date_time} </small>
                       </div>
                    </List.Item>
                    )}
                /> */}
            </div>
        );
    }
}



export default ViewInstallment;