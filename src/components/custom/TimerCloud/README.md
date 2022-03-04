## 云定时【组件】

### 目的意义 
云定时组件

### 功能
 - 已定时列表
   - 长按删除
 - 新建定时
   - 定时
   - 重复
   - 自定义 （根据产品情况，放置定时控制功能组件）

### 准备
更新master后，云定时组件路径：src/components/business/timerCloud

### 使用
建议定时组件由单独页面来展现,增加定时的路由
```typescript jsx
import Timer from '@/products/air-conditioner/views/timer/timer';

{/*云定时*/}
<Route path="/timer">
  <Timer />
</Route>
```
使用定时组件
```typescript jsx

/*云定时入参*/
export interface ITimerCloud {
  children: React.ComponentProps<any>;
  dataBind: ITimerDataBind;
  options: ITimerOptions;
}

/*dataBind 向云定时组件传递自定义功能组件的结果，组件将数据格式化后提交后台*/
export interface ITimerDataBind {
  [key: string]: string | number;
}

/*options 云组件配置数据，须与自定义组件相对应*/
export interface ITimerOptions {
  [key: string]: {
    label: string;
    value_enum?:
      | {
      [key: string]: string;
    }
      | string[]
      | any;
  };
}

/*例：*/
const [data, setData] = useState({
  work_mode: '',
  power_switch: 0,
  temp_set: 0,
  fan_speed_enum: ''
} as ITimerDataBind);

const optionsTimer: ITimerOptions = {
  power_switch: {
    label: '开关',
    value_enum: ['关', '开']
  },
  work_mode: {
    label: '工作模式',
    value_enum: {
      auto: '自动',
      cold: '制冷',
      hot: '制热',
      arefaction: '除湿',
      wind: '送风',
      eco: 'ECO',
      floor_heat: '地暖',
      floor_eat_and_heat: '地暖及制热'
    }
  },
  temp_set: {
    label: '温度设置'
  },
  fan_speed_enum: {
    label: '风速',
    value_enum: {
      sleep: '睡眠',
      health: '健康',
      natural: '自然',
      strong: '强力',
      auto: '自动',
      low: '低风',
      middle: '中风',
      high: '高风',
      mute: '静音'
    }
  }
};


<TimerCloud dataBind={data} options={optionsTimer}>
  {/*自定义功能区域，建议使用ant中list组件开发，样式方便统一*/}
  <List>
    <List.Item
      prefix={'开关'}
      extra={'开'}
      onClick={() => {}}
    />
  </List>
  {/*...*/}
</TimerCloud>

```
### 换肤
已实现根据body.theme_***,自动切换点皮肤。
对于自定义功能部分需由开发者完成。
