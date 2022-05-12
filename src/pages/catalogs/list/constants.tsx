import React from 'react';
import { Button, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';

const { Text } = Typography;

const getColumns = (
  callback: (record: Record<string, any>, type: string) => Promise<void>
) => {
    const statusList = {"0": "启用", "1": "停用"}
    return [
        {
            title: '',
            dataIndex: 'index',
            render: (value) => <Text>{value}</Text>,
        },
        {
            title: '编码',
            dataIndex: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (value="0") => <Text>{statusList[value]}</Text>,
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
        title: "操作",
        dataIndex: 'operations',
        headerCellStyle: { paddingLeft: '15px' },
        render: (_, record) => (
            <div>
                <Button
                    type="text"
                    size="small"
                    onClick={() => callback(record, 'edit')}>
                    编辑
                </Button>
                <Button
                    type="text"
                    size="small"
                    status="danger"
                    onClick={() => callback(record, 'del')}>
                    删除
                </Button>
            </div>
        ),
        },
    ];
}

export default getColumns;
