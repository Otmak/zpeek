import React, {Component} from 'react';

import {Tabs, TabList, Tab, PanelList, Panel} from 'react-tabtab';


export default class Basic extends Component {
    constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
      activeIndex: 0,
      tabs: this.props.assets
    }
  }

    handleTabChange(index) {
    this.setState({activeIndex: index});
  }
  render() {
      const tabsTemplate = []
      const panelTemplate = []
      console.log(this.props)
      this.state.tabs.map((tab, index) => {
        console.log(tab,index)
        // tabsTemplate.push(<Tab key={index}>{tab.assetNumber}</Tab>)
        // panelTemplate.push(<Panel key={index}>{tab.gpsid}</Panel>)
    })

      
    return (
      <Tabs customStyle={this.props.customStyle}>
      </Tabs>
    )
  }
}
