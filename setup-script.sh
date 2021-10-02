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
	consult_type text,
	patient_location text,
	first_name text,
	last_name text,
	date_of_birth date,
	gender text,
	facility text,
	referring_provider text,
	call_back_phone text,
	camera_name text,
	notes text,
	open text
);

INSERT INTO consults (consult_type, patient_location, first_name, last_name, date_of_birth, gender, facility, referring_provider, call_back_phone, camera_name, notes, open) VALUES ('asl1', 'ip', 'Gabe', 'Scott', '04/22/1998', 'm', 'Facility 1', 'Other Provider', '720-840-7465', 'Camera 1', 'Gabe has had history with being cool.', 'true');

INSERT INTO consults (consult_type, patient_location, first_name, last_name, date_of_birth, gender, facility, referring_provider, call_back_phone, camera_name, notes, open) VALUES ('asl1', 'ip', 'Sade', 'Scott', '07/16/1998', 'm', 'Facility 2', 'Other Provider', '720-840-7465', 'Camera 1', 'Gabe has had history with being cool.', 'false');

https://www.quora.com/How-can-I-install-PostgreSQL-on-AWS-EC2-and-how-can-I-access-that