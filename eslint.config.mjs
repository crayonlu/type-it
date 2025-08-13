import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'src/components/ui/**',
    ],
  },
  {
    rules: {
      // 基本代码质量规则
      'no-debugger': 'error', // 禁止debugger
      'no-unused-vars': 'warn', // 警告未使用的变量
      'prefer-const': 'error', // 优先使用const
      'no-var': 'error', // 禁止使用var
      
      // 代码风格规则
      'semi': ['error', 'always'], // 强制使用分号
      'quotes': ['error', 'single'], // 使用单引号
      'indent': ['error', 2], // 2空格缩进
      'comma-dangle': ['error', 'always-multiline'], // 多行时尾随逗号
      
      // 最佳实践
      'eqeqeq': ['error', 'always'], // 使用严格相等
      'curly': ['error', 'all'], // 强制使用大括号
      'no-eval': 'error', // 禁止eval
      'no-implied-eval': 'error', // 禁止隐式eval
      
      // TypeScript相关
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn', // 警告使用any
    },
  },
];

export default eslintConfig;
