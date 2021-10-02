import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

const apiUrl = 'http://'+window.location.hostname+'/api';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			newConsult:false,
			displayConsultCard:'mainCard',
			newConsultPageClass:'newConsultPage',
			buttonRowClass:'buttonrow',
			newConsultButtonClass:'newConsultButton',
			consultTypeRadio:'consultTypeRadio',
			searchBarClass:'searchBar',
			newConsultText:'New Consult',
			shownConsultType:'open',
			consults:[],
		}
	}

	getOpenConsults(){
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action: 'getAllOpenConsults' })
		};
		fetch(apiUrl, requestOptions)
			.then(response => response.json())
			.then(data => this.setState({
				consults:data,
				shownConsultType:'open',
			}));

	}

	getAllConsults(){
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action: 'getAllConsults' })
		};
		fetch(apiUrl, requestOptions)
			.then(response => response.json())
			.then(data => this.setState({
				consults:data,
				shownConsultType:'all',
			}));
	}

	async newConsult(){
		const current_time = new Date();
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action: 'createEmptyConsult', time_created:current_time })
		};
		await fetch(apiUrl, requestOptions)
			.then(response => console.log(response));
		

		this.setState({
			newConsult:true,
			displayConsultCard:'mainCard mc-side',
			newConsultPageClass:'newConsultPage ncp-show',
			buttonRowClass:'buttonrow br-side',
			newConsultButtonClass:'newConsultButton nc-side',
			consultTypeRadio:'consultTypeRadio ct-side',
			searchBarClass:'searchBar sb-side',
			newConsultText:'New +',
			time_created:current_time,
			consultToShow:{time_created:current_time},
		})

		this.getOpenConsults();

	}

	openExistingConsult(data){
		this.setState({
			newConsult:true,
			displayConsultCard:'mainCard mc-side',
			newConsultPageClass:'newConsultPage ncp-show',
			buttonRowClass:'buttonrow br-side',
			newConsultButtonClass:'newConsultButton nc-side',
			consultTypeRadio:'consultTypeRadio ct-side',
			searchBarClass:'searchBar sb-side',
			newConsultText:'New +',
		})

		this.setState({
			consultToShow:data,
		})


	}

	exitNewConsult(){
		this.setState({
			newConsult:false,
			displayConsultCard:'mainCard',
			newConsultPageClass:'newConsultPage',
			buttonRowClass:'buttonrow',
			newConsultButtonClass:'newConsultButton',
			consultTypeRadio:'consultTypeRadio',
			searchBarClass:'searchBar',
			newConsultText:'New Consult',
		})
	}


	async updateConsult(data){
		var consult = {};
		for (let [key, prop] of Object.entries(this.state.consultToShow)) {
		  	consult[key] = this.state.consultToShow[key];
		}

		for (let [key, prop] of Object.entries(data)) {
		  	consult[key] = data[key];
		}

		this.setState({
			consultToShow:consult,
		})

		consult.action = 'updateConsult';

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(consult)
		};
		await fetch(apiUrl, requestOptions)
			.then(response => console.log(response));

		this.getOpenConsults();
	}



	render() {
		return (
			<div style={{width:'100%', height:'100%'}}>
				<DisplayConsultCard 
					onClick={()=>this.newConsult()} 
					className={this.state.displayConsultCard}
					newConsult={this.state.newConsult}
					buttonRowClass={this.state.buttonRowClass}
					searchBarClass={this.state.searchBarClass}
					openConsultButtonClass={this.state.openConsultButtonClass}
					newConsultButtonClass={this.state.newConsultButtonClass}
					newConsultText={this.state.newConsultText}
					onClickExistingConsult={(e)=>this.openExistingConsult(e)}
					consultTypeRadio={this.state.consultTypeRadio}	
					onAllClick={()=>this.getAllConsults()}
					onOpenClick={()=>this.getOpenConsults()}	
					consults={this.state.consults}
					shownConsultType={this.state.shownConsultType}
				/>
				<NewConsultCard 
					className={this.state.newConsultPageClass}
					onExit={()=>{this.exitNewConsult(); this.state.shownConsultType === 'open' ? this.getOpenConsults() : this.getAllConsults()}}
					time_created={this.state.time_created}
					consultToShow={this.state.consultToShow}
					updateConsult={(data)=>this.updateConsult(data)}
				/>
			</div>


		);
	}
}

class NewConsultCard extends React.Component{
	render() {
		return(
			<div className={this.props.className}>
				<ConsultPage 
					time_created={this.props.time_created} 
					onExit={this.props.onExit} 
					consultToShow={this.props.consultToShow}
					updateConsult={this.props.updateConsult}
				/>
			</div>
		)
	}
}

class ConsultPage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			facility:'',
			first_name:'',
			last_name:'',
			consultType:'',
			call_back_phone:'',
			referring_provider:'',
			time_created:'',
			patient_location:'',
			date_of_birth:'',
			gende:'',
			camera_name:'',
			notes:'',
			default:false,
		}
	}

	sendRequest(){
		console.log(this.state);
		console.log("Request sent");
	}

	getAge(){
		if(!this.props.consultToShow || !this.props.consultToShow.date_of_birth)
			return '';

		const today = new Date();
		const dob = new Date(this.props.consultToShow.date_of_birth.substring(0,10))
		var age = today.getFullYear() - dob.getFullYear();
		var m = today.getMonth() - dob.getMonth();

		if(m < 0 || (m === 0 && today.getDate() < dob.getDate()))
			age--;

		return age;
	}

	render() {

		var consult = {
				facility:'',
				first_name:'',
				last_name:'',
				consult_type:'',
				call_back_phone:'',
				referring_provider:'',
				time_created:'',
				patient_location:'',
				date_of_birth:'',
				gender:'',
				camera_name:'',
				notes:'',
			};
		if(this.props.consultToShow){
			consult = {
				facility:this.props.consultToShow.facility || '',
				first_name:this.props.consultToShow.first_name || '',
				last_name:this.props.consultToShow.last_name || '',
				consult_type:this.props.consultToShow.consult_type || '',
				call_back_phone:this.props.consultToShow.call_back_phone || '',
				referring_provider:this.props.consultToShow.referring_provider || '',
				time_created:this.props.consultToShow.time_created || '',
				patient_location:this.props.consultToShow.patient_location || '',
				date_of_birth:this.props.consultToShow.date_of_birth || '',
				gender:this.props.consultToShow.gender || '',
				camera_name:this.props.consultToShow.camera_name || '',
				notes:this.props.consultToShow.notes || '',
			}
		}


		return (
			<div>
				<div className='exit' onClick={()=>this.props.onExit()}>X</div>
				<h3>Consult Type*</h3>
				<input type="radio" id="asl1" name='contype' value="asl1" onChange={(e)=>this.props.updateConsult({consult_type:e.target.value})} checked={consult.consult_type === 'asl1'}></input>
				<label htmlFor="asl1">Acute Stroke Level 1 (0-4.5 hrs)</label>
				<input type="radio" id="asl2" name='contype' value="asl2" onChange={(e)=>this.props.updateConsult({consult_type:e.target.value})} checked={consult.consult_type === 'asl2'}></input>
				<label htmlFor="asl2">Acute Stroke Level 2 (4.5-24 hrs)</label>
				<input type="radio" id="gn" name='contype' value="gn" onChange={(e)=>this.props.updateConsult({consult_type:e.target.value})} checked={consult.consult_type === 'gn'}></input>
				<label htmlFor="gn">General Neurology</label>
				<input type="radio" id="fu" name='contype'value="fu" onChange={(e)=>this.props.updateConsult({consult_type:e.target.value})} checked={consult.consult_type === 'fu'}></input>
				<label htmlFor="fu">Follow-Up Phone Call</label>

				<h3>Patient Location*</h3>
				<input type="radio" id="er" name='patloc' value="er" onChange={(e)=>this.props.updateConsult({patient_location:e.target.value})} checked={consult.patient_location === 'er'}></input>
				<label htmlFor="er">Emergency Room</label>
				<input type="radio" id="ip" name='patloc' value="ip" onChange={(e)=>this.props.updateConsult({patient_location:e.target.value})} checked={consult.patient_location === 'ip'}></input>
				<label htmlFor="ip">Inpatient</label>

				<h3>First Name*</h3>
				<input type='text' onChange={(e)=>this.props.updateConsult({first_name:e.target.value})} value={consult.first_name}></input>

				<h3>Last Name*</h3>
				<input type='text' onChange={(e)=>this.props.updateConsult({last_name:e.target.value})} value={consult.last_name}></input>
				<br/><br/><br/>

				Date of Birth: <input type='date' onChange={(e)=>this.props.updateConsult({date_of_birth:e.target.value})} value={consult.date_of_birth.substring(0,10) }></input>
				<br/><br/>
				Age: <input type='text' readOnly value={this.getAge()}></input>

				<h3>Gender</h3>
				<input type="radio" id="m" name='gender' value="m" onChange={(e)=>this.props.updateConsult({gender:e.target.value})} checked={consult.gender === 'm'}></input>
				<label htmlFor="m">Male</label>
				<input type="radio" id="f" name='gender' value="f" onChange={(e)=>this.props.updateConsult({gender:e.target.value})} checked={consult.gender === 'f'}></input>
				<label htmlFor="f">Female</label>
				<input type="radio" id="nb" name='gender' value="nb" onChange={(e)=>this.props.updateConsult({gender:e.target.value})} checked={consult.gender === 'nb'}></input>
				<label htmlFor="nb">Non-binary</label>

				<br/><br/><br/>
				Facility
				<br/>
				<select name="facility" id="facility" onChange={(e)=>this.props.updateConsult({facility:e.target.value})} value={consult.facility}>
				<option value="Facility1">Facility1</option>
				<option value="Facility2">Facility2</option>
				<option value="Facility3">Facility3</option>
				<option value="Facility4">Facility4</option>
				</select>

				<br/><br/><br/>
				Referring Provider
				<br/>
				<input type='text' onChange={(e)=>this.props.updateConsult({referring_provider:e.target.value})} value={consult.referring_provider}></input>

				<br/><br/><br/>
				Call Back Phone
				<br/>
				<input type='text' onChange={(e)=>this.props.updateConsult({call_back_phone:e.target.value})} value={consult.call_back_phone}></input>

				<br/><br/><br/>
				Camera Name
				<br/>
				<input type='text' onChange={(e)=>this.props.updateConsult({camera_name:e.target.value})} value={consult.camera_name}></input>

				<br/><br/><br/>
				Notes
				<br/>
				<textarea onChange={(e)=>this.props.updateConsult({notes:e.target.value})} value={consult.notes}></textarea>

				<br/><br/><br/>
				<button onClick={()=>this.sendRequest()}>Submit</button>


			</div>
		)
	}
}

class DisplayConsultCard extends React.Component {



	constructor(props){
		super(props);

		this.state = {
			consults:[],
			heading:['Facility', 'First Name', 'Last Name', 'Type', 'Phone', 'Provider', 'Created On'],
		};
	}

	render() {
		
		return (
			<div className={this.props.className}>
				<ButtonRow 
					onAllClick={()=>this.props.onAllClick()} 
					onOpenClick={()=>this.props.onOpenClick()} 
					newConsult={()=>{this.setState({newConsult:true}); this.props.onOpenClick(); this.props.onClick();}}
					buttonRowClass={this.props.buttonRowClass}
					searchBarClass={this.props.searchBarClass}
					openConsultButtonClass={this.props.openConsultButtonClass}
					newConsultButtonClass={this.props.newConsultButtonClass}
					newConsultText={this.props.newConsultText}	
					consultTypeRadio={this.props.consultTypeRadio}	
					shownConsultType={this.props.shownConsultType}			
				/>

				<Table 
					heading={this.props.newConsult ? this.state.heading.slice(0,1) : this.state.heading} 
					consults={this.props.consults} 
					newConsult={this.props.newConsult}
					onClickExistingConsult={(e)=>{this.props.onOpenClick(); this.props.onClickExistingConsult(e);}}
				/>
			</div>
		);
	}
}

class ButtonRow extends React.Component {

	constructor(props){
		super(props);
		props.onOpenClick();
	}

	render() {

		return(
			<div className={this.props.buttonRowClass}>
				<input type='text' className={this.props.searchBarClass} placeholder='Search'></input>
				<div>
					<button className={this.props.newConsultButtonClass} onClick={()=>this.props.newConsult()}>{this.props.newConsultText}</button>
					<span className='expander'></span>
					<div className={this.props.consultTypeRadio} style={{float:'right'}}>
						<input type="radio" id="open" name='consultType' value="open" onChange={()=>{this.props.onOpenClick(); this.setState({checked:'open'})}} checked={this.props.shownConsultType === 'open'}></input>
						<label htmlFor="open">Show Open Consults</label><br />
						<input type="radio" id="all" name='consultType' value="all" onChange={()=>{this.props.onAllClick(); this.setState({checked:'all'})}} checked={this.props.shownConsultType === 'all'}></input>
						<label htmlFor="all">Show All Consults</label>
					</div>
				</div>
			</div>
		);
	}
}

class OpenConsults extends React.Component {
	render() {
		var index = 1;
		return (
				this.props.consults.map((data) => 
					<ConsultRow 
						data={data} 
						key={Math.random()}
						onClick={this.props.onClickExistingConsult}
						newConsult={this.props.newConsult}
						index={index++}
					/>									
				)
		);
	}
}

class ConsultRow extends React.Component{
	constructor(props){
		super(props);

		this.state={
			data:this.props.data,
		}
	}
	render(){
		const length = this.props.newConsult ? 1 : 7;
		return (
			<tr 
				key={this.state.data} 
				className={this.props.index % 2 == 0 ? 'tr-even' : 'tr-odd'}
				onClick={()=>{this.state.data.open === 'true' ? this.props.onClick(this.state.data) : console.log('Cannot open closed consult.')}}>
				{Object.keys(this.state.data).slice(0, length).map(
					(key) => 
						<td 
							key={Math.random()}
						>
						{(key === 'time_created') ? this.state.data[key].substring(0,10) : this.state.data[key] || '-'}
						</td>)}
			</tr>
		)
	}
}

class Table extends React.Component {
	render(){
		const heading = this.props.heading;
		return (
			<table>
				<thead>
					<tr key='head'>
						{heading.map(head => <th key={head}>{head}</th>)}
					</tr>
				</thead>
				<tbody>
					<OpenConsults 
						consults={this.props.consults} 
						newConsult={this.props.newConsult}
						onClickExistingConsult={this.props.onClickExistingConsult}
					/>
				</tbody>
			</table>
		);
	}
}

ReactDom.render(
	<App />,
	document.getElementById("root")
);
