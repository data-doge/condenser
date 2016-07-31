import request from 'request'

const fetchThoughts = (cb) => {
  let url = 'https://spreadsheets.google.com/feeds/list/1rZ2aDGeMN-oaRRCFHs0Ddqvgs60pIYBAAmhxuXiMtjk/od6/public/basic?alt=json'
  request(url, function (err, res, body) {
    let rows = JSON.parse(body).feed.entry.map((row) => {
      return {
        type: row.title.$t,
        text: row.content.$t.substring(6)
       }
    })

    let goods = rows.filter((row) => row.type === 'positive')
    let bads = rows.filter((row) => row.type === 'negative')

    cb(goods, bads)
  })
}

export default fetchThoughts
