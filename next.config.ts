import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import nextMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  theme: 'github-dark-dimmed',
  keepBackground: false,
  grid: true,
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
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