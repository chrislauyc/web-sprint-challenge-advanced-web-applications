import {useState} from "react";
import * as yup from 'yup';
export const useForm=(initialValues,schema)=>{
    const [formValues,setFormValues] = useState(()=>{
        if(initialValues){
            return initialValues;
        }
        else{
            return {};
        }
    });
    const validate = async() => {

        const isValid = await schema.isValid(formValues);

        const formErrors = {};
        for(let name in formValues){
            try{
                await yup.reach(schema,name).validate(formValues[name]);
                formErrors[name] = '';
            }
            catch(error){
                formErrors[name] = error.errors[0];
            }
        }
        return [formErrors,isValid];
    };
    return [formValues,setFormValues,validate];
};
