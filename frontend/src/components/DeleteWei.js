import {React, useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate, useParams} from 'react-router-dom'

const DeleteWei = () => {

    const MyParam = useParams()
    const MyId = MyParam.id

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get(`weighting/${MyId}`).then((res) =>{
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
        AxiosInstance.delete( `weighting/${MyId}/`)
        .then((res) => {
            navigate('/weightings')
        })
    }

    return (
        <div>
            { loading ? <p>Loading data...</p> :
                <div>
                    <Box sx = {{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                        <Typography sx = {{marginLeft:'20px', color:"#ffffff"}}>
                            Delete weighting
                        </Typography>
                    </Box>

                    <Box sx = {{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection: 'column'}}>
                        <Box sx = {{display:'flex', justifyContent:'start', marginBottom: '40px'}}>
                            Are you sure that you want to delete weight
                        </Box>

                        <Box sx={{width:'30%'}}>
                            <Button variant='contained' onClick={submission} sx={{width:'100%'}}>
                                Delete the weight
                            </Button>
                        </Box>
                    </Box>
                </div>
            }
        </div>
    )
}

export default DeleteWei