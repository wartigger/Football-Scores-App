import React, { Component } from 'react';
import { Result, Button } from 'antd';

export const displayName = "ErrorPage";

export class ErrorPage extends Component {

    render() {
        return  <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={()=>this.props.history.push('/')}>Back Home</Button>}
        />
    }
}