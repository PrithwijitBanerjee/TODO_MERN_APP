import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { delTodo, getTodos } from '../reducers/todoReducer'
import { Button } from 'react-bootstrap';
import { STATUSES } from '../utils/statusObj';
import { Vortex } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
const Todos = () => {
    const { status, error, todos } = useSelector(state => state?.getTodos);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const columns = [
        {
            name: 'Title',
            selector: row => row?.title,
            sortable: true,
            width: '15%'
        },
        {
            name: 'Description',
            selector: row => row?.desc,
            width: '17%'
        },
        {
            name: 'Image',
            selector: row => <div className='mb-3'><img src={row?.imgUrl} width={70} height={70} /></div>,
            width: '10%'
        },
        {
            name: 'Username',
            selector: row => row.user.userName,
            width: '18%'
        },
        {
            name: 'Email Id',
            selector: row => row.user.email
        },
        {
            name: 'Actions',
            selector: row => (<div>
                <Button variant='success' onClick={() => navigate(`/editTodo/${row?.id}`)}>Edit</Button>
                <Button variant='danger' className='mx-3' onClick={() => dispatch(delTodo(row?.id))}>Delete</Button>
            </div>)
        }
    ];
    const customStyles = {
        headCells: {
            style: {
                fontSize: '16px', // increase font size
                fontWeight: 'bold', // make it bold
            },
        },
        cells: {
            style: {
                textAlign: 'center'
            }
        }
    };
    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);
    if (error) {
        return (<>
            <div className='container vh-100 justify-content-center align-items-center'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2 className='text-danger'>Something went wrong !!!</h2>
                    </div>
                </div>
            </div>
        </>);
    }
    return (
        <>
            <DataTable
                columns={columns}
                data={status === STATUSES.LOADING ? [] : todos}
                responsive
                striped
                pagination
                customStyles={customStyles}
                noDataComponent={status === STATUSES.LOADING ? (
                    <div className="spinner-container">
                        <Vortex
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="vortex-loading"
                            wrapperStyle={{}}
                            wrapperClass="vortex-wrapper"
                            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                        />
                    </div>
                ) : 'No records to display'}
            />
        </>
    )
}

export default Todos