import React, { useState, useEffect, useMemo } from 'react';
import {
    Card,
    Modal,
    Table,
    Button,
    PaginationProps,
} from '@arco-design/web-react';
import {
    IconPlus
} from '@arco-design/web-react/icon';

import SearchForm from './form';
import PermissionWrapper from '@/components/PermissionWrapper';
import './style/index.less';
import getColumns from './constants';
import Modals from './modal';

const dataList = [
    {
        id: '1',
        name: 'Jane Doe',
        status: 23000,
        remark: '32 Park Road, London',
    },
    {
        id: '2',
        name: 'Alisa Ross',
        status: 25000,
        remark: '35 Park Road, London',
    },
    {
        id: '3',
        name: 'Kevin Sandra',
        status: 22000,
        remark: '31 Park Road, London',
    },
    {
        id: '4',
        name: 'Ed Hellen',
        status: 17000,
        remark: '42 Park Road, London',
    },
    {
        id: '5',
        name: 'William Smith',
        status: 27000,
        remark: '62 Park Road, London',
    },
]


const Catalogs = () => {
    const [id, setId] = useState<string|number|undefined>();
    const [data, setData] = useState<Array<any>>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPatination] = useState<PaginationProps>({
        showTotal: true,
        pageSize: 10,
        current: 1,
        pageSizeChangeResetCurrent: true,
    });


    const tableCallback = async (record, type) => {
        if(type === 'del'){
            Modal.confirm({
                title: '是否确认删除？',
                okText:'确认',
                onOk:()=>{
                    console.log('del ok')
                },
                cancelText:'取消',
                onCancel:() => {
                    console.log('del cancel')
                }
            })
        } else {
            setId(record.id);
            setVisible(true);
        }
    };

    const columns = getColumns(tableCallback);

    useEffect(() => {
        getData(dataList);
    },[])

    const getData = (val) => {
        setLoading(true);
        setTimeout(() => {
            setData(val);
            setLoading(false);
        }, 1000)
    }

    const handleSearch = (e) => {
        console.log('search _------>', e)
    }

    const onChangeTable = (e) => {
        console.log('change table------>', e)
    }

    const onIncrease = () => {
        console.log('onIncrease');
        setVisible(true);
        /*
        const arr = JSON.parse(JSON.stringify(data));
        arr.push({
            key: arr.length+1,
            name: 'Jane Doe',
            status: 23000,
            remark: '32 Park Road, London',
            email: 'jane.doe@example.com',
        });
        getData(arr);
        */
    }

    const onModalClose = (type:string, obj?:object) => {
        setVisible(false);
        if(type === 'reload'){
            console.log('reload');
        } else if(type === 'edit'){
            console.log('edit');
        } else if(type === 'add'){
            const arr = JSON.parse(JSON.stringify(data));
            arr.push(obj);
            console.log("arr", arr)
            setData(arr);
        }
        setId(undefined);
    }

    return(
        <Card>
            <SearchForm onSearch={handleSearch} />
            <Button className='add-btn' type='primary' onClick={onIncrease}>新增<IconPlus/></Button>
            <Table
                rowKey='id'
                loading={loading}
                onChange={onChangeTable}
                pagination={pagination}
                columns={columns}
                data={data}
            />
            <Modals
                id={id}
                visible={visible}
                callback={onModalClose}
                />
        </Card>
    )
}

export default Catalogs;
