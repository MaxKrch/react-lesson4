const hex2rgb = (hex: string) => {
  const isCorrectHex = hex.match(/^#[0-9a-fA-F]{6}$/)
  if (!isCorrectHex) return null

  const rgbArray = [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
  return rgbArray
}

export default hex2rgb
