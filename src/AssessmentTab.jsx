import React from 'react';

class AssessmentTab extends React.Component {
	render(){
		var classname = this.props.selected ? 'visible' : 'hidden';
		const consult = this.props.consult;

		return (
			<div className={'margin '+classname}>

				<span style={{'fontSize':'large'}}>Impression</span>
				<br/><br/>
				<textarea className='assess-ta' onChange={(e)=>this.props.updateConsult({impression:e.target.value})} value={consult.impression || ''}></textarea>
				<br/><br/><br/><br/>


			</div>
		)
	}
}

export default AssessmentTab;
