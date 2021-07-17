import {axiosWithAuth} from '../helpers/axiosWithAuth';

const fetchColorService = async() => {
    try{
        const res = await axiosWithAuth().get("/colors"); 
        return res.data;
    }
    catch(e){
        console.log({e});
    }
}

export default fetchColorService;