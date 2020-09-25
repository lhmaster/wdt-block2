import React, {Fragment, useState, useCallback, useMemo, useEffect} from "react"
import { useLazyQuery } from "react-apollo"
import CalculateShipping from "./graphql/calculateShipping.gql"
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

function FunctionTeste() {
    const [cookie, setCookie] = useState([])
    const [fetchshipping, {data, loading}] = useLazyQuery(CalculateShipping)
    console.log("data -> ", data, " -- ", loading)
    const productSummary = useProductSummary()
    console.log({productSummary})

    useEffect(() => {
        console.log("useEffect")
        setCookie(document.cookie.split(";").filter(function(cookie) {
            return cookie.indexOf("cep") != -1
        }))

        console.log(cookie.length)

        if (!productSummary) return
        if (cookie.length == 0) return
        fetchshipping({variables: {
            "items": [{"id": "1", "seller": "1", "quantity": "1"}],
            "code": "12947000",
            "country": "BRA"
        }})
    }, [productSummary])

    console.log("LOADING -> ", loading)
    if (cookie.length > 0 && !loading) {
        return (
            // <span>cfjweo</span>
            <span>{data.shipping.logisticsInfo[0].slas[0].shippingEstimate}</span>
        )
    } else  {
        return <span>teste</span>
    }
}

export default FunctionTeste