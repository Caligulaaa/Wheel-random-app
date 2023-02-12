
import requests
import json



def getReq(url):
    response = requests.get(url)
    decode_response = json.loads(response.content)
    return decode_response

def postReq():

    url_get_token = 'http://127.0.0.1:8000/api/auth/token/'
    data = {
        'username':'banda17',
        'password':'YaBandit17',
    }
    response = requests.post(url_get_token,data=data)
    decode_response = json.loads(response.content)
    return decode_response['access']

def postReqTest(url):
    
    headers = {
        # "Accept": "application/json",
        'Authorization': f'AUTHTOKEN {postReq()}',
        # 'Content-Type': 'application/x-www-form-urlencoded',
    }
    data = {
        'name':'banda17',
    }
    response = requests.post(url,headers=headers,data=data)
    decode_response = json.loads(response.content)
    return decode_response

def postReqTest2(url):
    
    data = {
        'name':'1',
    }
    response = requests.post(url,data=data)
    decode_response = json.loads(response.content)
    return decode_response

def deleteTest(url):
    headers = {
        # "Accept": "application/json",
        'Authorization': f'AUTHTOKEN {postReq()}',
        # 'Content-Type': 'application/x-www-form-urlencoded',
    }    

    response = requests.delete(url,headers=headers)
    # response = requests.get(url)
    decode_response = json.loads(response.content)
    return decode_response


url = 'http://127.0.0.1:8000/api/wheel/comb/'
url1 = 'http://127.0.0.1:8000/api/wheel/addbox/'
url2 = 'http://127.0.0.1:8000/api/wheel/usersbox/1'

# print(postReqTest(url))
# print(deleteTest(url2))
print(deleteTest(url2))