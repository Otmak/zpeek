from flask import Flask, render_template, jsonify, send_file, url_for, redirect,request
import xml.etree.ElementTree as ET
import requests
# https://omi.zonarsystems.net/interface.php?customer=hol3292&username=zonar&password=PartyLikeIts.1999&action=showposition&operation=path&reqtype=dbid&target=194&version=2&starttime=1603971032&endtime=1608230858&logvers=3.8&format=json
application = Flask(__name__)
passwd = 'PartyLikeIts.1999'
password = 'PartyLikeIts.1999'

def makeAPIRequest():
    ''' User in any route to make api call detect errors with API call and maybe send email about error'''
    pass

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


@application.route('/path', methods=['GET', 'POST'])
def path():
    try:
        print('STARTING PATH GENERATION.......', request)

        print('BODY*****:', request)
        ourData = request.get_json().get('params')
        # ourData = dbId
        print(ourData)

        if request.method == 'POST':
            print('POST it w ma Brah>>>>>>>', ourData )
            dataFromClient = request.get_json()['params']
            start = dataFromClient['stime']
            end = dataFromClient['etime']
            dbId = dataFromClient['dbId']
            print('PARAMS READY!....===> sending ', start,end,dbId,passwd)

            pathUrl = f'https://omi.zonarsystems.net/interface.php?customer=hol3292&username=zonar&password={passwd}&action=showposition&operation=path&reqtype=dbid&target={int(dbId)}&version=2&starttime={int(start)}&endtime={int(end)}&logvers=3.8&format=json'
            # print('BODY:', star)
            print('MAKING request!....')
            res = requests.get(pathUrl)
            print('Done with assigning data!....')
            print('Starting JSON conversion!....')
            path_req_data = res.json()
            print('DONE WITH CONVERSION!....')
            print("WEB API RES:",res)
            if res.status_code == 200:
                print('AUTH SUCSESS')
                if not path_req_data.get('pathevents'):
                    if path_req_data.get('error'):
                        print('No path data',path_req_data.get('error'))
                        return {'error' : path_req_data.get('error')}
                    else:
                        return {'error' : 'There was an Error wiht the request'}
                else:
                    path_data = path_req_data.get('pathevents')
                    if path_data.get('assets') == None:
                        print('FOUND PATH BUT ITS NONE')
                        return {'error' : 'This Asset has no data'}
                    else:
                        return {'pathresponse' : path_data.get('assets')}
            else:
                print('******ATTENTION*******  AUTH FAILED')
                print(f'ERROR : {str(res.content.decode("utf-8"))}')
                return {'error': 'There was an Authentication Error'}


    except AssertionError as error:
        # print(error)
        print('ERROR')
        return {'error ': 'An Error in path happened'}

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
