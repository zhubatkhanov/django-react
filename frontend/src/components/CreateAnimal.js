
import React, { useState, useEffect } from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import {useNavigate} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup" 
import MySelectField from './forms/MySelectField'
import MyDatePickerField from './forms/MyDatePickerField'
import * as yup from "yup" 
import Dayjs from 'dayjs'

const CreateType = () => {

    const [breeds, setBreeds] = useState()
    const [parents, setParents] = useState()
    const [loading, setLoading] = useState(true)
    
    const hardcoded_options = [ 
        {id: 'M', name:'Male'},
        {id: 'F', name:'Female'},
    ]

    const GetData = () => {
        AxiosInstance.get('breed/').then((res) =>{
            setBreeds(res.data)
            console.log(res.data)
        })

        AxiosInstance.get('animal/').then((res) => {
            setParents(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData();
    },[])

    const navigate = useNavigate()
	const defaultValues = {
        name: '',
        sex: '',
        age_on_arrival: 0,
    }


    const schema = yup 
    .object({
        name: yup.string().required('Name is a required field'),
        sex: yup.string().required('Sex is a required field'),
        arrival_date: yup.string().required('Arrival date is a required field'),
        age_on_arrival: yup.number().min(0).required('Age is a required field'),
        breed: yup.string().required('Breed is a required field'),
    })

    const {handleSubmit, reset, setValue, control} = useForm({defaultValues: defaultValues, resolver: yupResolver(schema)})
    const submission = (data) => {

        const date = Dayjs(data.arrival_date[`$d`]).format('YYYY-MM-DD')

        AxiosInstance.post( 'animal/', {
            name: data.name,
            sex: data.sex,
            arrival_date: date,
            age_on_arrival: data.age_on_arrival,
            breed: data.breed,
            parent: data.parent
        })
        .then((res) => {
            navigate('/animals') 
        })
    }

    return (
        <div>
            { loading ? <p>Loading data...</p> : 
            <form onSubmit={handleSubmit(submission)}>
            <Box sx = {{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                <Typography sx = {{marginLeft:'20px', color:"#ffffff"}}>
                    Create new animal
                </Typography>
            </Box>

            <Box sx = {{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection: 'column'}}>
                <Box sx = {{display:'flex', justifyContent:'space-around', marginBottom: '40px'}}>
                    <MyTextField
                        label = "Name"
                        name = "name"
                        control = {control}
                        placeholder = "Provide a animal name"
                        width = {'30%'}
                    /> 
                    <MySelectField
                        label = "Sex"
                        name = "sex"
                        control = {control}
                        width = {'30%'}
                        options = {hardcoded_options} 
                    />
                    <MyDatePickerField
                        label = "Arrival Date"
                        name = "arrival_date"
                        control = {control}
                        width = {'30%'}
                    />
                </Box>
                <Box sx = {{display:'flex', justifyContent:'space-around', marginBottom: '40px'}}>
                    <MyTextField
                        label = "Age on arrival"
                        name = "age_on_arrival"
                        control = {control}
                        placeholder = "Provide an age:"
                        width = {'10%'}
                    />
                    <MySelectField
                        label = "Breed"
                        name = "breed"
                        control = {control}
                        width = {'27%'}
                        options = {breeds} 
                    />
                    <MySelectField
                        label = "Parent"
                        name = "parent"
                        control = {control}
                        width = {'27%'}
                        options = {parents} 
                    />
                    <Box sx={{width:'27%', marginTop: '10px'}}>
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

export default CreateType