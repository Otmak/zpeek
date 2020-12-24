from flask import Flask, render_template, jsonify, send_file, url_for, redirect
import xml.etree.ElementTree as ET
import requests

application = Flask(__name__)
passwd = 'happy.tday.2020'
password = 'novavax.128'


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
    # 	# myObj = {
    # 	# 	'key': i.get('id')
    # 	# }
    # 	if type(int(i.get('id'))) is not int:
    # 		print('CAUGHT:*************************************', i.get('id'), '*************************************')
    # 	else:
    # 		print(i.get('id'))
    # 	bigData[i.get('id')] = int(i.get('id'))

    # return jsonify(bigData)

    # for i in data:
    # 	myObj = {
    # 		'menuItem': i.get('id'),
    # 		'pane': {
    # 			'key': int(i.get('id')),
    # 			'content':  i.find('gps').text
    # 		}
    # 	}
    # 	myArray.append(myObj)

    # return jsonify(myArray)

    for i in data:
        myObj = {
            'menuItem': i.find('fleet').text,
            'key': int(i.get('id')),
            'gpsid': toInt(i.find('gps').text),
            'assetNumber': i.find('fleet').text,
            'status': i.find('status').text,
            'type': i.find('type').text
        }
        myArray.append(myObj)

    return jsonify(myArray)


# for i in data:
# 	h = int(i.get('id'))
# 	# print(h)
# 	bigData[h] = {
# 		'id': int(i.get('id')),
# 		'index': int(i.get('id')),
# 		'gpsid': toInt(i.find('gps').text),
# 		'assetNumber': i.find('fleet').text,
# 		'status': i.find('status').text,
# 		'type': i.find('type').text
# 	}
# # print('*'*1000, bigData)


# return bigData


@application.route('/gendata', methods=['GET'])
def gendata():
    url = f'https://hol3292.zonarsystems.net/interface.php?format=xml&username=zonar&password={password}&action=showopen&operation=gendata&start=1603958400&tstype=load&reqtype=dbid&target=194'
    res = requests.get(url)
    print(res.status_code)
    if res.status_code == 200:
        print('AUTH SUCSESS')
    else:
        print('******ATTENTION*******  AUTH FAILED')
    getData = ET.fromstring(res.content)
    myArray = []
    data = getData.findall('gendata')
    ourCache = {}
    bigData = {}
    '''get all items

    '''
    count = 0

    for i in data:
        print(bigData)
        count += 1
        key = i.get('ctimestamp')

        if key in ourCache:
            currentValue = {
                'label': i.get('label'),
                'ctime': i.get('ctimestamp'),
                'ltime': i.get('ltimestamp'),
                'data': i.text
            }
            existingValue = bigData.get(key)['events']

            if type(existingValue) is list:
                allEventsList = []
                print('******ITS A LIST*****')
                print('BEGIN :******', existingValue)
                for eachEvent in existingValue:
                    print('EACH*****', eachEvent)
                    bigData.get(key)['events'] = allEventsList
                allEventsList.append(currentValue)
                # print('AFTER: ******', bigData.get(key)['events'], '      '*110)
            else:
                events = [existingValue, currentValue]
                bigData.get(key)['events'] = events
                # if type(bigData.get(key)['events']) is list:
                #     print('EVENT ADDED!')
                #     print('Please wait...')
        else:
            # print('NOTHING YET')
            bigData[i.get('ctimestamp')] = {
                'asset': f'{i.get("fleet")} {count}',
                'id': i.get('assetid'),
                'gpsid': i.get('sn'),
                'assettype': i.get('assettype'),
                'events': {
                    'label': i.get('label'),
                    'ctime': i.get('ctimestamp'),
                    'ltime': i.get('ltimestamp'),
                    'data': i.text
                }
            }
        ourCache[i.get('ctimestamp')] = i

    myArray.append(bigData)
    print('FUNCTION IS DONE!', count, len(myArray))

    return jsonify(myArray)


if __name__ == '__main__':
    application.run(debug=True)
