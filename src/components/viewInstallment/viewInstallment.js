import React, { Component } from 'react';
import { List } from 'antd';
import {baseUrl} from '../../constant';
import reqwest from 'reqwest';



class ViewInstallment extends Component {


    constructor(props){
        super(props)
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

    render() {
        

        let typeObj = {
            1:{color: "#01b901"},
            2:{color: "#FF9800"},
            3:{color:"red"}
        }
        return (
            <div className="wrapper_class">
               <List
                    itemLayout="horizontal"
                    dataSource={this.state.loans}
                    renderItem={item => (
                    <List.Item>
                       <div style={typeObj[item.installment_type]} className="installment_summary">
                            <b> {item.amount} </b> <small> {item.date_time} </small>
                       </div>
                    </List.Item>
                    )}
                />
            </div>
        );
    }
}



export default ViewInstallment;