from flask import Flask, render_template, jsonify, send_file, url_for, redirect
import xml.etree.ElementTree as ET
import requests
# https://omi.zonarsystems.net/interface.php?customer=hol3292&username=zonar&password=PartyLikeIts.1999&action=showposition&operation=path&reqtype=dbid&target=194&version=2&starttime=1603971032&endtime=1608230858&logvers=3.8&format=json
application = Flask(__name__)
passwd = 'PartyLikeIts.1999'
password = 'PartyLikeIts.1999'


def toInt(s):
    if type(s) == str:
        return int(s)
    return False


@application.route('/')
def index():
    return 'online'


@application.route('/assets', methods=['GET'])
def get_assets():
    try:
        url = f'https://omi.zonarsystems.net/interface.php?customer=hol1348&username=zonar&password={passwd}&action=showopen&operation=showassets&format=xml'
        res = requests.get(url)
        if res.status_code == 200:
            print('AUTH SUCSESS')
        else:
            print('******ATTENTION*******  AUTH FAILED')
            print(f'ERROR : {str(res.content.decode("utf-8"))}')
        myArray = []
        bigData = {}
        getData = ET.fromstring(res.content)
        data = getData.findall('asset')


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
    except:
        print('There is an Error')
    return jsonify(myArray)


@application.route('/gendata', methods=['GET'])
def gendata():
    try:
        url = f'https://hol3292.zonarsystems.net/interface.php?format=xml&username=zonar&password={password}&action=showopen&operation=gendata&start=1603958400&tstype=load&reqtype=dbid&target=194'
        res = requests.get(url)
        print(res.status_code)
        if res.status_code == 200:
            print('AUTH SUCSESS')
        else:
            print('******ATTENTION*******  AUTH FAILED')
            print(f'ERROR : {str(res.content.decode("utf-8"))}')
        getData = ET.fromstring(res.content)
        myArray = []
        data = getData.findall('gendata')
        ourCache = {}
        bigData = {}
        '''get all items
        '''

        def parseReqtoJson(gendataXML):
            try:
                count = 0
                ourCache = {}
                bigData = {}
                listcount = 1


                for i in gendataXML:
                    # print(bigData)
                    count += 1
                    key = i.get('ctimestamp')

                    if key in ourCache:
                        currentValue = {
                            'label': i.get('label'),
                            'ctime': i.get('ctimestamp'),
                            'ltime': i.get('ltimestamp'),
                            'data': i.text
                        }
                        listcount += 1
                        ourCache[key] = listcount

                        existingValue = bigData.get(key)['events']

                        if type(existingValue) is list:
                            allEventsList = []
                            print('******ITS A LIST*****')
                            print(f'LENTH OF LIST: {len(existingValue)}')
                            print('BEGIN :******', existingValue)
                            for eachEvent in existingValue:
                                allEventsList.append(eachEvent)
                            allEventsList.append(currentValue)
                            bigData.get(key)['events'] = allEventsList
                            # print(f'LENTH OF LIST: {len(allEventsList)}')
                            # print('AFTER: ****** ', bigData.get(key)['events'], '      '*110)
                        else:
                            events = [existingValue, currentValue]
                            bigData.get(key)['events'] = events
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
                    ourCache[i.get('ctimestamp')] = listcount

                myArray.append(bigData)
                print('FUNCTION IS DONE!', count, len(myArray))
                return myArray
            except:
                print('somn went wrong bruh, looks like its inside PXMLJ')

        return jsonify(parseReqtoJson(data))
    except :
        print('somn Error in /gendata')


@application.route('/test')
def test():
    try:
        if True:
            return 'Test is working'
    except:
        return 'somn wrong bruh :|'


if __name__ == '__main__':
    application.run(debug=True)
