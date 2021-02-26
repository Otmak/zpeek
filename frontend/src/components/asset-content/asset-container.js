import React, {Component} from 'react';
import './asset-content-container.css';
import Path from './path';
import GendataPathdata from './gendata-pathdata.js';
import Gendata from './gendata/gendata';
import Mani from './mani/mani';// Header-for asset info

					// <div className='gendata-container'>
					// 	<Gendata data={id}/>
					// </div>
export default function AssetContainer (props){
		console.log('****************',props)
	const {gpsid, id, account, hashed} = props.data
	return(
		<div className='asset-content-container'>
			<div className='asset-details'>
				<Mani data={{'id':id, 'gps':gpsid,'account': account, 'hashed': hashed}}/>
			</div>
			<div className='big-boys-container'>
				spy
			</div>
		</div>
	)
}
