import React from 'react';
import Container from '@material-ui/core/Container';
import TabAndPanel from '../tabs/tab';

import TabComponent from '../tabs/tab';
import HeaderAppBar from '../header/header-appbar';



export default function AppContainer(props) {
  // console.log('PROPS INSIDE APPBARContainer COMP:' ,props)

  return (
    <div>
      <HeaderAppBar/>
        <TabComponent data={props.assets}> </TabComponent>
    </div>  
  );
}
