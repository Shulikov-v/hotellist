import React, { PureComponent } from 'react'
import { Row, Col, Checkbox, Rate, Input } from 'antd';
import is from 'is_js';

export default class Filter extends PureComponent {

  state = {
    filter: {
      pool: false,
      rate: 0,
      name: ''
    }
  }

  onCheckBoxChange = (e) => {
    let filter = {...this.state.filter};
    if (e.target.checked) {
      filter = {...filter, pool:true}
    } else {
      filter = {...filter, pool:false}
    }
    this.setState({filter})
    this.props.onFilter(filter);
  }

  onInputChange = (e) => {
    let filter = {...this.state.filter};
    filter = {...filter, name:e.target.value}
    this.setState({filter})
    this.props.onFilter(filter);
  }

  onRateChange = (e) => {
    let filter = {...this.state.filter};
    filter = {...filter, rate:e}
    this.setState({filter})
    this.props.onFilter(filter);
  }

  render() {
    return (
      <div>
        <Row style={{marginBottom:6}}>
        <Col span={20} offset={2}>
          <Rate onChange={this.onRateChange}/>
        </Col>
        </Row>
        <Row style={{marginBottom:6}}>
        <Col span={20} offset={2}>
          <Checkbox onChange={this.onCheckBoxChange}>Pool</Checkbox>
        </Col>
        </Row>
        <Row style={{marginBottom:6}}>
        <Col span={20} offset={2}>
          <Input onChange={this.onInputChange} placeholder="Hotel name" />
        </Col>
        </Row>
      </div>
    )
  }
}
