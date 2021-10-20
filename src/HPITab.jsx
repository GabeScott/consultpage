import React from 'react';

class HPITab extends React.Component {
	getDate(date){
		var now = date ? new Date(date) : new Date();

  		return ('000'+now.getFullYear()).slice(-4) + '-' + ('0'+(now.getMonth()+1)).slice(-2) + '-' + ('0'+now.getDate()).slice(-2) + 'T'+ ('0'+now.getHours()).slice(-2) + ':' + ('0'+now.getMinutes()).slice(-2);
	}

	render(){
		var classname = this.props.selected ? 'visible' : 'hidden';
		const consult = this.props.consult;

		return (
			<div className={'margin '+classname}>

				<span style={{'fontSize':'large'}}>Chief Complaint</span>
				<br/><br/>
				<textarea className='hpi-ta' onChange={(e)=>this.props.updateConsult({chief_complaint:e.target.value})} value={consult.chief_complaint || ''}></textarea>
				<br/><br/><br/><br/>

				<span style={{'fontSize':'large'}}>History</span>
				<br/><br/>
				<textarea className='hpi-ta' onChange={(e)=>this.props.updateConsult({history:e.target.value})} value={consult.history || ''}></textarea>
				<br/><br/><br/><br/>

				<span style={{'fontSize':'large'}}>Last Known Normal</span>
				<br/><br/>
				<textarea className='hpi-ta' onChange={(e)=>this.props.updateConsult({last_known_normal:e.target.value})} value={consult.last_known_normal || ''}></textarea>

			</div>
		)
	}
}

export default HPITab;
