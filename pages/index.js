import React, { Component } from 'react'
import { Row, Col, List, Avatar, Icon, Card, Rate, Button, Modal ,Layout } from 'antd';
import is from 'is_js';
import 'antd/dist/antd.less';
import 'antd/lib/list/style';
import 'antd/lib/avatar/style';
import 'antd/lib/icon/style';
const { Header, Footer, Sider, Content } = Layout;


import HotelsList from '../components/HotelsList';
import Filter from '../components/Filter';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class componentName extends Component {

  static async getInitialProps({ req }) {
      //const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
      const data = await import('../data/data.json')
      return { hotels: data.default.hotels }
  }

  state = {
    filter: {
      pull: false,
      rate: 0,
      name: ''
    }
  }

  handleFilter = (filter) => {
      this.setState({filter})
  }

  getHotels = (hotels) => {
    const { filter } = this.state;
     return hotels.filter(hotel => {
       let result = true;
       if (filter.pool) {
         result = hotel.hasPool==="true"
       }
       if (is.not.empty(filter.name)) {
        result = result && (is.include(hotel.name, filter.name))
       }
       if (filter.rate !== 0) {
         result = result && (parseInt(hotel.rate) === filter.rate)
       }
       return result;
     })
  }

  render() {
    const { hotels } = this.props;
    const filteredHotels = this.getHotels(hotels);
    return (
      <div>
        <Layout>
          <Sider theme={'light'} width={400}>
          <Filter onFilter={this.handleFilter}></Filter>
          </Sider>
          <Content>
            <HotelsList hotels={filteredHotels}></HotelsList>
          </Content>  
        </Layout>
      </div>
    )
  }
}
