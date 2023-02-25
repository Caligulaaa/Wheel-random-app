import axios from 'axios';

export default class PostService {

    
    static async getCombackBox() {
        const response = await axios.get('/api/wheel/combackbox/')
        return response.data;
    }


    static async postLogin(username,password) {
        const response = await axios.post('/api/auth/token/',{
            'username':username,
            'password':password
          })

          return response;
    }

    static async postRegister(username,password,password2,email) {
        const response = await axios.post('/api/auth/register/',{
            'username':username,
            'password':password,
            'password2':password2,
            'email':email,
          })

          return response;
    }

    static async getUsersItems(id,token) {

        const response = await axios.get('/api/wheel/usersbox/'+id,{
            headers:{
                "Content-type": "Application/json",
                'Authorization': `AUTHTOKEN ${token}`,
            }
        });


        return response.data;
    }

    static async deleteUserItems(id,token) {

        const response = await axios.delete('/api/wheel/usersbox/'+id,{
            headers:{
                "Content-type": "Application/json",
                'Authorization': `AUTHTOKEN ${token}`,
            }
        });


        return response.data;
    }
    static async takeFreeSpin(username,token) {
        const data = {
            'name':username,
        };
        const axiosConfig = {
            headers:{
                'Authorization': `AUTHTOKEN ${token}`
            }
        };
        const response = await axios.post('/api/wheel/addbox/',data,axiosConfig)
        return response;
    }


    static async postSpin(username,token) {
        const data = {
            'name':username,
        };
        const axiosConfig = {
            headers:{
                'Authorization': `AUTHTOKEN ${token}`
            }
        };
        const response = await axios.post('/api/wheel/comb/',data,axiosConfig)
        return response;
    }

}
