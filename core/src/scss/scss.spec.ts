import { mockDir, mockSCSSSchemaJSON } from '@mock/setup'
import { SCSS } from './scss'

describe('SCSS', () => {
  const { themes, temp } = mockDir()

  describe('Read', () => {
    it('should read an scss file', async () => {
      expect(SCSS.read(themes, 'zort.scss')).resolves.toEqual(
        mockSCSSSchemaJSON(),
      )
    })
  })

  describe('ToJSON', () => {
    it('should parse a SCSS value to JSON', () => {
      expect(SCSS.toJSON('$foo: #fff;')).toEqual({ $foo: '#fff' })
    })
  })

  describe('Merge', () => {
    it('you must merge two files ', () => {
      expect(SCSS.merge({ foo: '$foo' }, { $foo: '#fff' })).toEqual({
        foo: '#fff',
      })
    })
  })

  describe('ReadAllForJSON', () => {
    it('should read all SCSS files from a directory and return an object with key (file name) and value (SCSS contents).', async () => {
      expect(SCSS.readAllForJSON(themes)).resolves.toEqual({
        zort: mockSCSSSchemaJSON(),
        'zort.aye': { ...mockSCSSSchemaJSON(), '$secondary-color': '#e84855' },
      })
    })

    it('should return an error for directorico that does not contain SCSS files', async () => {
      expect(() => SCSS.readAllForJSON(temp)).rejects.toThrow(
        'The informed directory does not contain valid SCSS files.',
      )
    })
  })
})
