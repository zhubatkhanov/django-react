
import React, { useState, useEffect } from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import {useNavigate} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup" 
import * as yup from "yup" 
import MySelectField from './forms/MySelectField'
import MyDatePickerField from './forms/MyDatePickerField'
import Dayjs from 'dayjs'


const CreateWei = () => {

    const [animal, setAnimal] = useState()
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get('animal/').then((res) =>{
            setAnimal(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData();
    },[])

    const navigate = useNavigate()
	const defaultValues = {
    }

    const schema = yup 
    .object({
        animal: yup.string().required("Animal is a required field"),
        weight_date: yup.string().required("Weight date is a required field"),
        weight_kg: yup.number().min(0).required("Weight is a required field")
    })

    const {handleSubmit, control} = useForm({defaultValues: defaultValues, resolver: yupResolver(schema)})
    const submission = (data) => {
        const date = Dayjs(data.weight_date[`$d`]).format('YYYY-MM-DD')

        AxiosInstance.post( 'weighting/', {
            animal: data.animal,
            weight_date: date,
            weight_kg: data.weight_kg
        })
        .then((res) => {
            navigate('/weightings') 
        })
        .catch(error => {
            alert('У одного животного не может быть 2 взвешивания в 1 дату');
        })
    }

    return (
        <div>
            { loading ? <p>Loading data...</p> :
            <form onSubmit={handleSubmit(submission)}>
            <Box sx = {{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                <Typography sx = {{marginLeft:'20px', color:"#ffffff"}}>
                    Add a new weight
                </Typography>
            </Box>

            <Box sx = {{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection: 'column'}}>
                <Box sx = {{display:'flex', justifyContent:'space-around', marginBottom: '40px'}}>
                    <MySelectField
                        label = "Animal"
                        name = "animal"
                        control = {control}
                        width = {'45%'}
                        options = {animal} 
                    />
                    <MyDatePickerField
                        label = "Weight Date"
                        name = "weight_date"
                        control = {control}
                        width = {'45%'}
                    />

                </Box>
                <Box sx = {{display:'flex', justifyContent:'space-around', marginBottom: '40px'}}>
                    <MyTextField
                        label = "Weight"
                        name = "weight_kg"
                        control = {control}
                        placeholder = "Provide a animal weight"
                        width = {'45%'}
                    />
                    <Box sx={{width:'45%'}}>
                        <Button variant='contained' type='submit' sx={{width:'100%'}}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
            </form>}
        </div>
    )
}

export default CreateWei