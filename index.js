const axios = require('axios')
const express = require('express');
const morgan = require('morgan')
const { ttp, attp, generateMeme } = require('./service')

let creator = 'Mroy25'

const isUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
async function getBuffer(url, options) {
    try {
      options ? options : {}
      const res = await axios({
          method: "get",
          url,
          headers: {
            'DNT': 1,
            'Upgrade-Insecure-Request': 1
          },
          ...options,
          responseType: 'arraybuffer'
        })
        return res.data
    } catch (e) {
        console.log(`Error : ${e}`)
    }
}
async function upfile(buffer){
  try {
      const res = await axios.post('https://amoska-up.hf.space/upload', {
          file: buffer.toString('base64')
      });
      return res.status !== 200 ? res.statusText : res.data;
  } catch (error) {
      if (error.response) {
          return error.response.statusText;
      }
      return 'Error occurred while uploading the file.';
  }
};
const app = express()
.set('json spaces', 4)
.use(morgan('dev'))
.use(express.json())
.all('/', (_, res) => {
  let baseUrl = `https://${_.get('host')}`
  res.json({
  author: `Mroy25`,
  WA: `081215524272`,
  runtime: new Date(process.uptime() * 1000).toTimeString().split(' ')[0],
  endpoint: {
    attp: `${baseUrl}/attp?query=TRASH`,
    ttp: `${baseUrl}/ttp?query=TRASH`,
    meme: `${baseUrl}/meme?url=YOUR-URL&atas=text+atas&bawah=text+bawah`,
  },
})
})

.get('/upscale4x', async (req, res) => {
  let q = req.query.url
  if (!q) return res.json({ status: false, creator: `${creator}`, message: 'Input parameter url' })
  if(!isUrl(q)) return res.json({ status: false, creator: `${creator}`, message: 'Url tidak valid' })
  try {
  const result = await upscale4x(q);
    
  res.json({
    status: true,
    creator: `${creator}`,
    result
  })
} catch (err) {
  res.json({
    status: false,
    creator: `${creator}`,
    message: err
  })
}
})

.get('/ttp', async (req, res) => {
  let q = req.query.query
  if (!q) return res.json({ status: false, creator: `${creator}`, message: 'Input parameter query' })
  try {
  await ttp(q).then((buffer) =>{
    let result = await upfile(buffer)
		res.json({
    status: true,
    creator: `${creator}`,
    result: result.url
  })
  })
} catch (err) {
  res.json({
    status: false,
    creator: `${creator}`,
    message: err
  })
}
})

.get('/attp', async (req, res) => {
  let q = req.query.query
  if (!q) return res.json({ status: false, creator: `${creator}`, message: 'Input parameter query' })
  try {
  await attp(q).then((buffer) =>{
    let result = await upfile(buffer)
    res.json({
    status: true,
    creator: `${creator}`,
    result: result.url
  })
  })
} catch (err) {
  res.json({
    status: false,
    creator: `${creator}`,
    message: err
  })
}
})
  
.get('/meme', async (req, res) => {
    let url = req.query.url
    let atas = req.query.atas
    let bawah = req.query.bawah
    if(!isUrl(url)) return res.json({ status: false, creator: `${creator}`, message: 'Input parameter url image' })
    if (!atas) return res.json({ status: false, creator: `${creator}`, message: 'Input parameter atas' })
    if (!bawah) return res.json({ status: false, creator: `${creator}`, message: 'Input parameter bawah' })
    try {
        let img = await getBuffer(url)
    await generateMeme(img, atas, bawah).then((buffer) =>{
    let result = await upfile(buffer)
    res.json({
    status: true,
    creator: `${creator}`,
    result: result.url
  })
    })
  } catch (err) {
    res.json({
      status: false,
      creator: `${creator}`,
      message: err
    })
  }
  })

.listen(3030, () => console.log('App running on port 3030'))