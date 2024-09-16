const dispalyINR = (price) => {
    const formatar = new Intl.NumberFormat('en-IN',{
        style : 'currency',
        currency : 'INR',
        minimumFractionDigits : 2
    })

    return formatar.format(price);
}

export default dispalyINR;