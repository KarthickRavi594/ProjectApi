var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var jsonRead = require('./tblj_BI_Monthly_MG.json')
var netSales = require('./tblj_BI_NetSales.json')
const port = 3456


app.use(bodyParser.json());
app.listen(port);
app.use(cors());


app.get('/:category', (req, res) => {
    let dropDownValue = []
    let categoryValue = req.params.category;
    let keyValue = ''
    let categoryCheck = ['Manager', 'Terminal', 'Category', 'Brand', 'Code', 'Company']
    let keyValueStore = ['AccountManager', 'TerminalName', 'CategoryName', 'BrandName', 'ContractCode', 'CompanyName']
    if (categoryCheck.includes(categoryValue)) {
        let index = categoryCheck.indexOf(categoryValue);
        keyValue = keyValueStore[index]
    }
    if (categoryValue === 'Manager') {
        netSales.map(obj => {
            if (!dropDownValue.includes(obj[keyValue])) {
                dropDownValue.push(obj[keyValue])
            }
        })
        res.send(dropDownValue);
    }
    else {
        jsonRead.map(obj => {
            if (!dropDownValue.includes(obj[keyValue])) {
                dropDownValue.push(obj[keyValue])
            }
        })
        res.send(dropDownValue);
    }
})

app.post('/Table', (req, res) => {
    let object = req.body;
    console.log(object);
    let data = []
    if(object.Terminal){
        object.Terminal.map(terminal => {
            jsonRead.map(monthly => {
                if (monthly.TerminalName === terminal.label) {
                    data.push(monthly)
                }
            })
        })
        console.log('Data -> ',data)
        res.send(data);
    }
})