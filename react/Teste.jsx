import React, {useState, useEffect} from "react"
import { useLazyQuery } from "react-apollo"
import CalculateShipping from "./graphql/calculateShipping.gql"
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

function ProductShippingEstimate() {
    const [cookie, setCookie] = useState('')
    const [shippingEstimate, setShippingEstimate] = useState('')
    const [fetchshipping, {data, loading}] = useLazyQuery(CalculateShipping)
    const productSummary = useProductSummary()

    useEffect(() => {
        let valueCookie
        document.cookie.split(';').filter(item => {
            if(item.search('cep') > -1) valueCookie = item.split('=')[1]
        })
        setCookie(valueCookie)
    },[])

    useEffect(() => {
        if(productSummary){
            fetchshipping({
                variables: {
                    "items": [{"id": "1", "seller": "1", "quantity": "1"}],
                    "code": `${cookie || '12947000'}`,
                    "country": "BRA"
            }})
        }
    },[productSummary])
    
    useEffect(()=> {
        if(data && data.shipping){
            let value = data.shipping.logisticsInfo[0].slas[0].shippingEstimate
            value = value.replace('bd', '')
            setShippingEstimate(value)
        }
    },[data])

    return(
        <>
            {
                cookie.length > 0 && !loading ?
                <span style={{
                    color: "#fff",
                    background: "#000",
                    display: "inline-block",
                    padding: "8px 12px",
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 'bold',
                }}>Entrega em até {shippingEstimate} dias úteis para o centro de São Paulo</span>
                : <></>
            }
        </>
    )
}

export default ProductShippingEstimate