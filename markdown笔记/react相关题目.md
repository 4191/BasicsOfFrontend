1. 组件之间如何通讯？
   1. 父子组件 props
   2. 自定义事件
   3. Redux和Context

2. JSX本质是什么
   1. createElement
   2. 执行返回vnode

3. Context是什么，如何应用？
   1. 父组件，向其下所有子孙组件传递信息（一些简单公共信息：主题颜色、语言等）
   2. 复杂的公共信息，请用redux

4. shouldComponentUpdate 用途
   1. 性能优化（不可过度，应看情况进行优化）
   2. 需 配合"不可变值"一起使用，否则会出错

5. Redux单项数据流
   1. Action（creator）
   2. Dispatch（Middleware -->Side Effects --> 1.Action)
   3. Reducer
   4. State
   5. View --> 1.Action