import React, { useEffect, useState, useRef } from 'react';
import {
    Grid,
    Modal,
    Form,
    Input,
    Message,
    Radio
} from '@arco-design/web-react';
import {
    IconPlusCircle,
    IconMinusCircle
} from '@arco-design/web-react/icon';
import styles from '@/style/layout.module.less';

interface Props {
    id?: string | number,
    visible: boolean;
    callback: (type: string, val?: object) => void;
}

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Row, Col } = Grid;

const Modals = ({ id, visible, callback }:Props) => {

    const formRef = useRef<any>();
    const [valList, setValList] = useState<Array<string>>(['']);

    useEffect(() => {
        console.log('id ------>', id)
    },[id])

    // 修改属性值
    const valChange = (e, index) => {
        const arr:Array<string> = JSON.parse(JSON.stringify(valList));
        arr[index] = e.target.value || "";
        setValList(arr);
    }

    // 增加属性值
    const onIncrease = () => {
        const arr:Array<string> = JSON.parse(JSON.stringify(valList));
        arr.push("");
        setValList(arr);
    }

    // 删除属性值
    const onDecrease = (index) => {
        if(valList.length > 1){
            const arr:Array<string> = JSON.parse(JSON.stringify(valList));
            arr.splice(index, 1);
            setValList(arr);
        } else {
            Message.warning('属性至少填写一行');
        }
    }

    const onOk = async () => {
        if (formRef.current) {
            try {
                for (let index = 0; index < valList.length; index++) {
                    if(valList[index] === '' || valList[index] === null || valList[index] === undefined){
                        Message.error('请填写属性值');
                        return
                    }
                }
                const res = await formRef.current.validate();

                const obj = {
                    ...res,
                    status: res.status || "0",
                    val: valList
                }
                console.log("obj", obj);
                callback('add', obj)
            } catch (_) {
              Message.error('校验失败，请检查字段！');
            }
        }
    }

    const onCancel = () => {
        callback('cancel')
    }

    return(
        <Modal
            title='Modal Title'
            visible={visible}
            autoFocus={false}
            focusLock={true}
            okText='确认'
            onOk={onOk}
            cancelText='取消'
            onCancel={onCancel}
            afterClose={() => formRef?.current?.resetFields()}
        >
            <Form
                ref={formRef}
                initialValues={{status: '0'}}
                scrollToFirstError>
                <FormItem
                    field='name'
                    label='属性名称'
                    rules={[
                        { required: true, message: '请输入名称' },
                        { maxLength: 30, message: "名称长度不能超过30位"}
                        ]}>
                    <Input placeholder='请输入名称' />
                </FormItem>
                <FormItem
                    field='status'
                    label='状态'>
                    <RadioGroup defaultValue='0' style={{ marginBottom: 20 }}>
                        <Radio value='0'>启用</Radio>
                        <Radio value='1'>停用</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label='属性值' field='vals'>
                    {
                        valList.map((val, index) =>(
                            <Row key={index} style={{marginBottom: "10px"}}>
                                <Col flex="auto"><Input placeholder='请输入备注' value={val} onInput={(e) => valChange(e, index)}/></Col>
                                <Col flex="60px" style={{textAlign:"center"}} onClick={()=>onDecrease(index)}><IconMinusCircle  className={styles.icon}/></Col>
                            </Row>
                        ))
                    }
                    <Row style={{
                        marginTop: '10px'
                    }}>
                        <Col flex="60px"  onClick={onIncrease}><IconPlusCircle className={styles.icon}/></Col>
                    </Row>
                </FormItem>
                <FormItem label='备注' field='remark'>
                    <Input placeholder='请输入备注' />
                </FormItem>

                {/* <RadioGroup defaultValue='a' style={{ marginBottom: 20 }}>
                    <Radio value='a'>A</Radio>
                    <Radio value='b'>B</Radio>
                    <Radio value='c'>C</Radio>
                    <Radio disabled value='d'>
                    D
                    </Radio>
                </RadioGroup> */}
            </Form>
        </Modal>
    )
}

export default Modals;
