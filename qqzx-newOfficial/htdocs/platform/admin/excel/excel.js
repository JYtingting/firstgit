 function JSONToExcelConvertor (JSONData, FileName, ShowLabel) {
    // 先转化json
    const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData
    let excel = '<table>'
    // 设置表头
    let row = '<tr>'
    for (let i = 0, l = ShowLabel.length; i < l; i++) {
        row += '<td>' + ShowLabel[i] + '</td>'
    }
    // 换行
    excel += row + '</tr>'
    // 设置数据
    for (let i = 0; i < arrData.length; i++) {
        let row = '<tr>'
        for (let index in arrData[i]) {
            const value = arrData[i][index] === null ? '' : arrData[i][index]
            row += '<td style="vnd.ms-excel.numberformat:@">' + value + '</td>'
        }
        excel += row + '</tr>'
    }
    excel += '</table>'
    let excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>"
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel'
    excelFile += '; charset=UTF-8">'
    excelFile += '<head>'
    excelFile += '<!--[if gte mso 9]>'
    excelFile += '<xml>'
    excelFile += '<x:ExcelWorkbook>'
    excelFile += '<x:ExcelWorksheets>'
    excelFile += '<x:ExcelWorksheet>'
    excelFile += '<x:Name>'
    excelFile += '{worksheet}'
    excelFile += '</x:Name>'
    excelFile += '<x:WorksheetOptions>'
    excelFile += '<x:DisplayGridlines/>'
    excelFile += '</x:WorksheetOptions>'
    excelFile += '</x:ExcelWorksheet>'
    excelFile += '</x:ExcelWorksheets>'
    excelFile += '</x:ExcelWorkbook>'
    excelFile += '</xml>'
    excelFile += '<![endif]-->'
    excelFile += '</head>'
    excelFile += '<body>'
    excelFile += excel
    excelFile += '</body>'
    excelFile += '</html>'
    const uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile)
    const link = document.createElement('a')
    link.href = uri
    link.style = 'visibility:hidden'
    link.download = FileName + '.xls'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
