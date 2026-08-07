import type { MetadataRoute } from 'next'

const SITE_URL = 'https://resume.azhi.moe'
// 与页面下载链接一致的 PDF 地址（URL 已做百分号编码）
const RESUME_PDF_URL = `${SITE_URL}/%E9%98%BF%E7%BA%B8-%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88-%E7%AE%80%E5%8E%86.pdf`

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: RESUME_PDF_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
