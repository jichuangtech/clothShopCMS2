import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Checkbox, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;


@connect(({ loading, goods }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  goods,
}))
@Form.create()
export default class GoodsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCodeCheck: false,
      isKgCheck: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'goods/queryColor',
      // type: 'rule/fetch',
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }

  onCodeChange(e) {
    this.setState({
      isCodeCheck: e.target.checked,
    });
  }

  onKgChange(e) {
    this.setState({
      isKgCheck: e.target.checked,
    });
  }

  getColorOptions(colors) {
    // alert(" getColorOptions colors: " + JSON.stringify(colors));
    const options = [];
    for (const key in colors) {
      const color = colors[key];
      const opt = {
        label: color.colorName,
        value: color.id,
      };
      options.push(opt);
    }
    return options;
  }
  render() {
    const { submitting, goods: { colors } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="添加商品" content="">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="商品名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入商品名称',
                }],
              })(
                <Input placeholder="" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="商品编号"
            >
              {getFieldDecorator('sn', {
                rules: [{
                  required: true, message: '请输入商品编号',
                }],
              })(
                <Input placeholder="" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="库存"
            >
              {getFieldDecorator('store', {
                rules: [{
                  required: true, message: '请输入商品库存',
                }],
              })(
                <Input placeholder="" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="简单描述"
            >
              {getFieldDecorator('simpleInfo', {
                rules: [{
                  required: true, message: '请输入简单描述',
                }],
              })(
                <Input placeholder="" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="详细描述"
            >
              {getFieldDecorator('detailInfo', {
                rules: [{
                  required: true, message: '请输入详细描述',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入商品的主要用途" rows={4} />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="是否热销"
              help=""
            >
              <div>
                {getFieldDecorator('hot', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="2">否</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="是否推荐"
              help=""
            >
              <div>
                {getFieldDecorator('recommeded', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="2">否</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="规格"
            >
              {getFieldDecorator('isCodeCheck')(
                <div>
                  <Checkbox
                    name="codeCheck"
                    onChange={event => this.onCodeChange(event)}
                  >码
                  </Checkbox>
                  <Input
                    ref="codePrice"
                    placeholder="价格/码"
                    disabled={!this.state.isCodeCheck}
                  />
                </div>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="规格"
            >
              {getFieldDecorator('isCodeCheck')(
                <div>
                  <Checkbox
                    name="codeCheck"
                    onChange={event => this.onKgChange(event)}
                  >千克
                  </Checkbox>
                  <Input
                    ref="codePrice"
                    placeholder="价格/千克"
                    disabled={!this.state.isKgCheck}
                  />
                </div>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="颜色"
            >
              {getFieldDecorator('isCodeCheck')(
                <div>
                  <CheckboxGroup
                    options={this.getColorOptions(colors)}
                  />
                </div>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="起止日期"
            >
              {getFieldDecorator('date', {
                rules: [{
                  required: true, message: '请选择起止日期',
                }],
              })(
                <RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="目标描述"
            >
              {getFieldDecorator('goal', {
                rules: [{
                  required: true, message: '请输入目标描述',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入你的阶段性工作目标" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="衡量标准"
            >
              {getFieldDecorator('standard', {
                rules: [{
                  required: true, message: '请输入衡量标准',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入衡量标准" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  客户
                  <em className={styles.optional}>
                    （选填）
                    <Tooltip title="目标的服务对象">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>邀评人<em className={styles.optional}>（选填）</em></span>}
            >
              {getFieldDecorator('invites')(
                <Input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>权重<em className={styles.optional}>（选填）</em></span>}
            >
              {getFieldDecorator('weight')(
                <InputNumber placeholder="请输入" min={0} max={100} />
              )}
              <span>%</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="目标公开"
              help="客户、邀评人默认被分享"
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">公开</Radio>
                    <Radio value="2">部分公开</Radio>
                    <Radio value="3">不公开</Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder="公开给"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">同事甲</Option>
                      <Option value="2">同事乙</Option>
                      <Option value="3">同事丙</Option>
                    </Select>
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
