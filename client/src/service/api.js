import axios from 'axios';

const URL='http://localhost:8000';


export const authenticateSignup = async (data) => {
    try {
        console.log("from authenticateSignup 1" )
        const response = await axios.post(`${URL}/signup`, data);
        console.log("from authenticateSignup 2" )

        return response.data;
    } catch (error) {
        console.error("Error during signup:", error.response?.data || error.message);
        return null;
    }
};

export const authenticateLogin = async (data) => {
    try {
        console.log("from authenticateSignup-login 1" )
        const response = await axios.post(`${URL}/login`, data);
        console.log("from authenticateSignup-login 2" )

        return response.data;
    } catch (error) {
        console.error("Error during signup:", error.response?.data || error.message);
        return null;
    }
};


export const payUsingPaytm = async(data)=>{
    try{
        console.log(" recieve correct api and data");

        const response = await axios.post(`${URL}/payment`, data);
        console.log(" calling correct api and sending data",response);
    return response.data;
    }
    catch(error){
        console.log("Error while calling payment Api",error);
    }
}