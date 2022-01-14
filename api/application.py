# 

from flask import Flask, render_template, jsonify, send_file, url_for, redirect, request
import xml.etree.ElementTree as ET
import requests

# https://omi.zonarsystems.net/interface.php?customer=hol3292&username=zonar&password=PartyLikeIts.1999&action=showposition&operation=path&reqtype=dbid&target=194&version=2&starttime=1603971032&endtime=1608230858&logvers=3.8&format=json
application = Flask(__name__)

print('API is now Online..!')


def makeAPIRequest():
    ''' User in any route to make api call detect errors with API call and maybe send email about error'''
    pass


def toInt(s):
    if type(s) == str:
        return int(s)
    else:
        return s


@application.route('/')
def index():
    return 'online'


@application.route('/assets', methods=['GET', 'POST'])
def get_assets():
    try:
        InitialDataFromClient = request.get_json()['account']
        account = request.get_json()['account']
        passwd = request.get_json()['hashed']

        print(f'Making requesting with ...... {account}, {passwd}')


        url = f'https://omi.zonarsystems.net/interface.php?customer={account}&username=zonar&password={passwd}&action=showopen&operation=showassets&format=xml'
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
            # print( i.find('gps').text )
            myObj = {
                'assetgpsid': f"{i.find('fleet').text}-{i.find('gps').text}",
                'key': int(i.get('id')),
                'gpsid': i.find('gps').text,
                'assetNumber': i.find('fleet').text,
                'status': i.find('status').text,
                'type': i.find('type').text
            }
            myArray.append(myObj)

        # print(myArray)


        # add some checking and validation to prevent errors
        return jsonify(myArray)
    except:
        print('There is an Error in main')
    return {'error' : 'some Error in Server'}


@application.route('/mani', methods=['POST', 'GET'])
def main():
    try:
        print('online!')
        if request.method == 'POST':
            print('posit it with ma bruh')
            try:
                dataFromClient = request.get_json()['params']
                gpsid = dataFromClient['gpsid']
                account = dataFromClient['account']
                passwd = dataFromClient['hashed']
                print('making request', gpsid)
                maniUrl = f'https://omi.zonarsystems.net/gtc/interface.php?action=twentytwenty&username=zonar&password={passwd}&operation=getmanifest&format=json&gpssn={gpsid}&customer={account}&mobiledevicetypeid=2'

                req = requests.get(maniUrl)
                # print('Done with request', str(req.content))
                # print(type(req.content))

                if req.status_code == 200:
                    print('Request success! Got', req.status_code)
                    raw_mani = req.json()
                    return {'maniresponse': raw_mani}
                else:
                    errData = str(req.content)
                    print('Auth Failed for MANI')
                    return {'error': f'Authentication Failed==>{errData}'}
            except :
                #print('Error before reques', error)
                return {'error': 'Something went wrong while making you request'}
        else:
            print('No POST method')
    except:
        print('Error occured in MAIN.') 
        return {'error': 'Error making request for Mani'}


@application.route('/location', methods=['GET', 'POST'])
def location():
    try:
        print('online')
        if request.method == 'POST':
            dataFromClient = request.get_json()['params']
            dbid = dataFromClient['id']
            account = dataFromClient['account']
            passwd = dataFromClient['hashed']
            print('making request', dbid)
            print('post it w ma ====>', dbid)
            # dbid = 191
            # print(dbid)
            locationUrl = f'https://omi.zonarsystems.net/interface.php?customer={account}&username=zonar&password={passwd}&action=showposition&operation=current&format=xml&version=2&logvers=3&customer={account}&target={dbid}&reqtype=dbid'
            print('lo')
            req = requests.get(locationUrl)

            if req.status_code == 200:
                print('Looking good....', req.status_code)
                # rooT = ET.fromstring(req.content)
                getContent = ET.fromstring(req.content)
                # data = getContent.find('asset')
                # myList = []
                # print(getContent.find('asset'))
                batch = {}

                for i in getContent:
                    batch = {
                        'assetName': i.get('fleet'),
                        'assetid': i.get('id'),
                        'lon': i.find('long').text,
                        'lat': i.find('lat').text,
                        'time': i.find('time').text,
                        'sunit': i.find('speed').get('unit'),
                        'speed': i.find('speed').text,
                        'power': i.find('power').text
                    }
                # myList.append(batch)
                    # print(batch)
                print('MAIN', batch)
                return {'locationresponse': batch}
            else:
                print('Error probably not a 200 response')
                return {'error': 'Got a NON 200 response'}
        else:
            print('Not post method')
    except :
        print('Error in Main', )
        return {'error': f'Error in MAIN '}


@application.route('/gpsunit', methods=['GET', 'POST'])
def gpsunit():
    try:
        print('GPS....online')
        if request.method == 'POST':
            dataFromClient = request.get_json()['params']
            gpsID = dataFromClient['gpsid']
            account = dataFromClient['account']
            passwd = dataFromClient['hashed']

            try:
                gpsUrl = f'https://omi.zonarsystems.net/interface.php?customer={account}&username=zonar&password={passwd}&action=showopen&operation=showgps&target={gpsID}&reqtype=gpssn&format=xml'

                print('Making request with ==>', gpsID)
                req = requests.get(gpsUrl)
                print('Done making request', req)

                if req.status_code == 200:
                    print('Looking Good... ')
                    getContent = ET.fromstring(req.content)
                    data = getContent.find('gps')
                    print(data)
                    myList = []
                    for i in getContent:
                        print(i.get('id'), i.get('sn'), i.get('lastinspdate'), i.find('lastpositiondate'))
                        batch = {
                            'gpsdbid': i.get('id'),
                            'gpsid': i.get('sn'),
                            'assetdbid': i.find('asset').get('id'),
                            'lastinspectiondate': i.get('lastinspdate'),
                            'lastpositiondate': i.find('lastpositiondate').text,
                            'firmware': i.find('firmware').text,
                            'scid': i.find('scid').text,
                            'lastcallhome': i.find('lastcallhome').text
                        }
                        myList.append(batch)
                    return {'gpsdata': myList}
                else:
                    print('Error making request, probably not 200')
            except :
               # print('Error before or while making request', error)
                return {'error': 'error after making request'}
        else:
            print('Not post method')


    except:
        print('Error in MAin GPSUnits')
        return {'error': 'Making your initial request'}


@application.route('/path', methods=['GET', 'POST'])
def path():
    try:
        print('STARTING PATH GENERATION.......', request)

        print('BODY*****:', request)
        ourData = request.get_json().get('params')
        # ourData = dbId
        print(ourData)

        if request.method == 'POST':
            print('POST it w ma Brah>>>>>>>', ourData)
            try:

                dataFromClient = request.get_json()['params']
                start = dataFromClient['stime']
                end = dataFromClient['etime']
                dbId = dataFromClient['dbId']
                account = dataFromClient['account']
                passwd = dataFromClient['hashed']

                print('PARAMS READY!....===> sending ', start, end, dbId, passwd)

                pathUrl = f'https://omi.zonarsystems.net/interface.php?customer={account}&username=zonar&password={passwd}&action=showposition&operation=path&reqtype=dbid&target={int(dbId)}&version=2&starttime={int(start)}&endtime={int(end)}&logvers=3.8&format=json'
                # print('BODY:', star)
                print('MAKING request!....')
                res = requests.get(pathUrl)
                print('Done with assigning data!....')
                print('Starting JSON conversion!....')
                path_req_data = res.json()
                print('DONE WITH CONVERSION!....')
                print("WEB API RES:", res)
                if res.status_code == 200:
                    print('AUTH SUCSESS')
                    if not path_req_data.get('pathevents'):
                        if path_req_data.get('error'):
                            print('No path data', path_req_data.get('error'))
                            return {'error': path_req_data.get('error')}
                        else:
                            return {'error': 'There was an Error wiht the request'}
                    else:
                        path_data = path_req_data.get('pathevents')
                        if path_data.get('assets') == None:
                            print(path_req_data)
                            print('FOUND PATH BUT ITS NONE')
                            return {'error': 'This Asset has no data'}
                        else:
                            return {'pathresponse': path_data.get('assets')}
                else:
                    print('******ATTENTION*******  AUTH FAILED')
                    print(f'ERROR : {str(res.content.decode("utf-8"))}')
                    return {'error': 'There was an Authentication Error'}
            except:
                print('Error before request')
                return {'error': 'Something Went wrong in the back-end, thats all I know.'}
        else:
            print('Not POST method')
            return {'error': 'POST method only Allowed.'}

    except :
        # print(error)
        print('ERROR')
        return {'error ': 'An Error in path happened'}


@application.route('/gendata', methods=['GET', 'POST'])
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
                        theLabels = bigData.get(key)['labels']
                        theLabels.append(i.get('label'))

                        # theLabels.push(bigData.get(key)['labels'][0])
                        # print(bigData.get(key)['labels']) assign to vari then see if push works

                        existingValue = bigData.get(key)['events']

                        if type(
                                existingValue) is list:  # un-nessesary just assign value to variable and append to it and put it back on events
                            allEventsList = []
                            # print('******ITS A LIST*****')
                            # print(f'LENTH OF LIST: {len(existingValue)}')
                            # print('BEGIN :******', existingValue)
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
                            'labels': [i.get('label')],
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
                return {'gendata': myArray}
            except:
                print('somn went wrong bruh, looks like its inside PXMLJ')

        return jsonify(parseReqtoJson(data))
    except:
        print('somn Error in /gendata main.')
        return {'error': 'An Error occurred in GendataMain'}


@application.route('/test')
def test():
    try:
        if True:
            return 'Test is working'
    except:
        return 'somn wrong bruh :|'


if __name__ == '__main__':
    application.run(use_reloader=True, port=6000, debug=True)
