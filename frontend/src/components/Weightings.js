import {React, useEffect, useMemo, useState} from 'react'
import AxiosInstance from './Axios'
import {MaterialReactTable} from 'material-react-table';
import {Box, IconButton} from '@mui/material'
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import {Link} from 'react-router-dom'
import Dayjs from 'dayjs';


const Weightings = () => {

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get('weighting/').then((res) =>{
            setMyData(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData();
    },[])


      const columns = useMemo(
        () => [
        {
            accessorKey: 'id', 
            header: 'ID',
            size: 150,
        },
        {
            accessorKey: 'animal_name', 
            header: 'Animal Name',
            size: 150,
        },
        {
            accessorFn: (row) => Dayjs(row.weight_date).format('DD-MM-YYYY'),
            header: 'Weight Date',
            size: 150,
        },
        {
            accessorKey: 'weight_kg',
            header: 'Weight',
            size: 150,
        },
        ],
        [],
    );


    return (
        <div>
            { loading ? <p>Loading data...</p> :
            <MaterialReactTable 
                columns={columns} 
                data={myData} 
                enableRowActions
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                    <IconButton color="secondary" component={Link} to={`/editwei/${row.original.id}`}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" component={Link} to={`/deletewei/${row.original.id}`}>
                        <DeleteIcon />
                    </IconButton>
                    </Box>
                )}
                />
            }
        </div>
    )
}

export default Weightings
