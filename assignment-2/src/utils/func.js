export const numberFormatUS = (strNumber) => strNumber.toLocaleString('en-US')
export const commaReplaceToNum = (str) => {
  const replaceStr = str.replace(/,/g, '')
  return Number(replaceStr)
}
export const quantityStockIncrementByProduct = async (products, product) => {
  return products?.length
    ? products.filter((pd) => {
        if (pd?.id.toString().trim() === product?.id.toString().trim()) {
          return {
            ...pd,
            qty: pd.qty ? --pd.qty : 0,
          }
        }
        return {
          ...pd,
        }
      })
    : { error: 'Invalid Request', code: 400 }
}
export const quantityDecrementByProduct = async (products, product) => {
  return products?.length
    ? products.filter((pd) => {
        if (pd?.id.toString().trim() === product?.id.toString().trim()) {
          return {
            ...pd,
            qty:  pd.qty < pd.stock ? ++pd.qty : pd.stock,
          }
        }
        return {
          ...pd,
        }
      })
    : { error: 'Invalid Request', code: 400 }
}

export const existsReplaceWithIncrementProduct = async (carts, newCart) => {
  return carts.map((cart) => {
    if (cart?.id?.toString()?.trim() === newCart?.id?.toString()?.trim()) {
      return {
        ...cart,
        orderQty: cart.orderQty < cart.stock ? ++cart.orderQty : cart.stock,
      }
    }
    return {
      ...cart,
    }
  })
}

export const existsReplaceWithDecrementProduct = async (carts, newCart) => {
  return carts.map((cart) => {
    if (cart?.id?.toString()?.trim() === newCart?.id?.toString()?.trim()) {
      return {
        ...cart,
        orderQty: cart.orderQty ? --cart.orderQty : 0,
      }
    }
    return {
      ...cart,
    }
  })
}
export const cartTotalItemSum = async (carts) => {
  return carts.reduce((prev, curr) => prev + curr.orderQty, 0)
}
export const cartTotalPriceSum = async (carts) => {
  return carts.reduce((prev, curr) => prev + curr.orderQty * curr.price, 0)
}
