var tp = require('../config/db.js')

exports.controller = controller = async (req, res) => {
  let query = ''

  req.body.data.map((item) => {
    query += `INSERT INTO [dbo].[tbs_${item.name}] ([${item.name}],[cod]) VALUES ('${item.value}','${item.cod}');`
  })

  await tp.sql(query)
    .returnRowCount()
    .execute()
    .then(function (results) {
      console.log(results)
    })
    .fail(function (err) {
      console.log(err)
    })
  
  query = ''

  req.body.data.map((item) => {
    query += `SELECT * FROM [dbo].[tbs_cod_${item.name}] WHERE cod = ${item.cod};`
  })

  let total = 0

  await tp.sql(query)
    .execute()
    .then(function (results) {
      
      results.map(item => {
        total += parseInt(item['cod']) + parseInt(item['soma'])
      })
      
      console.log(results)
      console.log("total " + total)
    }
    )
    .fail(function (err) {
      console.log(err)
    }
  )

  //create a query to retrieve the data from the table dbo.tbs_cores excluding the colors that are in the table dbo.tbs_cores_excluidas using the total variable as a filter
  await tp.sql(`SELECT DISTINCT A.animal, B.cor, C.pais FROM dbo.tbs_animais A INNER JOIN dbo.tbs_cores B ON A.total = B.total LEFT JOIN dbo.tbs_cores_excluidas ON B.total = tbs_cores_excluidas.total INNER JOIN dbo.tbs_paises C ON tbs_cores_excluidas.total = C.total WHERE A.total = ${total} AND B.cor NOT IN (SELECT cor FROM dbo.tbs_cores_excluidas where total = ${total})`)
  .execute()
  .then(function (results) {
    console.log(results)
    return res.json(results[0])
  }
  )
  .fail(function (err) {
    console.log(err)
  })
}