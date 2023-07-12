/*
 * @Author: tuyongtao1
 * @Date: 2023-07-10 10:06:43
 * @LastEditors: tuyongtao1
 * @LastEditTime: 2023-07-10 14:35:34
 * @Description: 
 */
const fs = require('fs');
const { series } = require('gulp');

// 获取用户配置
const prompts = require('prompts');

const questions = [
  {
    type: 'text',
    name: 'firstLD',
    message: '一级目录名称:'
  },
  {
    type: 'text',
    name: 'secondLD',
    message: '二级目录名称:'
  },
  {
    type: 'text',
    name: 'thirdLD',
    message: '三级目录名称:'
  }
];



async function createDirectory() {
    const response = await prompts(questions);
    const {firstLD,secondLD,thirdLD} = response
    console.log(firstLD,secondLD,thirdLD);
    console.log(`${process.cwd()}${firstLD}`);
    const dir = await fs.open(`${process.cwd()}${firstLD}`)
    for await (const dirent of dir)
    console.log(dirent.name);


}


function defaultTask(cb) {
    createDirectory()
    cb();
}
  
  exports.default = defaultTask