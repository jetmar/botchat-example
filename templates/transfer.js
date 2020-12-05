const transfer =(account, amount)=> `
<!doctype html>
    <html>
       <head>
            <meta charset="utf-8">
            <title>Comprobante de Transferencia  Bancaria</title>
            <style>
                h4 {
                    color: #000680;
                    text-align: center;
                    margin-top: 40px;
                }
                body{
                    background-color: rgba(0,255,231,0.13);
                    height: 780px;
                }
                span{
                    font-size: 8px;
                    float: right;
                    margin-top: -15px;
                }
                p{
                    font-size: 15px;
                }
            </style>
        </head>
        <body>
             <span>fecha de transacción: ${new Date().toLocaleString()} </span>
            <h4>Comprobante de transferencia bancaria </h4>
            <div style="text-align: center">
                <p>Se realizo con éxito la transferencia a la cuenta bancaria n° ${account} por el monto de ${amount}</p>
            </div>
            
        </body>
    </html>
`;
module.exports= transfer;