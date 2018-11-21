import React, { PureComponent, Component } from 'react'
import { Row, Col, List, Avatar, Icon, Card, Rate, Button, Modal } from 'antd';

export default class HotelsList extends Component {

  state = { 
    visible: false,
    detail: {
      "name":"",
      "img":"",
      "address":"",
      "location":{"lat":"0", "lon":"0"},
      "description":"",
      "rate":"",
      "hasPool":"",
      "price":{"single":0, "double":0, "twin":0}
    }
   }

  showModal = (item) => {
    this.setState({
      visible: true,
      detail: item
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
      detail: {
        "name":"",
        "img":"",
        "address":"",
        "location":{"lat":"0", "lon":"0"},
        "description":"",
        "rate":"",
        "hasPool":"",
        "price":{"single":0, "double":0, "twin":0}
      }
    });
  }


  render() {
    const { hotels } = this.props;
    const { detail } = this.state;
    return (
        <div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={hotels}
          renderItem={item=>(
            <Row gutter={16} style={{marginBottom:16}}>
              <Col style={{paddingLeft:20}}>
                <Card style={{ width: '100%' }}>
                <Row gutter={16}>
                <Col className="gutter-row" span={3}>
                <Avatar shape="square" size={128} src={item.img} />
                </Col>
                <Col className="gutter-row" span={15}>
                <h3>{item.name}</h3>
                  <p>{item.address}</p>
                  <Rate disabled value={ parseInt(item.rate)} />
                </Col>
                <Col className="gutter-row" span={6}>
                <p>{`$ ${item.price.single}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                  <Button onClick={()=>this.showModal(item)}>View detail</Button>
                </Col>
                </Row>
                </Card>
              </Col>
            </Row>
          )}
        ></List>
        <Modal
          title={detail.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleOk}
        >
          <Avatar shape="square" size={240} src={detail.img} />
          <p>{detail.description}</p>
          <p>{detail.address}</p>
          <p>{detail.hasPool==="true"?"has pool":"has no pool"}</p>
          <Rate disabled value={ parseInt(detail.rate)} />
          <div className="ant-table ant-table-default ant-table-scroll-position-left">
            <div className="ant-table-content">
            <div className="ant-table-body">
              <table >
                <colgroup>
                  <col />
                  <col />
                </colgroup>
                <thead className="ant-table-thead">
                  <tr>
                      <th>
                        <div>Type</div>
                      </th>
                      <th>
                        <div>Price</div>
                      </th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  <tr className="ant-table-row ant-table-row-level-0" data-row-key={1}>
                    <td >single</td>
                    <td >{`$ ${detail.price.single}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  </tr>
                  <tr className="ant-table-row ant-table-row-level-0" data-row-key={2}>
                    <td >double</td>
                    <td >{`$ ${detail.price.double}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  </tr>
                  <tr className="ant-table-row ant-table-row-level-0" data-row-key={3}>
                    <td >twin</td>
                    <td >{`$ ${detail.price.twin}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </Modal>
      </div>
    )
  }
}
