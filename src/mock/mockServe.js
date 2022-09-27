// 引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入 [JSON数据根本没有对外暴露，但是可以引入]
// webpack 默认对外暴露:图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
// 第一个参数是请求地址，第二个参数：请求数据
// 模拟banner floor数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
