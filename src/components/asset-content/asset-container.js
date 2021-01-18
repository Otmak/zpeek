import React, {Component} from 'react';
import Path from './path';
import Gendata from './gendata/gendata';


class AssetContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			data : this.props

		}
	}

	render(){
		// console.log(this)
		const {gpsid, id} = this.state.data.assetData
		return(
			<div className='path-container'>
				 <Path data={id}/>
							</div>
			)
	}
}


export default AssetContainer