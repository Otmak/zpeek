from flask import Flask, render_template, jsonify, send_file, url_for, redirect
import xml.etree.ElementTree as ET
import requests


application = Flask(__name__)
passwd = 'happy.tday.2020'


def toInt(s):
	if type(s) == str:
		return int(s)
	return False


@application.route('/')
def index():
	return 'online'


@application.route('/assets', methods=['GET'])
def get_assets():
	url = f'https://omi.zonarsystems.net/interface.php?customer=hol1348&username=zonar&password={passwd}&action=showopen&operation=showassets&format=xml'
	res = requests.get(url)
	myArray = []
	bigData = {}
	getData = ET.fromstring(res.content)
	data = getData.findall('asset')

	# for i in data:
	# 	myObj = {
	# 		'id': int(i.get('id')),
	# 		'gpsid': toInt(i.find('gps').text),
	# 		'assetNumber': i.find('fleet').text,
	# 		'status': i.find('status').text,
	# 		'type': i.find('type').text
	# 	}
	# 	myArray.append(myObj)

	for i in data:
		h = int(i.get('id'))
		# print(h)
		bigData[h] = {
			'id': int(i.get('id')),
			'gpsid': toInt(i.find('gps').text),
			'assetNumber': i.find('fleet').text,
			'status': i.find('status').text,
			'type': i.find('type').text
		}
	print('*'*1000, bigData)


	return bigData


@application.route('/gendata')
def gendata():
	url = f'https://hol3292.zonarsystems.net/interface.php?format=xml&username=zonar&password={passwd}&action=showopen&operation=gendata&start=1603958400&tstype=load&reqtype=dbid&target=194'
	res = requests.get(url)
	getData = ET.fromstring(res.content)
	myArray = []
	data = getData.findall('gendata')
	ourCache = {}

	for  i in data:
		if i.get('assetid') in ourCache:
			print('WE GOT IT')
			return jsonify(myArray)
		else:
			print('NOT IN YET')
			ourCache[i.get('assetid')] = i.get('assetid')
			myArray.append(i.get('assetid'))

	return jsonify(myArray)


if __name__ == '__main__':
    application.run(debug=True)

