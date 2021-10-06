import React from 'react';

class DemographicsTab extends React.Component {
	getAge(){
		if(!this.props.consult || !this.props.consult.date_of_birth)
			return '';

		const today = new Date();
		const dob = new Date(this.props.consult.date_of_birth.substring(0,10))
		var age = today.getFullYear() - dob.getFullYear();
		var m = today.getMonth() - dob.getMonth();

		if(m < 0 || (m === 0 && today.getDate() < dob.getDate()))
			age--;

		return age;
	}

	getDate(date){
		var now = date ? new Date(date) : new Date();

  		return ('000'+now.getFullYear()).slice(-4) + '-' + ('0'+(now.getMonth()+1)).slice(-2) + '-' + ('0'+now.getDate()).slice(-2) + 'T'+ ('0'+now.getHours()).slice(-2) + ':' + ('0'+now.getMinutes()).slice(-2);
	}

	render(){
		var now = new Date();
  		now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  		now = now.toISOString().slice(0, 16);
  		
		var classname = this.props.selected ? 'visible' : 'hidden';
		const consult = this.props.consult;
		return (
			<div className={classname + ' margin'}>

				<label htmlFor="consulttime">Time of Consult:&nbsp;&nbsp;&nbsp;</label>
				<input type="datetime-local" id="consulttime" onChange={(e)=>{console.log(e.target.value);this.props.updateConsult({consult_time:e.target.value})}} value={this.getDate(consult.consult_time)}></input>
				<br />
				<h3>Consult Type*</h3>
				<input type="radio" id="asl1" name='contype' value="Acute Stroke Level 1" onChange={(e)=>this.props.updateConsult({consult_type:e.target.value})} checked={consult.consult_type ? consult.consult_type === 'Acute Stroke Level 1' : false}></input>
				<label htmlFor="asl1">Acute Stroke Level 1 (0-4.5 hrs)</label>
				<input type="radio" id="asl2" name='contype' value="Acute Stroke Level 2" onChange={(e)=>this.props.updateConsult({consult_type:e.target.value})} checked={consult.consult_type ? consult.consult_type === 'Acute Stroke Level 2' : false}></input>
				<label htmlFor="asl2">Acute Stroke Level 2 (4.5-24 hrs)</label>
				<input type="radio" id="gn" name='contype' value="General Neurology" onChange={(e)=>this.props.updateConsult({consult_type:e.target.value})} checked={consult.consult_type ? consult.consult_type === 'General Neurology' : false}></input>
				<label htmlFor="gn">General Neurology</label>
				<input type="radio" id="fu" name='contype'value="Follow-Up" onChange={(e)=>this.props.updateConsult({consult_type:e.target.value})} checked={consult.consult_type ? consult.consult_type === 'Follow-Up' : false}></input>
				<label htmlFor="fu">Follow-Up Phone Call</label>

				<h3>Patient Location*</h3>
				<input type="radio" id="er" name='patloc' value="Emergency Room" onChange={(e)=>this.props.updateConsult({patient_location:e.target.value})} checked={consult.patient_location ? consult.patient_location === 'Emergency Room' : false}></input>
				<label htmlFor="er">Emergency Room</label>
				<input type="radio" id="ip" name='patloc' value="Inpatient" onChange={(e)=>this.props.updateConsult({patient_location:e.target.value})} checked={consult.patient_location ? consult.patient_location === 'Inpatient' : false}></input>
				<label htmlFor="ip">Inpatient</label>

				<h3>First Name*</h3>
				<input type='text' onChange={(e)=>this.props.updateConsult({first_name:e.target.value})} value={consult.first_name || ''}></input>

				<h3>Last Name*</h3>
				<input type='text' onChange={(e)=>this.props.updateConsult({last_name:e.target.value})} value={consult.last_name || ''}></input>
				<br/><br/><br/>

				Date of Birth: <input type='date' onChange={(e)=>this.props.updateConsult({date_of_birth:e.target.value})} value={consult.date_of_birth ? consult.date_of_birth.substring(0,10) : ''}></input>
				<br/><br/>
				Age: <input type='text' readOnly value={this.getAge()}></input>

				<h3>Gender</h3>
				<input type="radio" id="m" name='gender' value="Male" onChange={(e)=>this.props.updateConsult({gender:e.target.value})} checked={consult.gender ? consult.gender === 'Male' : false}></input>
				<label htmlFor="m">Male</label>
				<input type="radio" id="f" name='gender' value="Female" onChange={(e)=>this.props.updateConsult({gender:e.target.value})} checked={consult.gender ? consult.gender === 'Female' : false}></input>
				<label htmlFor="f">Female</label>
				<input type="radio" id="nb" name='gender' value="Non-binary" onChange={(e)=>this.props.updateConsult({gender:e.target.value})} checked={consult.gender ? consult.gender === 'Non-binary' : false}></input>
				<label htmlFor="nb">Non-binary</label>

				<br/><br/><br/>
				Facility
				<br/>
				<select name="facility" id="facility" onChange={(e)=>this.props.updateConsult({facility:e.target.value})} value={consult.facility || ''}>
				<option value="">Select an Option</option>
				<option value="Facility1">Facility1</option>
				<option value="Facility2">Facility2</option>
				<option value="Facility3">Facility3</option>
				<option value="Facility4">Facility4</option>
				</select>

				<br/><br/><br/>
				Referring Provider
				<br/>
				<input type='text' onChange={(e)=>this.props.updateConsult({referring_provider:e.target.value})} value={consult.referring_provider || ''}></input>

				<br/><br/><br/>
				Call Back Phone
				<br/>
				<input type='text' onChange={(e)=>this.props.updateConsult({call_back_phone:e.target.value})} value={consult.call_back_phone || ''}></input>

				<br/><br/><br/>
				Notes
				<br/>
				<textarea onChange={(e)=>this.props.updateConsult({notes:e.target.value})} value={consult.notes || ''}></textarea>

				<br/><br/><br/>
				<button onClick={()=>this.props.onSubmitClick(consult)}>Submit</button>
			</div>
		)
	}
}

export default DemographicsTab;
