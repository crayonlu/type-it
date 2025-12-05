import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [
      [
        'rehype-pretty-code',
        {
          theme: 'github-dark-dimmed',
          keepBackground: false,
          grid: true,
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.crayoncreator.top',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    mdxRs: false,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));