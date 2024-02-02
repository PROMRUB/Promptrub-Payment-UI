const formatCurrency = function (value) {
  const parts = value.replace(/[^0-9.]/g, '').split('.')
  const integerPart = parts[0]
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})(?=\d)/g, '$1,')
    .split('')
    .reverse()
    .join('')
  let decimalPart = parts[1] || ''
  decimalPart = decimalPart.length > 2 ? decimalPart.substring(0, 2) : decimalPart
  const formattedValue = decimalPart ? `${integerPart}.${decimalPart}` : integerPart
  return formattedValue.concat(' บาท')
}

export { formatCurrency }
