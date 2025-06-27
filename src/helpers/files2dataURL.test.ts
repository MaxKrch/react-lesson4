import filesToDataURL from './files2dataURL'

describe('filesToDataURL', () => {
  let originalFileReader: typeof FileReader

  beforeEach(() => {
    originalFileReader = globalThis.FileReader

    class MockFileReader {
      public result: string | null = null
      public onload: (() => void) | null = null
      public onerror: (() => void) | null = null

      readAsDataURL(file: File) {
        this.result = `data:image/png;base64,MOCK_${file.name}`
        queueMicrotask(() => {
          this.onload?.()
        })
      }
    }

    globalThis.FileReader = MockFileReader as any
  })

  it('should convert single file to base64 data url', async () => {
    const file = new File(['dummy'], 'test.png', { type: 'image/png' })

    const result = await filesToDataURL([file])

    expect(result).toEqual([
      {
        success: true,
        img: `data:image/png;base64,MOCK_test.png`,
      },
    ])
  })

  it('should convert multiple files to base64', async () => {
    const file1 = new File(['data1'], 'one.png', { type: 'image/png' })
    const file2 = new File(['data2'], 'two.jpg', { type: 'image/jpeg' })

    const result = await filesToDataURL([file1, file2])

    expect(result).toEqual([
      {
        success: true,
        img: `data:image/png;base64,MOCK_one.png`,
      },
      {
        success: true,
        img: `data:image/png;base64,MOCK_two.jpg`,
      },
    ])
  })

  it('should handle read errors gracefully', async () => {
    globalThis.FileReader = class {
      result: string | null = null
      onload: (() => void) | null = null
      onerror: (() => void) | null = null

      readAsDataURL() {
        queueMicrotask(() => {
          this.onerror?.()
        })
      }
    } as any

    const file = new File(['error'], 'fail.png', { type: 'image/png' })

    const result = await filesToDataURL([file])

    expect(result[0].success).toBe(false)
    expect((result[0] as any).error).toMatch(/Failed to read/)
  })

  afterEach(() => {
    globalThis.FileReader = originalFileReader
  })
})
