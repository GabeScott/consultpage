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
	loc TEXT DEFAULT '0',
	loc_questions TEXT DEFAULT '0',
	loc_commands TEXT DEFAULT '0',
	best_gaze TEXT DEFAULT '0',
	visual TEXT DEFAULT '0',
	facial_palsy TEXT DEFAULT '0',
	motor_arm_left TEXT DEFAULT '0',
	motor_arm_right TEXT DEFAULT '0',
	motor_leg_left TEXT DEFAULT '0',
	motor_leg_right TEXT DEFAULT '0',
	limb_ataxia TEXT DEFAULT '0',
	sensory TEXT DEFAULT '0',
	best_language TEXT DEFAULT '0',
	dysarthria TEXT DEFAULT '0',
	extinction_inattention TEXT DEFAULT '0',
	chief_complaint TEXT,
	history TEXT,
	last_known_normal TEXT,
	impression TEXT,
	open TEXT DEFAULT 'true'
);

CREATE TABLE users(
	username TEXT PRIMARY KEY NOT NULL ,
	password_hash TEXT NOT NULL
);

INSERT INTO consults (consult_type, patient_location, first_name, last_name, date_of_birth, gender, facility, referring_provider, call_back_phone, camera_name, notes, open) VALUES ('asl1', 'ip', 'Gabe', 'Scott', '04/22/1998', 'm', 'Facility 1', 'Other Provider', '720-840-7465', 'Camera 1', 'Gabe has had history with being cool.', 'true');

INSERT INTO consults (consult_type, patient_location, first_name, last_name, date_of_birth, gender, facility, referring_provider, call_back_phone, camera_name, notes, open) VALUES ('asl1', 'ip', 'Sade', 'Scott', '07/16/1998', 'm', 'Facility 2', 'Other Provider', '720-840-7465', 'Camera 1', 'Gabe has had history with being cool.', 'false');

https://www.quora.com/How-can-I-install-PostgreSQL-on-AWS-EC2-and-how-can-I-access-that