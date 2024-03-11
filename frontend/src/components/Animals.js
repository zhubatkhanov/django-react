import {React, useEffect, useMemo, useState} from 'react'
import AxiosInstance from './Axios'
import {MaterialReactTable} from 'material-react-table';
import {Box, IconButton} from '@mui/material'
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import {Link} from 'react-router-dom'
import Dayjs from 'dayjs';


const Animals = () => {

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get('animal/').then((res) =>{
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
            accessorKey: 'name', 
            header: 'Animal Name',
            size: 150,
        },
        {
            accessorKey: 'sex', 
            header: 'Animal Sex',
            size: 100,
        },
        {
            accessorFn: (row) => Dayjs(row.arrival_date).format('DD-MM-YYYY'),
            header: 'Arrival Date',
            size: 150,
        },
        {
            accessorKey: 'age_on_arrival', 
            header: 'Age on arrival (Month)',
            size: 150,
        },
        {
            accessorKey: 'breed_name', 
            header: 'Breed',
            size: 150,
        },
        {
            accessorKey: 'parent_name', 
            header: 'Parent',
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
                    <IconButton color="secondary" component={Link} to={`/editanimal/${row.original.id}`}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" component={Link} to={`/deleteanimal/${row.original.id}`}>
                        <DeleteIcon />
                    </IconButton>
                    </Box>
                )}
                />
            }
        </div>
    )
}

export default Animals