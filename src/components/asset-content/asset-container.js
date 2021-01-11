import React, {Component} from 'react';
import Path from './path';
import gendata from './gendata';


class AssetContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			data : this.props

		}
	}

	render(){
		console.log(this)
		return(
			<div>
				 hello from the other sides
			</div>
			)
	}
}


export default AssetContainer