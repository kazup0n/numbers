$(function () {

  function extract_numbers_from(id) {
    return $(id).find('input').map((_, t) => $(t).val())
      .toArray()
      .filter(n => !!n)
      .map(n => Number(n))
      .filter(n => !isNaN(n))
  }

  $('#create-btn').on('click', () => {
    const head = extract_numbers_from('#head-group')
    const arm = extract_numbers_from('#arm-group')
    const body = extract_numbers_from('#body-group')
    const leg = extract_numbers_from('#leg-group')
    const target = Number($('#target').val())
    const results = [];
    for (let h = 0; h < head.length; h++) { 
      for (let a = 0; a < arm.length; a++) { 
        for (let b = 0; b < body.length; b++) { 
          for (let l = 0; l < leg.length; l++) { 
            const sum = head[h] + arm[a] + body[b] + leg[l]
            const score = Math.abs(target - sum)
            const params = { h: head[h], a: arm[a], b: body[b], l: leg[l]}
            results.push({sum, score, params})
          }
        }
      }
    }//end of for
    results.sort((r1, r2) => r1.score - r2.score)
    const resultTxt = results.slice(0, 5)
      .map((r, i) => `<li>(計 ${r.sum}). 頭: ${r.params.h}, 腕: ${r.params.a}, 体: ${r.params.b}, 脚: ${r.params.l}</li>`)
      .join('')
    $('#result').empty().html(`<ol>${resultTxt}</ol>`)
  })
}

)