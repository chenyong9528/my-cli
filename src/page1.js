import Vue from 'vue'
import axios from 'axios'
import './assets/common'
import 'normalize.css'
import './assets/style/common.scss'
import './assets/style/page1.css'
import img from './assets/imgs/baipiao.jpg'
import imgSm from './assets/imgs/baipiao-sm.jpg'

console.log(Vue, axios)
console.log(img, imgSm)
const bd = document.body
const h1 = document.createElement('h1')
const span = document.createElement('span')
const div = document.createElement('div')
const img1 = document.createElement('img')
const img2 = document.createElement('img')
h1.innerHTML = 'Hello'
span.innerHTML = '!!!!!!'
div.innerHTML =
  '<p>123</p><ul><li>456</li></ul><button>button</button><input type="text"><a href="#">link</a>'
img1.src = img
img2.src = imgSm
h1.appendChild(span)
bd.appendChild(h1)
bd.appendChild(img1)
bd.appendChild(img2)
bd.appendChild(div)

const pm = new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 1000)
})

async function asfn() {
  await pm
  console.log('end')
}

asfn()

console.log([1, [2, 3]].flat())
