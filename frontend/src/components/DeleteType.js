import {React, useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate, useParams} from 'react-router-dom'

const DeleteType = () => {

    const MyParam = useParams()
    const MyId = MyParam.id

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get(`animaltype/${MyId}`).then((res) =>{
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
        AxiosInstance.delete( `animaltype/${MyId}/`)
        .then((res) => {
            navigate('/types')
        })
    }

    return (
        <div>
            { loading ? <p>Loading data...</p> :
                <div>
                    <Box sx = {{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                        <Typography sx = {{marginLeft:'20px', color:"#ffffff"}}>
                            Delete animal type: {myData.name}
                        </Typography>
                    </Box>

                    <Box sx = {{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection: 'column'}}>
                        <Box sx = {{display:'flex', justifyContent:'start', marginBottom: '40px'}}>
                            Are you sure that you want to delete animal type: {myData.name}
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

export default DeleteType