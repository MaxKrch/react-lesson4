import hex2rgb from './hex2rgb'

describe('Helper: hex2rgb', () => {
  it('should return array with rgb colors, when correct hex', () => {
    expect(hex2rgb('#FFFFFF')).toEqual([255, 255, 255])
    expect(hex2rgb('#000000')).toEqual([0, 0, 0])
    expect(hex2rgb('#FFAA00')).toEqual([255, 170, 0])
  })

  it('should return null, when hex not correct', () => {
    expect(hex2rgb('#FFF')).toBeNull()
    expect(hex2rgb('FFFFFF')).toBeNull()
    expect(hex2rgb('#GGGGGG')).toBeNull()
    expect(hex2rgb('#12345')).toBeNull()
    expect(hex2rgb('')).toBeNull()
  })
})
