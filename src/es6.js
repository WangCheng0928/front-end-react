// {
//     let name = 'imooc'  //模块局部变量
// }
// console.log(name)

// let name = 'immoc'
// name = 'woniu'
// console.log(name)

// let name = 'imooc'
// let course = 'react开发App'
// console.log('hello ' + name + ', course is ' + course)
// console.log(`hello ${name}, course is ${course}`) //模板字符串
// console.log(`

//   adafa

// `)

// function hello(name) {
//     console.log(`hello ${name}`)
// }

// const hello1 = name => {  //箭头函数
//     console.log(`hello ${name}`)
// }

// hello('imooc')
// hello1('imooc')
// setTimeout(() => {
//     console.log('xxx')
// }, 1000)

// const double = x => x * 2
// console.log(double(5))

// const hello = (name = 'imooc') => {
//     console.log(`hello ${name}`)
// }
// hello()
// hello('woniu')

// function hello(name1, name2) {
//     console.log(name1, name2)
// }

// let arr = ['imooc', 'woniu']
// hello.apply(null, arr) //以前只能采用apply的形式 分别把arr的两个元素赋值给name1和name2
// hello(...arr) //展开符的形式

// const obj = { name: 'imooc', course: 'React开发app' }
// console.log(Object.keys(obj))
// console.log(Object.values(obj))
// console.log(Object.entries(obj))

// const name = 'imooc'
// const obj = {
//     name,
//     [name]: 'hello'
// }
// obj[name] = 'hello imooc'
// console.log(obj)

// const obj = { name: 'imooc', course: 'React' }
// const obj2 = { type: 'IT', name: 'woniu' }
// console.log({...obj, ...obj2, Date: '2019' })

// const arr = ['hello', 'imooc']
//     // let arg1 = arr[0]
//     // let arg2 = arr[1]

// let [arg1, arg2] = arr
// console.log(arg1, arg2)

// class MyApp {
//     constructor() {
//         this.name = 'imooc'
//     }
//     sayHello() {
//         console.log(`hello ${this.name} !`)
//     }
// }
// const app = new MyApp()
// app.sayHello()

import { name } from './module1'
console.log(name)