import axios from 'axios';

export const getAllUser = () => {
    return axios.get('http://localhost:9080/api/getAllUsers').then((res)=>{
        return res;
    }).catch((err)=>{
        console.debug("error",err);
        return err;
    })
}

export const login = (user) => {
    console.debug(user)
    return axios.post('http://localhost:9080/api/authenticate',{
        email:user.email,
        password:user.password
    }).then((res)=>{
        console.log("logged in Successfully API");
        return res.data;
    }).catch((err)=>{
        console.debug("error",err);
        return err;
    })
}

export const createUser = (newUser) => {
    return axios.post('http://localhost:9080/api/createUser',{
        firstName:newUser.firstName,
        lastName:newUser.lasttName,
        email:newUser.email,
        password:newUser.password
    }).then((res)=>{
        return res;
    }).catch((err)=>{
        console.debug("error",err);
        return err;
    })
}
