import React, { useContext } from 'react';
import dayjs from 'dayjs';
import {
  Form,
  Input,
  Button,
  Grid,
} from '@arco-design/web-react';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import './style/index.less';

const { Row, Col } = Grid;
const { useForm } = Form;

function SearchForm(props: {
  onSearch: (values: Record<string, any>) => void;
}) {

  const [form] = useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    props.onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    props.onSearch({});
  };

  const colSpan = 8;

  return (
    <div className="search-form">
      <Form
        form={form}
        labelAlign="right"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          <Col span={colSpan}>
            <Form.Item label="编号" field="id">
              <Input placeholder="编号" allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label="名称" field="name">
              <Input placeholder="名称" allowClear />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div>
        <Button className="search-button" type="primary" icon={<IconSearch />} onClick={handleSubmit}>
          查询
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          重置
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
