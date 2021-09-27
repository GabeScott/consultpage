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
