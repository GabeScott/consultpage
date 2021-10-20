import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import DemographicsTab from './DemographicsTab.jsx'
import ScoresTab from './ScoresTab.jsx'
import HPITab from './HPITab.jsx'
import AssessmentTab from './AssessmentTab.jsx'

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
			error:false,
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
			.then(
				(result) =>{
					console.log(result)
					this.setState({
						consults:result,
						shownConsultType:'open',
						error:false,
					})
				},

				(error) => {
					if(!this.state.error)
						window.alert("ERROR: Unable to retrieve consults from database.");
					this.setState({
						error:true,
					})
				});


	}

	getAllConsults(){

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action: 'getAllConsults' })
		};
		fetch(apiUrl, requestOptions)
			.then(response => response.json())
			.then(
				(result) =>{
					this.setState({
						consults:result,
						shownConsultType:'all',
						error:false,
					})
				},

				(error) => {
					if(!this.state.error)
						window.alert("ERROR: Unable to retrieve consults from database.");
					this.setState({
						error:true,
					})
				});
	}

	async newConsult(){
		const current_time = new Date();
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action: 'createEmptyConsult', time_created:current_time })
		};
		await fetch(apiUrl, requestOptions)
			.then(response => response.json())
			.then(
				(result) => {
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
						consultToShow:result,
						error:false,
					})
					this.getOpenConsults();
				},

				(error) => {
					if(!this.state.error)
						window.alert("ERROR: Unable to create consult in database.");
						console.log(error)
					this.setState({
						error:true,
					})
				});
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
		for (let [key] of Object.entries(this.state.consultToShow)) {
		  	consult[key] = this.state.consultToShow[key];
		}

		for (let [key] of Object.entries(data)) {
		  	consult[key] = data[key];
		}

		consult.action = 'updateConsult';

		this.setState({
			consultToShow:consult,
		})

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(consult)
		};


		await fetch(apiUrl, requestOptions)
			.then(
				(result) =>{
					console.log(result);
					this.setState({
						error:false,
						lastUpdatedConsult:consult,
					})

				},

				(error) => {
					if(!this.state.error){
						window.alert("ERROR: Unable to update consult in database");
					}
					this.setState({
						consultToShow:this.state.lastUpdatedConsult,
						error:true,
					})
				});

		this.getOpenConsults();
	}


	async closeConsult(data){
		const previousData = this.state.consultToShow;

		if(!window.confirm("Are you sure you want to close this consult? This cannot be undone."))
			return;

		var consult = {};
		for (let [key] of Object.entries(this.state.consultToShow)) {
		  	consult[key] = this.state.consultToShow[key];
		}

		for (let [key] of Object.entries(data)) {
		  	consult[key] = data[key];
		}

		consult.action = 'closeConsult';

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(consult)
		};
		await fetch(apiUrl, requestOptions)
			.then(
				(result) =>{
					console.log(result);
					this.setState({
						consultToShow:consult,
						error:false
					})
					this.getOpenConsults();
					this.exitNewConsult();
				},

				(error) => {
					if(!this.state.error)
						window.alert("ERROR: Unable to close consult in database");
					this.setState({
						consultToShow:previousData,
						error:true
					})
				});
	}



	render() {
		return (
			<>
			<title>Consult Webpage</title>
			<a href='/logout' style={{'float':'right', 'margin-right':'20px'}}>Logout</a>
			<br/><br/>
			<div style={{width:'100%', height:'100%'}}>
			<div>{this.state.error ? "ERROR" : ""}</div>
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
					onSubmitClick={(data)=>this.closeConsult(data)}
				/>
			</div>
			</>


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
					onSubmitClick={this.props.onSubmitClick}
				/>
			</div>
		)
	}
}

class ConsultPage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			default:false,
			selected:'demo',
		}
	}

	render() {
  		var consult;
  		if(!this.props.consultToShow)
  			consult = {};
  		else
  			consult = {...this.props.consultToShow};

		return (
			<div>
				<div className="tab">
					<button className={this.state.selected === 'demo' ? 'active' : ''} onClick={()=>this.setState({selected:'demo'})}>Demographics</button>
					<button className={this.state.selected === 'hpi' ? 'active' : ''} onClick={()=>this.setState({selected:'hpi'})}>HPI</button>
					<button className={this.state.selected === 'scores' ? 'active' : ''} onClick={()=>this.setState({selected:'scores'})}>NIHSS</button>
					<button className={this.state.selected === 'assess' ? 'active' : ''} onClick={()=>this.setState({selected:'assess'})}>Assessment</button>
					<div className='exit' onClick={()=>{this.setState({selected:'demo'}); this.props.onExit()}}>X</div>
				</div>

				<DemographicsTab 
					consult={consult}
					updateConsult={this.props.updateConsult}
					onSubmitClick={this.props.onSubmitClick}
					selected={this.state.selected === 'demo'}
				/>

				<HPITab 
					consult={consult}
					updateConsult={this.props.updateConsult}
					onSubmitClick={this.props.onSubmitClick}
					selected={this.state.selected === 'hpi'}
				/>

				<ScoresTab 
					consult={consult}
					updateConsult={this.props.updateConsult}
					onSubmitClick={this.props.onSubmitClick}
					selected={this.state.selected === 'scores'}
				/>	

				<AssessmentTab 
					consult={consult}
					updateConsult={this.props.updateConsult}
					onSubmitClick={this.props.onSubmitClick}
					selected={this.state.selected === 'assess'}
				/>			
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
			headingKeys:['facility', 'first_name', 'last_name', 'consult_type', 'call_back_phone', 'referring_provider', 'time_created'],
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
					headingKeys={this.state.headingKeys}
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
						headingKeys={this.props.headingKeys}
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
				className={this.props.index % 2 === 0 ? 'tr-even' : 'tr-odd'}
				onClick={()=>{this.state.data.open === 'true' ? this.props.onClick(this.state.data) : window.alert('Cannot open closed consult.')}}>
				{this.props.headingKeys.slice(0, length).map(
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
						headingKeys={this.props.headingKeys}
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
