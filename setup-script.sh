sudo yum update
sudo yum install httpd
sudo yum install git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
git clone https://github.com/GabeScott/consultpage.git
cd consultpage/
npm install
npm run-script build
sudo cp build/* /var/www/html/ -r
sudo service httpd restart

CREATE TABLE consults(
	time_created TIMESTAMP PRIMARY KEY NOT NULL default NOW()::TIMESTAMP(0),
	consult_time TEXT,
	consult_type TEXT,
	patient_location TEXT,
	first_name TEXT,
	last_name TEXT,
	date_of_birth DATE,
	gender TEXT,
	facility TEXT,
	referring_provider TEXT,
	call_back_phone TEXT,
	notes TEXT,
	nihss_time TEXT,
	loc TEXT,
	loc_questions TEXT,
	loc_commands TEXT,
	best_gaze TEXT,
	visual TEXT,
	facial_palsy TEXT,
	motor_arm_left TEXT,
	motor_arm_right TEXT,
	motor_leg_left TEXT,
	motor_leg_right TEXT,
	limb_ataxia TEXT,
	sensory TEXT,
	best_language TEXT,
	dysarthria TEXT,
	extinction_inattention TEXT,
	open TEXT
);

INSERT INTO consults (consult_type, patient_location, first_name, last_name, date_of_birth, gender, facility, referring_provider, call_back_phone, camera_name, notes, open) VALUES ('asl1', 'ip', 'Gabe', 'Scott', '04/22/1998', 'm', 'Facility 1', 'Other Provider', '720-840-7465', 'Camera 1', 'Gabe has had history with being cool.', 'true');

INSERT INTO consults (consult_type, patient_location, first_name, last_name, date_of_birth, gender, facility, referring_provider, call_back_phone, camera_name, notes, open) VALUES ('asl1', 'ip', 'Sade', 'Scott', '07/16/1998', 'm', 'Facility 2', 'Other Provider', '720-840-7465', 'Camera 1', 'Gabe has had history with being cool.', 'false');

https://www.quora.com/How-can-I-install-PostgreSQL-on-AWS-EC2-and-how-can-I-access-that