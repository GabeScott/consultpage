import React from 'react';
import ReactDom from 'react-dom';
import './index.css';


class App extends React.Component {
	render() {
		const heading = ['Facility', 'First Name', 'Last Name', 'Type', 'Phone', 'Provider', 'Created At'];
		return (
			<MainCard heading={heading}/>
		);
	}
}

class MainCard extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			consults:getOpenConsults(),
			ConClick:()=>this.showAllConsults(),
			showText:'Show All Consults',
		};
	}

	showAllConsults() {
		this.setState({
			consults:getAllConsults(),
			ConClick:()=>this.showOpenConsults(),
			showText:'Show Open Consults',
		});
	}

	showOpenConsults() {
		this.setState({
			consults:getOpenConsults(),
			ConClick:()=>this.showAllConsults(),
			showText:'Show All Consults',
		});
	}

	render() {
		
		return (
			<div className='mainCard'>
				<ButtonRow allConClick={this.state.ConClick} showText={this.state.showText} />
				<Table heading={this.props.heading} consults={this.state.consults} />
			</div>
		);
	}
}

class ButtonRow extends React.Component {
	render() {
		return(
			<div className="testdiv">
				<input type='text' className='searchBar' placeholder='Search'></input>
				<div>
					<button className='newConsultButton'>New Consult</button>
					<span className='expander'></span>
					<button className='newConsultButton' onClick={this.props.allConClick}>{this.props.showText}</button>
				</div>
			</div>
		);
	}
}

class OpenConsults extends React.Component {
	render() {
		return (
				this.props.consults.map((index) => 
					<ConsultRow data={index} key={index}/>									
				)
		);
	}
}

class ConsultRow extends React.Component{
	render(){
		return (
			<tr key={this.props.data}>
				{this.props.data.map((val) => <td key={val}>{val}</td>)}
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
					<OpenConsults consults={this.props.consults} />
				</tbody>
			</table>
		);
	}
}

function getOpenConsults(){
	return [
			[
				'Facility1',
				'Gabe',
				'Scott',
				'Stroke',
				'1234567890',
				'Jon Scott',
				'9/24/21'	
			 ]
			];
}

function getAllConsults(){
	return [
		[
			'Facility1',
			'Gabe',
			'Scott',
			'Stroke',
			'1234567890',
			'Jon Scott',
			'9/21/21'	
		 ],
		 [
			'Facility1',
			'Gabe',
			'Scott',
			'Stroke',
			'1234567890',
			'Jon Scott',
			'9/23/21'	
		 ],
		 [
			'Facility1',
			'Gabe',
			'Scott',
			'Stroke',
			'1234567890',
			'Jon Scott',
			'9/20/21'	
		 ],
		 [
			'Facility1',
			'Gabe',
			'Scott',
			'Stroke',
			'1234567890',
			'Jon Scott',
			'9/84/21'	
		 ]
		];
}

ReactDom.render(
	<App />,
	document.getElementById("root")
);
