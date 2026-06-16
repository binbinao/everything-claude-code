import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🎓 交互式教程',
      items: [
        'tutorials/index',
        'tutorials/hello-ecc',
        'tutorials/tdd-masterclass',
        'tutorials/multi-agent-workflow',
        'tutorials/custom-hooks',
        'tutorials/e2e-testing',
        'tutorials/performance-optimization',
        'tutorials/security-best-practices',
        'tutorials/enterprise-patterns',
      ],
    },
    {
      type: 'category',
      label: '🚀 快速开始',
      items: [
        'quick-start/index',
        'quick-start/installation',
        'quick-start/first-command',
      ],
    },
    {
      type: 'category',
      label: '📚 核心概念',
      items: [
        'core-concepts/agents',
        'core-concepts/commands',
        'core-concepts/skills',
        'core-concepts/hooks',
        'core-concepts/rules',
      ],
    },
    {
      type: 'category',
      label: '🛠️ 实战指南',
      items: [
        'guides/index',
        'guides/typescript',
        'guides/python',
        'guides/golang',
        'guides/deployment',
      ],
    },
    {
      type: 'category',
      label: '🚀 高级主题',
      items: [
        'advanced/index',
        'advanced/multi-agent',
        'advanced/performance',
        'advanced/troubleshooting',
        'advanced/hermes-operator',
        'advanced/deployment-guide',
      ],
    },
    {
      type: 'category',
      label: '📜 版本更新',
      items: [
        'releases/v2.0.0',
      ],
    },
  ],
};

export default sidebars;