import { IBuilder } from '@zort/core'
import { ICode } from './code.interface'
import { CodeBuilder } from './code.builder'

export class Code implements ICode.Builder {
  private options: ICode.Props
  private themes: IBuilder.Theme
  private builder: CodeBuilder

  constructor(props: IBuilder.Props) {
    this.builder = new CodeBuilder(props)

    this.themes = {}
    this.options = {
      type: 'dark',
      fontStyle: ['none'],
      extension: true,
    }
  }

  private async stage(): Promise<this> {
    const { fontStyle, type } = this.options

    const metadata = await this.builder.files()
    const variants = await this.builder.variants()

    Object.keys(variants).forEach(variant => {
      fontStyle.forEach(fontType => {
        const themeName =
          fontType === 'none'
            ? `${variant}.json`
            : `${variant}.${fontType}.json`

        this.themes[variant] = {
          ...this.themes[variant],
          [themeName]: JSON.stringify({
            ...this.builder.generateManifest(variant, type),
            ...metadata,
          }).replaceAll('$fontStyle', fontType),
        }
      })
    })

    return this
  }

  public set(options: Partial<ICode.Props>): this {
    this.options = { ...this.options, ...options }
    return this
  }

  public async compile(): Promise<boolean> {
    await this.stage()

    await this.builder.build(this.themes)

    await this.builder.updatePkgJSON(this.options.type)

    if (this.options.extension) {
      await this.builder.createExtension()
    }

    return true
  }
}
