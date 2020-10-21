$(function () {
  const NUM_PER_PARTS = 6;

  function generateNumbers() { 
    const b = new Array(NUM_PER_PARTS);
    b[0] = 0; b[NUM_PER_PARTS] = 100;
    for (let i = 1; i < NUM_PER_PARTS; i++) { 
      b[i] = Math.round(Math.random() * 99);
    }
    const sliced = b.slice(1, NUM_PER_PARTS);
    sliced.sort((a, b) => a - b);
  
    for (let i = 1; i <= NUM_PER_PARTS - 1; i++) { 
      //b[1] = sliced[0]
      //b[2] = sliced[1]
      //b[NUM_PER_PARTS-2] = sliced[NUM_PER_PARTS-3]
      console.log(sliced[i-1])
      b[i] = sliced[i-1]
    }
  
    const a = new Array(NUM_PER_PARTS)
    for (let i = 1; i <= NUM_PER_PARTS; i++) {
      a[i - 1] = b[i] - b[i - 1]
    }
    return a
  }

  function generateRows(part) { 
    const ns = generateNumbers()
    return ns.map((n, i) => '<tr>' + [part, i+1, n].map(s => `<td>${s}</td>`).join('') + '</tr>').join("\n")
  }
  
  function refresh() { 
    const tbl = $('#tbl-body')
    tbl.empty()
    //head
    tbl.append(generateRows('head'))
    tbl.append(generateRows('body'))
    tbl.append(generateRows('leg'))
    tbl.append(generateRows('???'))
  }

  $('#create-btn').on('click', refresh)
  refresh()

})