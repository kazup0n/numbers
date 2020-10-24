$(function () {
  const partsInput = $('#parts-input')
  const partsType = $('#parts-type-select')
  const partsTable = $('#parts-table > tbody')

  function appendParts(part, numbers) {
    const cells = numbers.map(n => $(`<td>${n}</td>`))
    const deleteMe = $(`<button type="button" class="btn btn-link">削除</button>`)
    deleteMe.on('click', e => $(e.target).parent('tr').remove())
    const row = $('<tr></tr>')
    row.append(`<td>${part}</td>`)
    row.append(cells)
    row.append(deleteMe)
    partsTable.append(row)
  }

  function getParts() {
    return partsTable.find('tr').map(function () {
      return {
        type: $(this).find('td:eq(0)').text(),
        params: [
          Number($(this).find('td:eq(1)').text()),
          Number($(this).find('td:eq(2)').text()),
          Number($(this).find('td:eq(3)').text()),
          Number($(this).find('td:eq(4)').text()),
          Number($(this).find('td:eq(5)').text()),
          Number($(this).find('td:eq(6)').text())
        ]
      }
    }).toArray()
  }

  function generateTuples(parts) {
    const { head, arm, body, leg } = _.groupBy(parts, 'type')
    if (!_.every([head, arm, body, leg], _.isArray)) {
      throw Error('全部位のパーツがありません')
    }
    const tuples = []
    for (let h = 0; h < head.length; h++) {
      for (let a = 0; a < arm.length; a++) {
        for (let b = 0; b < body.length; b++) {
          for (let l = 0; l < leg.length; l++) {
            //パラメータごとの合計
            const params = _.range(0, 6).map(i => {
              return _.sum([
                head[h].params[i],
                arm[a].params[i],
                body[b].params[i],
                leg[l].params[i]
              ])
            })
            tuples.push({
              parts: {
                head: head[h],
                arm: arm[a],
                body: body[b],
                leg: leg[l]
              },
              params,
              total: _.sum(params)
            })
          }
        }
      }
    }
    return tuples
  }

  function resultRow(tuple) {
    const parts = $(`<td>
      頭: ${tuple.parts.head.params.join(' ')} <br />
      腕: ${tuple.parts.arm.params.join(' ')} <br />
      体: ${tuple.parts.body.params.join(' ')} <br />
      脚: ${tuple.parts.leg.params.join(' ')}
    </td>`)
    const params = tuple.params.map(i => $(`<td>${i}</td>`))
    const total = $(`<td>${tuple.total}</td>`)
    const row = $('<tr></tr>')
    row.append(parts)
    row.append(total)
    row.append(params[0])
    row.append(params[1])
    row.append(params[2])
    row.append(params[3])
    row.append(params[4])
    row.append(params[5])
    return row
  }

  $('#parts-add').on('click', (e) => {
    //バリデーション
    const v = partsInput.val()
    const ns = v.split(' ').filter(n => n.length > 0).map(n => Number(n.trim())).filter(n => !isNaN(n))
    if (ns.length != 6) {
      partsInput.addClass('is-invalid')
    } else {
      appendParts(partsType.val(), ns)
      partsInput.removeClass('is-invalid')
    }
  })

  $('#parts-sort').on('click', () => {
    const parts = getParts()
    try {
      const tuples = _.sortBy(generateTuples(parts), ['total']).reverse()
      const tbl = $('#result-table > tbody')
      tbl.empty()
      tuples.forEach(t => tbl.append(resultRow(t)))
    } catch (e) { 
      alert(e.message)
    }
  })

})
