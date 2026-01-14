import type { PluginWithOptions } from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";
import { imageSize } from 'image-size'
import { join, dirname } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

const DOCS_ROOT = join(process.cwd(), 'docs')

// External images are ignored - dimensions only set for local files
const isRemoteUrl = (src: string) =>
    src.startsWith('http') || src.startsWith('//')

const getScalingFactor = (height: number) => height > 1500 ? 3 : 2

function resolveImagePath(src: string, env: any): string {
    if (src.startsWith('/'))
        return join(DOCS_ROOT, 'public', src)

    const basePath = env?.path
        ? dirname(env.path)
        : env?.relativePath
            ? dirname(join(DOCS_ROOT, env.relativePath))
            : DOCS_ROOT

    return join(basePath, src)
}

function applyImageDimensions(token: Token, imagePath: string): void {
    if (token.attrGet('width') && token.attrGet('height'))
        return

    try {
        const { width, height } = imageSize(readFileSync(imagePath))

        if (!width || !height) return

        const scale = getScalingFactor(height)

        if (!token.attrGet('width'))
            token.attrSet('width', String(Math.round(width / scale)))

        if (!token.attrGet('height'))
            token.attrSet('height', String(Math.round(height / scale)))
    } catch (err) {
        console.warn(`[markdown-it-image-size] Failed to read dimensions for: ${imagePath}`, err)
    }
}

const imageSizePlugin: PluginWithOptions = (md) => {
    const defaultRenderer = md.renderer.rules.image ?? ((tokens, idx, options, _env, self) =>
        self.renderToken(tokens, idx, options)
    )

    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const src = token.attrGet('src')

        if (src && !isRemoteUrl(src)) {
            const imagePath = resolveImagePath(src, env)
            if (existsSync(imagePath))
                applyImageDimensions(token, imagePath)
        }

        return defaultRenderer(tokens, idx, options, env, self)
    }
}

export default imageSizePlugin