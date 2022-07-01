import { Select } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels } from 'store/actions'
const { Option } = Select
// Form 为自定义组件提供 value 和 onChange 属性，让其作为 Form.Item 成为双向受控组件
// 重点：props接收：value, onChange属性，配合antd的表单组件实现受控
// value, onChange是Form.Item传入的，控制Select
function Channel({ value, onChange, width }) {
  //   console.log(value, onChange, width)
  const dispatch = useDispatch()
  const channelList = useSelector((state) => state.channel)

  useEffect(() => {
    dispatch(getChannels())
  }, [dispatch])

  return (
    <Select
      placeholder="Select a channel"
      value={value}
      onChange={onChange}
      style={{ width }}
    >
      {channelList.map((item) => (
        // 说明：value绑定的值，就是下拉选中获取到的值
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  )
}

export default Channel
