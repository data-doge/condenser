import request from 'request'

const fetchThoughts = (cb) => {
  let url = 'https://spreadsheets.google.com/feeds/list/1rZ2aDGeMN-oaRRCFHs0Ddqvgs60pIYBAAmhxuXiMtjk/od6/public/basic?alt=json'
  request(url, function (err, res, body) {
    let goods = [], bads = []

    let rows = JSON.parse(body).feed.entry.forEach((row) => {
      let type = row.title.$t, text = row.content.$t.substring(6)
      type === 'positive' ? goods.push(text) : bads.push(text)
    })

    cb(goods, bads)
  })
}

export default fetchThoughts
