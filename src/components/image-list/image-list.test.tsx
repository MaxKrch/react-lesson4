import { render, screen } from '@testing-library/react'
import ImageList from './image-list'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

describe(`Components: ManagerList an ManagerItem`, () => {
  const onDeleteMock = vi.fn()
  const images: {
    id: string
    img: string
  }[] = [
    {
      id: `1`,
      img: `data:image/png;base64,image_1.png`,
    },
    {
      id: `1`,
      img: `data:image/png;base64,image_1.png`,
    },
    {
      id: `1`,
      img: `data:image/png;base64,image_1.png`,
    },
  ]

  beforeEach(() => {
    onDeleteMock.mockClear()
  })

  it(`should render correctly counts images`, () => {
    render(<ImageList list={images} onDeleteImage={onDeleteMock} />)

    const renderedImages = screen.getAllByRole(`img`)
    expect(renderedImages.length).toBe(images.length)
  })

  it(`should render images with correctly url`, () => {
    render(<ImageList list={images} onDeleteImage={onDeleteMock} />)

    const renderedImages = screen.getAllByRole(`img`)
    renderedImages.forEach((img, index) => {
      expect(img).toHaveAttribute(`src`, images[index].img)
    })
  })

  it(`should callback call with correct id`, async () => {
    render(<ImageList list={images} onDeleteImage={onDeleteMock} />)

    const renderedImagesButtonRemove = screen.getAllByRole(`button`)
    await userEvent.click(renderedImagesButtonRemove[0])

    expect(onDeleteMock).toHaveBeenCalledWith(images[0].id)
  })
})
