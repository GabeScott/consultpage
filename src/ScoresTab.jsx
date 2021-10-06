import React from 'react';

class ScoresTab extends React.Component {
	getDate(date){
		var now = date ? new Date(date) : new Date();

  		return ('000'+now.getFullYear()).slice(-4) + '-' + ('0'+(now.getMonth()+1)).slice(-2) + '-' + ('0'+now.getDate()).slice(-2) + 'T'+ ('0'+now.getHours()).slice(-2) + ':' + ('0'+now.getMinutes()).slice(-2);
	}

	render(){
		var classname = this.props.selected ? 'visible' : 'hidden';
		const consult = this.props.consult;

		return (
			<div className={'margin '+classname}>
				<label htmlFor="nihsstime">Time of exam and NIHSS:&nbsp;&nbsp;&nbsp;</label>
				<input type="datetime-local" id="nihsstime" onChange={(e)=>this.props.updateConsult({nihss_time:e.target.value})} 
					value={this.getDate(consult.nihss_time)}></input>
				<br /><br />


				<span style={{fontSize:'large'}}>Level of Consciousness</span>
				<br />
				<input type="radio" id="loc0" name='loc' value="0" onChange={(e)=>this.props.updateConsult({loc:e.target.value})} checked={consult.loc === '0'}></input>
				<label htmlFor="loc0">0 = Alert</label>
				<input type="radio" id="loc1" name='loc' value="1" onChange={(e)=>this.props.updateConsult({loc:e.target.value})} checked={consult.loc === '1'}></input>
				<label htmlFor="loc1">1 = Not alert; arousable</label>
				<input type="radio" id="loc2" name='loc' value="2" onChange={(e)=>this.props.updateConsult({loc:e.target.value})} checked={consult.loc === '2'}></input>
				<label htmlFor="loc2">2 = Not alert; hard to arouse</label>
				<input type="radio" id="loc3" name='loc' value="3" onChange={(e)=>this.props.updateConsult({loc:e.target.value})} checked={consult.loc === '3'}></input>
				<label htmlFor="loc3">3 = Unresponsive</label>
				<br /><br />


				<span style={{fontSize:'large'}}>LOC Questions</span>
				<br />
				<input type="radio" id="locq0" name='locq' value="0" onChange={(e)=>this.props.updateConsult({loc_questions:e.target.value})} checked={consult.loc_questions === '0'}></input>
				<label htmlFor="locq0">0 = Answers both questions correctly</label>
				<input type="radio" id="locq1" name='locq' value="1" onChange={(e)=>this.props.updateConsult({loc_questions:e.target.value})} checked={consult.loc_questions === '1'}></input>
				<label htmlFor="locq1">1 = Answers one correctly</label>
				<input type="radio" id="locq2" name='locq' value="2" onChange={(e)=>this.props.updateConsult({loc_questions:e.target.value})} checked={consult.loc_questions === '2'}></input>
				<label htmlFor="locq2">2 = Answers both correctly</label>
				<br /><br />


				<span style={{fontSize:'large'}}>LOC Commands</span>
				<br />
				<input type="radio" id="locc0" name='locc' value="0" onChange={(e)=>this.props.updateConsult({loc_commands:e.target.value})} checked={consult.loc_commands === '0'}></input>
				<label htmlFor="locc0">0 = Peforms both tasks correctly</label>
				<input type="radio" id="locc1" name='locc' value="1" onChange={(e)=>this.props.updateConsult({loc_commands:e.target.value})} checked={consult.loc_commands === '1'}></input>
				<label htmlFor="locc1">1 = Performs one task correctly</label>
				<input type="radio" id="locc2" name='locc' value="2" onChange={(e)=>this.props.updateConsult({loc_commands:e.target.value})} checked={consult.loc_commands === '2'}></input>
				<label htmlFor="locc2">2 = Performs both tasks correctly</label>
				<br /><br />

				<span style={{fontSize:'large'}}>Best Gaze</span>
				<br />
				<input type="radio" id="bg0" name='bg' value="0" onChange={(e)=>this.props.updateConsult({best_gaze:e.target.value})} checked={consult.best_gaze === '0'}></input>
				<label htmlFor="bg0">0 = Normal</label>
				<input type="radio" id="bg1" name='bg' value="1" onChange={(e)=>this.props.updateConsult({best_gaze:e.target.value})} checked={consult.best_gaze === '1'}></input>
				<label htmlFor="bg1">1 = Partial gaze palsy</label>
				<input type="radio" id="bg2" name='bg' value="2" onChange={(e)=>this.props.updateConsult({best_gaze:e.target.value})} checked={consult.best_gaze === '2'}></input>
				<label htmlFor="bg2">2 = Forced deviation</label>
				<br /><br />

				<span style={{fontSize:'large'}}>Visual</span>
				<br />
				<input type="radio" id="vis0" name='vis' value="0" onChange={(e)=>this.props.updateConsult({visual:e.target.value})} checked={consult.visual === '0'}></input>
				<label htmlFor="vis0">0 = No visual loss</label>
				<input type="radio" id="vis1" name='vis' value="1" onChange={(e)=>this.props.updateConsult({visual:e.target.value})} checked={consult.visual === '1'}></input>
				<label htmlFor="vis1">1 = Partial hemianopia</label>
				<input type="radio" id="vis2" name='vis' value="2" onChange={(e)=>this.props.updateConsult({visual:e.target.value})} checked={consult.visual === '2'}></input>
				<label htmlFor="vis2">2 = Complete hemianopia</label>
				<input type="radio" id="vis3" name='vis' value="3" onChange={(e)=>this.props.updateConsult({visual:e.target.value})} checked={consult.visual === '3'}></input>
				<label htmlFor="vis3">3 = Bilateral hemianopia</label>
				<br /><br />			

				<span style={{fontSize:'large'}}>Facial Palsy</span>
				<br />
				<input type="radio" id="fp0" name='fp' value="0" onChange={(e)=>this.props.updateConsult({facial_palsy:e.target.value})} checked={consult.facial_palsy === '0'}></input>
				<label htmlFor="fp0">0 = Normal symmetrical movements</label>
				<input type="radio" id="fp1" name='fp' value="1" onChange={(e)=>this.props.updateConsult({facial_palsy:e.target.value})} checked={consult.facial_palsy === '1'}></input>
				<label htmlFor="fp1">1 = Minor paralysis</label>
				<input type="radio" id="fp2" name='fp' value="2" onChange={(e)=>this.props.updateConsult({facial_palsy:e.target.value})} checked={consult.facial_palsy === '2'}></input>
				<label htmlFor="fp2">2 = Partial paralysis</label>
				<input type="radio" id="fp3" name='fp' value="3" onChange={(e)=>this.props.updateConsult({facial_palsy:e.target.value})} checked={consult.facial_palsy === '3'}></input>
				<label htmlFor="fp3">3 = Complete paralysis</label>
				<br /><br />		

				<span style={{fontSize:'large'}}>Motor Arm Left</span>
				<br />
				<input type="radio" id="mal0" name='mal' value="0" onChange={(e)=>this.props.updateConsult({motor_arm_left:e.target.value})} checked={consult.motor_arm_left === '0'}></input>
				<label htmlFor="mal0">0 = No drift</label>
				<input type="radio" id="mal1" name='mal' value="1" onChange={(e)=>this.props.updateConsult({motor_arm_left:e.target.value})} checked={consult.motor_arm_left === '1'}></input>
				<label htmlFor="mal1">1 = Drift</label>
				<input type="radio" id="mal2" name='mal' value="2" onChange={(e)=>this.props.updateConsult({motor_arm_left:e.target.value})} checked={consult.motor_arm_left === '2'}></input>
				<label htmlFor="mal2">2 = Some effort against gravity</label>
				<input type="radio" id="mal3" name='mal' value="3" onChange={(e)=>this.props.updateConsult({motor_arm_left:e.target.value})} checked={consult.motor_arm_left === '3'}></input>
				<label htmlFor="mal3">3 = No effort against gravity</label>
				<input type="radio" id="mal2" name='mal' value="4" onChange={(e)=>this.props.updateConsult({motor_arm_left:e.target.value})} checked={consult.motor_arm_left === '4'}></input>
				<label htmlFor="mal4">4 = No movement</label>
				<input type="radio" id="mal3" name='mal' value="UN" onChange={(e)=>this.props.updateConsult({motor_arm_left:e.target.value})} checked={consult.motor_arm_left === 'UN'}></input>
				<label htmlFor="mal5">UN = Amputation or joint fusion</label>				
				<br /><br />

				<span style={{fontSize:'large'}}>Motor Arm Right</span>
				<br />
				<input type="radio" id="mar0" name='mar' value="0" onChange={(e)=>this.props.updateConsult({motor_arm_right:e.target.value})}checked={consult.motor_arm_right === '0'}></input>
				<label htmlFor="mar0">0 = No drift</label>
				<input type="radio" id="mar1" name='mar' value="1" onChange={(e)=>this.props.updateConsult({motor_arm_right:e.target.value})}checked={consult.motor_arm_right === '1'}></input>
				<label htmlFor="mar1">1 = Drift</label>
				<input type="radio" id="mar2" name='mar' value="2" onChange={(e)=>this.props.updateConsult({motor_arm_right:e.target.value})}checked={consult.motor_arm_right === '2'}></input>
				<label htmlFor="mar2">2 = Some effort against gravity</label>
				<input type="radio" id="mar3" name='mar' value="3" onChange={(e)=>this.props.updateConsult({motor_arm_right:e.target.value})}checked={consult.motor_arm_right === '3'}></input>
				<label htmlFor="mar3">3 = No effort against gravity</label>
				<input type="radio" id="mar4" name='mar' value="4" onChange={(e)=>this.props.updateConsult({motor_arm_right:e.target.value})}checked={consult.motor_arm_right === '4'}></input>
				<label htmlFor="mar4">4 = No movement</label>
				<input type="radio" id="mar5" name='mar' value="UN" onChange={(e)=>this.props.updateConsult({motor_arm_right:e.target.value})}checked={consult.motor_arm_right === 'UN'}></input>
				<label htmlFor="mar5">UN = Amputation or joint fusion</label>				
				<br /><br />	

				<span style={{fontSize:'large'}}>Motor Leg Left</span>
				<br />
				<input type="radio" id="mll0" name='mll' value="0" onChange={(e)=>this.props.updateConsult({motor_leg_left:e.target.value})}checked={consult.motor_leg_left === '0'}></input>
				<label htmlFor="mll0">0 = No drift</label>
				<input type="radio" id="mll1" name='mll' value="1" onChange={(e)=>this.props.updateConsult({motor_leg_left:e.target.value})}checked={consult.motor_leg_left === '1'}></input>
				<label htmlFor="mll1">1 = Drift</label>
				<input type="radio" id="mll2" name='mll' value="2" onChange={(e)=>this.props.updateConsult({motor_leg_left:e.target.value})}checked={consult.motor_leg_left === '2'}></input>
				<label htmlFor="mll2">2 = Some effort against gravity</label>
				<input type="radio" id="mll3" name='mll' value="3" onChange={(e)=>this.props.updateConsult({motor_leg_left:e.target.value})}checked={consult.motor_leg_left === '3'}></input>
				<label htmlFor="mll3">3 = No effort against gravity</label>
				<input type="radio" id="mll4" name='mll' value="4" onChange={(e)=>this.props.updateConsult({motor_leg_left:e.target.value})}checked={consult.motor_leg_left === '4'}></input>
				<label htmlFor="mll4">4 = No movement</label>
				<input type="radio" id="mll5" name='mll' value="UN" onChange={(e)=>this.props.updateConsult({motor_leg_left:e.target.value})}checked={consult.motor_leg_left === 'UN'}></input>
				<label htmlFor="mll5">UN = Amputation or joint fusion</label>				
				<br /><br />	

				<span style={{fontSize:'large'}}>Motor Leg Right</span>
				<br />
				<input type="radio" id="mlr0" name='mlr' value="0" onChange={(e)=>this.props.updateConsult({motor_leg_right:e.target.value})} checked={consult.motor_leg_right === '0'}></input>
				<label htmlFor="mlr0">0 = No drift</label>
				<input type="radio" id="mlr1" name='mlr' value="1" onChange={(e)=>this.props.updateConsult({motor_leg_right:e.target.value})} checked={consult.motor_leg_right === '1'}></input>
				<label htmlFor="mlr1">1 = Drift</label>
				<input type="radio" id="mlr2" name='mlr' value="2" onChange={(e)=>this.props.updateConsult({motor_leg_right:e.target.value})} checked={consult.motor_leg_right === '2'}></input>
				<label htmlFor="mlr2">2 = Some effort against gravity</label>
				<input type="radio" id="mlr3" name='mlr' value="3" onChange={(e)=>this.props.updateConsult({motor_leg_right:e.target.value})} checked={consult.motor_leg_right === '3'}></input>
				<label htmlFor="mlr3">3 = No effort against gravity</label>
				<input type="radio" id="mlr4" name='mlr' value="4" onChange={(e)=>this.props.updateConsult({motor_leg_right:e.target.value})} checked={consult.motor_leg_right === '4'}></input>
				<label htmlFor="mlr4">4 = No movement</label>
				<input type="radio" id="mlr5" name='mlr' value="UN" onChange={(e)=>this.props.updateConsult({motor_leg_right:e.target.value})} checked={consult.motor_leg_right === 'UN'}></input>
				<label htmlFor="mlr5">UN = Amputation or joint fusion</label>				
				<br /><br />

				<span style={{fontSize:'large'}}>Limb Ataxia</span>
				<br />
				<input type="radio" id="la0" name='la' value="0" onChange={(e)=>this.props.updateConsult({limb_ataxia:e.target.value})} checked={consult.limb_ataxia === '0'}></input>
				<label htmlFor="la0">0 = Absent</label>
				<input type="radio" id="la1" name='la' value="1" onChange={(e)=>this.props.updateConsult({limb_ataxia:e.target.value})} checked={consult.limb_ataxia === '1'}></input>
				<label htmlFor="la1">1 = Present in one limb</label>
				<input type="radio" id="la2" name='la' value="2" onChange={(e)=>this.props.updateConsult({limb_ataxia:e.target.value})} checked={consult.limb_ataxia === '2'}></input>
				<label htmlFor="la2">2 = Present in two limbs</label>
				<input type="radio" id="la3" name='la' value="UN" onChange={(e)=>this.props.updateConsult({limb_ataxia:e.target.value})} checked={consult.limb_ataxia === 'UN'}></input>
				<label htmlFor="la3">UN = Amputation or joint fusion</label>				
				<br /><br />		

				<span style={{fontSize:'large'}}>Sensory</span>
				<br />
				<input type="radio" id="se0" name='se' value="0" onChange={(e)=>this.props.updateConsult({sensory:e.target.value})} checked={consult.sensory === '0'}></input>
				<label htmlFor="se0">0 = Normal</label>
				<input type="radio" id="se1" name='se' value="1" onChange={(e)=>this.props.updateConsult({sensory:e.target.value})} checked={consult.sensory === '1'}></input>
				<label htmlFor="se1">1 = Mild-to-moderate sensory loss</label>
				<input type="radio" id="se2" name='se' value="2" onChange={(e)=>this.props.updateConsult({sensory:e.target.value})} checked={consult.sensory === '2'}></input>
				<label htmlFor="se2">2 = Severe to total sensory loss</label>				
				<br /><br />

				<span style={{fontSize:'large'}}>Best Langauge</span>
				<br />
				<input type="radio" id="bl0" name='bl' value="0" onChange={(e)=>this.props.updateConsult({best_language:e.target.value})} checked={consult.best_language === '0'}></input>
				<label htmlFor="bl0">0 = No aphasia</label>
				<input type="radio" id="bl1" name='bl' value="1" onChange={(e)=>this.props.updateConsult({best_language:e.target.value})} checked={consult.best_language === '1'}></input>
				<label htmlFor="bl1">1 = Mild-to-moderate aphasia</label>
				<input type="radio" id="bl2" name='bl' value="2" onChange={(e)=>this.props.updateConsult({best_language:e.target.value})} checked={consult.best_language === '2'}></input>
				<label htmlFor="bl2">2 = Severe aphasia</label>				
				<br /><br />	

				<span style={{fontSize:'large'}}>Dysarthria</span>
				<br />
				<input type="radio" id="dy0" name='dy' value="0" onChange={(e)=>this.props.updateConsult({dysarthria:e.target.value})} checked={consult.dysarthria === '0'}></input>
				<label htmlFor="dy0">0 = Normal</label>
				<input type="radio" id="dy1" name='dy' value="1" onChange={(e)=>this.props.updateConsult({dysarthria:e.target.value})} checked={consult.dysarthria === '1'}></input>
				<label htmlFor="dy1">1 = Mild-to-moderate dysarthria</label>
				<input type="radio" id="dy2" name='dy' value="2" onChange={(e)=>this.props.updateConsult({dysarthria:e.target.value})} checked={consult.dysarthria === '2'}></input>
				<label htmlFor="dy2">2 = Severe dysarthria</label>	
				<input type="radio" id="dy3" name='dy' value="UN" onChange={(e)=>this.props.updateConsult({dysarthria:e.target.value})} checked={consult.dysarthria === 'UN'}></input>
				<label htmlFor="dy3">UN = Intubated or other physical barrier</label>								
				<br /><br />		

				<span style={{fontSize:'large'}}>Extinction and Inattention</span>
				<br />
				<input type="radio" id="ei0" name='ei' value="0" onChange={(e)=>this.props.updateConsult({extinction_inattention:e.target.value})} checked={consult.extinction_inattention === '0'}></input>
				<label htmlFor="ei0">0 = No abnormality</label>
				<input type="radio" id="ei1" name='ei' value="1" onChange={(e)=>this.props.updateConsult({extinction_inattention:e.target.value})} checked={consult.extinction_inattention === '1'}></input>
				<label htmlFor="ei1">1 = Visual, tactile, auditory, spatial, or personal inattention</label>
				<input type="radio" id="ei2" name='ei' value="2" onChange={(e)=>this.props.updateConsult({extinction_inattention:e.target.value})} checked={consult.extinction_inattention === '2'}></input>
				<label htmlFor="ei2">2 = Profound hemi-inattention or extinction to more than one modality</label>				
				<br /><br />

				<label htmlFor="nihsstotal">NIHSS Total:&nbsp;&nbsp;&nbsp;</label>
				<input type="text" id="nihsstotal" onChange={(e)=>this.props.updateConsult({nihss_time:e.target.value})} readOnly></input>
				
			</div>
		)
	}
}

export default ScoresTab;
