import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import './tab-skeleton.css';

export default function TabSkeleton(props){

	const style = {

	}
	return (
		<div className='sk-assetlist-main'>
			<Skeleton className='sk-circle' animation="wave" variant="circle" width={40} height={40} />
			<div className="sk-2-text">
				<Skeleton animation="wave" height={10} width="80%" />
				<Skeleton animation="wave" height={10} width="40%" />
			</div>
		</div>
		)
}