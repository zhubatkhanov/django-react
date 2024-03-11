import {React, useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import {useNavigate, useParams} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup" 
import * as yup from "yup" 
import Dayjs from 'dayjs'
import MySelectField from './forms/MySelectField'
import MyDatePickerField from './forms/MyDatePickerField'


const EditAnimal = () => {

    const MyParam = useParams()
    const MyId = MyParam.id

    const [breed, SetBreed] = useState()
    const [parent, SetParent] = useState()
    const [loading, SetLoading] = useState(true)

    const hardcoded_options = [ 
        {id: 'M', name:'Male'},
        {id: 'F', name:'Female'},
    ]

    const GetData = () => {
        AxiosInstance.get('breed/').then((res) => {
            SetBreed(res.data)
            console.log(res.data)
        })

        AxiosInstance.get('animal/').then((res) => {
            SetParent(res.data)
            console.log(res.data)
        })


        AxiosInstance.get(`animal/${MyId}`).then((res) =>{
            console.log(res.data)
            setValue('name', res.data.name)
            setValue('sex', res.data.sex)
            setValue('arrival_date', Dayjs(res.data.arrival_date))
            setValue('age_on_arrival', res.data.age_on_arrival)
            setValue('breed', res.data.breed)
            setValue('parent', res.data.parent)
            SetLoading(false)
        })
	}

    const schema = yup 
        .object({
            name: yup.string().required('Name is a required field'),
            sex: yup.string().required('Sex is a required field'),
            arrival_date: yup.string().required('Arrival date is a required field'),
            age_on_arrival: yup.number().min(0).required('Age is a required field'),
            breed: yup.string().required('Breed is a required field'),
    })

    useEffect(() => {
        GetData();
    },[])

    

    const navigate = useNavigate()
    const defaultValues = {
        name: '',
        sex: '',
        age_on_arrival: 0,
    }
    const {handleSubmit, setValue, control} = useForm({defaultValues: defaultValues, resolver: yupResolver(schema)})
    const submission = (data) => {
        const arrival_date = Dayjs(data.arrival_date["$d"]).format('YYYY-MM-DD')
        AxiosInstance.put( `animal/${MyId}/`, {
            name: data.name,
            sex: data.sex,
            arrival_date: arrival_date,
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
                        options = {breed} 
                    />
                    <MySelectField
                        label = "Parent"
                        name = "parent"
                        control = {control}
                        width = {'27%'}
                        options = {parent} 
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

export default EditAnimal