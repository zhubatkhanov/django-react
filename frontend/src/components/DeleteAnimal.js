import {React, useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate, useParams} from 'react-router-dom'

const DeleteAnimal = () => {

    const MyParam = useParams()
    const MyId = MyParam.id

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get(`animal/${MyId}`).then((res) =>{
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
        })
	}


    useEffect(() => {
        GetData();
    },[])

    const navigate = useNavigate()

    const submission = (data) => {
        AxiosInstance.delete( `animal/${MyId}/`)
        .then((res) => {
            navigate('/animals')
        })
    }

    return (
        <div>
            { loading ? <p>Loading data...</p> :
                <div>
                    <Box sx = {{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                        <Typography sx = {{marginLeft:'20px', color:"#ffffff"}}>
                            Delete animal: {myData.name}
                        </Typography>
                    </Box>

                    <Box sx = {{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection: 'column'}}>
                        <Box sx = {{display:'flex', justifyContent:'start', marginBottom: '40px'}}>
                            Are you sure that you want to delete animal: {myData.name}
                        </Box>

                        <Box sx={{width:'30%'}}>
                            <Button variant='contained' onClick={submission} sx={{width:'100%'}}>
                                Delete the type
                            </Button>
                        </Box>
                    </Box>
                </div>
            }
        </div>
    )
}

export default DeleteAnimal