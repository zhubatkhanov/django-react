import {React, useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import {useNavigate, useParams} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup" 
import * as yup from "yup" 
import MySelectField from './forms/MySelectField'

const EditBreed = () => {

    const MyParam = useParams()
    const MyId = MyParam.id

    const [animaltype, setAnimaltype] = useState()
    const [loading, setLoading] = useState(true)


    const GetData = () => {
        AxiosInstance.get('animaltype/').then((res) =>{
            setAnimaltype(res.data)
            console.log(res.data)
        })

        AxiosInstance.get(`breed/${MyId}`).then((res) =>{
            console.log(res.data)
            setValue('name', res.data.name)
            setValue('animal_type', res.data.animal_type)
            setLoading(false)
        })
	}

    const schema = yup 
    .object({
        name: yup.string().required('Name is a required field'),
        animal_type: yup.string().required('Animal Type is a required field'), 
    })

    useEffect(() => {
        GetData();
    },[])



    const navigate = useNavigate()
    const defaultValues = {
        name: '',
    }
    const {handleSubmit, setValue, control} = useForm({defaultValues: defaultValues, resolver: yupResolver(schema)})
    const submission = (data) => {
        AxiosInstance.put( `breed/${MyId}/`, {
            name: data.name,
            animal_type: data.animal_type
        })
        .then((res) => {
            navigate('/breeds') 
        })
    }

    return (
        <div>
             { loading ? <p>Loading data...</p> :
            <form onSubmit={handleSubmit(submission)}>
            <Box sx = {{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                <Typography sx = {{marginLeft:'20px', color:"#ffffff"}}>
                    Edit Breed Type
                </Typography>
            </Box>

            <Box sx = {{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection: 'column'}}>
                <Box sx = {{display:'flex', justifyContent:'space-around', marginBottom: '40px'}}>
                    <MyTextField
                        label = "Name"
                        name = "name"
                        control = {control}
                        placeholder = "Provide a animal type name"
                        width = {'30%'}
                    />  
                    <MySelectField
                        label = "Animal Type"
                        name = "animal_type"
                        control = {control}
                        width = {'30%'}
                        options = {animaltype}
                    />
                    <Box sx={{width:'30%'}}>
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

export default EditBreed